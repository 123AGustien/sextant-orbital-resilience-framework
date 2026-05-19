from sqlalchemy import Column, Integer, String, DateTime, Float
from app.db.base import Base
import datetime


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True, index=True)

    invoice_id = Column(String, unique=True, index=True)
    user_id = Column(String, index=True)

    plan = Column(String)  # enterprise, pro, etc
    amount = Column(Float)

    status = Column(String)  # pending, paid, cancelled

    payment_method = Column(String)  # bank_transfer, paypal_manual, contract

    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    due_date = Column(DateTime)
