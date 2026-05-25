"""
🧪 Cross-Domain Validation Engine v1
Sextant Orbital Resilience Framework

Validates correctness and integrity of
cross-domain mappings and translations.
"""

from typing import Dict, Any

from core.cross_domain.cross_domain_registry_v1 import (
    CROSS_DOMAIN_RELATIONSHIPS
)


class CrossDomainValidationEngineV1:

    # ---------------------------------
    # MAIN ENTRY
    # ---------------------------------

    def validate(self) -> Dict[str, Any]:

        errors = []

        for domain, config in CROSS_DOMAIN_RELATIONSHIPS.items():

            # ---------------------------------
            # CHECK REQUIRED STRUCTURE
            # ---------------------------------

            if "impacts" not in config:
                errors.append(
                    f"{domain}: missing 'impacts'"
                )

            if "mappings" not in config:
                errors.append(
                    f"{domain}: missing 'mappings'"
                )

            # ---------------------------------
            # CHECK MAPPING CONSISTENCY
            # ---------------------------------

            mappings = config.get("mappings", {})

            for failure_type, impacts in mappings.items():

                if not isinstance(impacts, list):
                    errors.append(
                        f"{domain}: {failure_type} impacts must be list"
                    )

                if len(impacts) == 0:
                    errors.append(
                        f"{domain}: {failure_type} has empty impacts"
                    )

            # ---------------------------------
            # CHECK IMPACT DOMAIN REFERENCES
            # ---------------------------------

            for target in config.get("impacts", []):

                if target not in CROSS_DOMAIN_RELATIONSHIPS:
                    errors.append(
                        f"{domain}: invalid target domain {target}"
                    )

        return {

            "valid": len(errors) == 0,

            "error_count": len(errors),

            "errors": errors
        }
