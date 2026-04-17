from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware
from .db import Base, engine, SessionLocal
from .schemas import (
    UserCreate,
    UserResponse,
    TopUpRequest,
    TransferRequest,
    BalanceResponse,
    MovementResponse
)
from .services import create_user, top_up, transfer, get_balance, get_movements

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Peer Wallet API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/users", response_model=UserResponse)
def create_user_endpoint(payload: UserCreate, db: Session = Depends(get_db)):
    try:
        return create_user(db, payload.name)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@app.post("/accounts/{user_id}/topup")
def top_up_endpoint(user_id: int, payload: TopUpRequest, db: Session = Depends(get_db)):
    try:
        return top_up(db, user_id, payload.amount, payload.description)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.post("/transfers")
def transfer_endpoint(payload: TransferRequest, db: Session = Depends(get_db)):
    try:
        return transfer(
            db,
            payload.from_user_id,
            payload.to_user_id,
            payload.amount,
            payload.description
        )
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception:
        raise HTTPException(status_code=500, detail="Internal server error")


@app.get("/accounts/{user_id}/balance", response_model=BalanceResponse)
def balance_endpoint(user_id: int, db: Session = Depends(get_db)):
    try:
        return get_balance(db, user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@app.get("/accounts/{user_id}/movements", response_model=list[MovementResponse])
def movements_endpoint(user_id: int, db: Session = Depends(get_db)):
    try:
        return get_movements(db, user_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))