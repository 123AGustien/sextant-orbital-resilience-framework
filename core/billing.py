import json
import os

USAGE_FILE = "data/usage.json"


def load_usage():

    if not os.path.exists(USAGE_FILE):
        return {}

    with open(USAGE_FILE, "r") as file:
        return json.load(file)


def save_usage(data):

    with open(USAGE_FILE, "w") as file:
        json.dump(data, file, indent=2)


def increment_usage(api_key: str):

    data = load_usage()

    if api_key not in data:
        data[api_key] = {
            "count": 0,
            "tier": "free"
        }

    data[api_key]["count"] += 1

    save_usage(data)


def get_usage(api_key: str):

    data = load_usage()

    return data.get(api_key)
