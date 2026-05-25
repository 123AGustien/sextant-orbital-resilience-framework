"""
🌐 Cross-Domain Translator Engine v1
Sextant Orbital Resilience Framework

Translates failure semantics between domains
into domain-specific impact signals.
"""

from typing import Dict, Any, List

from core.cross_domain.cross_domain_registry_v1 import (
    CROSS_DOMAIN_RELATIONSHIPS
)


class CrossDomainTranslatorEngineV1:

    # ---------------------------------
    # MAIN ENTRY
    # ---------------------------------

    def translate(
        self,
        source_domain: str,
        failure_type: str
    ) -> Dict[str, Any]:

        if source_domain not in CROSS_DOMAIN_RELATIONSHIPS:

            raise ValueError(
                f"Unknown domain: {source_domain}"
            )

        domain_map = CROSS_DOMAIN_RELATIONSHIPS[
            source_domain
        ]

        translations = domain_map["mappings"].get(
            failure_type,
            []
        )

        return {

            "source_domain": source_domain,

            "failure_type": failure_type,

            "translated_impacts": translations,

            "target_domains": domain_map["impacts"]
        }

    # ---------------------------------
    # FULL DOMAIN PROPAGATION
    # ---------------------------------

    def propagate(
        self,
        source_domain: str,
        failure_type: str
    ) -> Dict[str, Any]:

        result = self.translate(
            source_domain,
            failure_type
        )

        propagation_chain = []

        for target_domain in result["target_domains"]:

            propagation_chain.append({
                "from": source_domain,
                "to": target_domain,
                "trigger": failure_type,
                "impacts": result["translated_impacts"]
            })

        return {

            "source_domain": source_domain,

            "failure_type": failure_type,

            "propagation_chain": propagation_chain
        }
