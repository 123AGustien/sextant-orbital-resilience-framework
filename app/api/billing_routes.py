@router.post("/billing/paypal/webhook")
async def paypal_webhook(request: Request):

    body = await request.json()
    headers = request.headers

    # 1. VERIFY PAYPAL SIGNATURE
    is_valid = verify_webhook_signature(headers, body)

    if not is_valid:
        return {"status": "invalid_signature"}

    event_type = body.get("event_type")

    # 2. ONLY HANDLE APPROVED PAYMENTS
    if event_type != "CHECKOUT.ORDER.APPROVED":
        return {"status": "ignored_event"}

    try:
        purchase_units = body["resource"].get("purchase_units", [])
        user_id = purchase_units[0].get("custom_id")
    except Exception:
        return {"status": "invalid_payload"}

    if not user_id:
        return {"status": "missing_user_id"}

    db = SessionLocal()

    try:
        user = db.query(User).filter(User.id == user_id).first()

        if not user:
            return {"status": "user_not_found"}

        # idempotency guard
        if user.plan == "pro":
            return {"status": "already_upgraded"}

        user.plan = "pro"
        user.usage_limit = 10000
        user.usage_count = 0

        db.commit()

        return {"status": "user_upgraded"}

    finally:
        db.close()
