from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str = Field(..., min_length=1)


class UserResponse(BaseModel):
    id: int
    name: str
    account_id: int
    balance: float

    class Config:
        from_attributes = True


class TopUpRequest(BaseModel):
    amount: float = Field(..., gt=0)
    description: Optional[str] = None


class TransferRequest(BaseModel):
    from_user_id: int
    to_user_id: int
    amount: float = Field(..., gt=0)
    description: Optional[str] = None


class BalanceResponse(BaseModel):
    user_id: int
    account_id: int
    balance: float


class MovementResponse(BaseModel):
    transaction_id: int
    type: str
    amount: float
    status: str
    description: Optional[str]
    created_at: datetime
    direction: str

    class Config:
        from_attributes = True