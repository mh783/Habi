from sqlalchemy.orm import Session
from sqlalchemy import select
from decimal import Decimal
from .models import User, Account, Transaction, LedgerEntry

def create_user(db: Session, name: str):
    user = User(name=name)
    db.add(user)
    db.flush()

    account = Account(user_id=user.id, balance=Decimal("0.00"))
    db.add(account)
    db.commit()
    db.refresh(user)
    db.refresh(account)

    return {
        "id": user.id,
        "name": user.name,
        "account_id": account.id,
        "balance": float(account.balance)
    }


def get_user_account(db: Session, user_id: int):
    stmt = (
        select(Account)
        .join(User)
        .where(User.id == user_id)
    )
    account = db.execute(stmt).scalar_one_or_none()
    return account


def top_up(db: Session, user_id: int, amount: float, description: str = None):
    account = get_user_account(db, user_id)
    if not account:
        raise ValueError("User account not found")

    amount_decimal = Decimal(str(amount))

    try:
        tx = Transaction(
            type="TOPUP",
            amount=amount_decimal,
            status="COMPLETED",
            description=description
        )
        db.add(tx)
        db.flush()

        account.balance += amount_decimal

        credit_entry = LedgerEntry(
            transaction_id=tx.id,
            account_id=account.id,
            direction="CREDIT",
            amount=amount_decimal
        )
        db.add(credit_entry)

        db.commit()
        db.refresh(account)
        return {"message": "Top up successful", "balance": float(account.balance)}
    except Exception:
        db.rollback()
        raise


def transfer(db: Session, from_user_id: int, to_user_id: int, amount: float, description: str = None):
    if from_user_id == to_user_id:
        raise ValueError("Cannot transfer to the same user")

    from_account = get_user_account(db, from_user_id)
    to_account = get_user_account(db, to_user_id)

    if not from_account or not to_account:
        raise ValueError("One or both accounts were not found")

    amount_decimal = Decimal(str(amount))

    if from_account.balance < amount_decimal:
        raise ValueError("Insufficient balance")

    try:
        tx = Transaction(
            type="TRANSFER",
            amount=amount_decimal,
            status="COMPLETED",
            description=description
        )
        db.add(tx)
        db.flush()

        from_account.balance -= amount_decimal
        to_account.balance += amount_decimal

        debit_entry = LedgerEntry(
            transaction_id=tx.id,
            account_id=from_account.id,
            direction="DEBIT",
            amount=amount_decimal
        )

        credit_entry = LedgerEntry(
            transaction_id=tx.id,
            account_id=to_account.id,
            direction="CREDIT",
            amount=amount_decimal
        )

        db.add_all([debit_entry, credit_entry])
        db.commit()

        db.refresh(from_account)
        db.refresh(to_account)

        return {
            "message": "Transfer successful",
            "from_balance": float(from_account.balance),
            "to_balance": float(to_account.balance)
        }
    except Exception:
        db.rollback()
        raise


def get_balance(db: Session, user_id: int):
    account = get_user_account(db, user_id)
    if not account:
        raise ValueError("User account not found")

    return {
        "user_id": user_id,
        "account_id": account.id,
        "balance": float(account.balance)
    }


def get_movements(db: Session, user_id: int):
    account = get_user_account(db, user_id)
    if not account:
        raise ValueError("User account not found")

    stmt = (
        select(LedgerEntry, Transaction)
        .join(Transaction, LedgerEntry.transaction_id == Transaction.id)
        .where(LedgerEntry.account_id == account.id)
        .order_by(LedgerEntry.created_at.desc())
    )

    rows = db.execute(stmt).all()

    result = []
    for entry, tx in rows:
        result.append({
            "transaction_id": tx.id,
            "type": tx.type,
            "amount": float(tx.amount),
            "status": tx.status,
            "description": tx.description,
            "created_at": tx.created_at,
            "direction": entry.direction
        })

    return result