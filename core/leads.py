LEADS = []


def store_lead(email: str, company: str, api_key: str):
    LEADS.append({
        "email": email,
        "company": company,
        "api_key": api_key
    })


def get_leads():
    return LEADS
