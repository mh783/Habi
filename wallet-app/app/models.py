from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Numeric, CheckConstraint
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    account = relationship("Account", back_populates="user", uselist=False, cascade="all, delete-orphan")


class Account(Base):
    __tablename__ = "accounts"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), unique=True, nullable=False)
    balance = Column(Numeric(12, 2), nullable=False, default=0)

    user = relationship("User", back_populates="account")
    ledger_entries = relationship("LedgerEntry", back_populates="account")


class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    type = Column(String, nullable=False)  # TOPUP, TRANSFER
    amount = Column(Numeric(12, 2), nullable=False)
    status = Column(String, nullable=False, default="COMPLETED")
    description = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    ledger_entries = relationship("LedgerEntry", back_populates="transaction", cascade="all, delete-orphan")

    __table_args__ = (
        CheckConstraint("amount > 0", name="check_transaction_amount_positive"),
    )


class LedgerEntry(Base):
    __tablename__ = "ledger_entries"

    id = Column(Integer, primary_key=True, index=True)
    transaction_id = Column(Integer, ForeignKey("transactions.id"), nullable=False)
    account_id = Column(Integer, ForeignKey("accounts.id"), nullable=False)
    direction = Column(String, nullable=False)  # DEBIT, CREDIT
    amount = Column(Numeric(12, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)

    transaction = relationship("Transaction", back_populates="ledger_entries")
    account = relationship("Account", back_populates="ledger_entries")

    __table_args__ = (
        CheckConstraint("amount > 0", name="check_ledger_amount_positive"),
    )