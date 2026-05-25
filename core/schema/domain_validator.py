from core.schema.domain_registry_v1 import DOMAIN_REGISTRY_V1

def validate_domain(domain: str):
    if domain not in DOMAIN_REGISTRY_V1:
        raise ValueError(f"Invalid domain: {domain}")
    return True
