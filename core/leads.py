import json
import os

LEADS_FILE = "data/leads.json"


def load_leads():

    if not os.path.exists(LEADS_FILE):
        return []

    with open(LEADS_FILE, "r") as file:
        return json.load(file)


def save_leads(leads):

    with open(LEADS_FILE, "w") as file:
        json.dump(leads, file, indent=2)


def store_lead(email: str, company: str, api_key: str):

    leads = load_leads()

    leads.append({
        "email": email,
        "company": company,
        "api_key": api_key
    })

    save_leads(leads)


def get_leads():

    return load_leads()
