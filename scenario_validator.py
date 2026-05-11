# 🛰️ Sextant Orbital Resilience Framework
# Scenario Validation Layer (Annex A Enforcement)

class ScenarioValidationError(Exception):
    pass


class ScenarioValidator:

    REQUIRED_NODE_FIELDS = {
        "node_id",
        "type",
        "status",
        "dependencies"
    }

    VALID_TYPES = {
        "satellite",
        "ground_station",
        "relay",
        "subsystem"
    }

    VALID_STATUS = {
        "nominal",
        "degraded",
        "failed"
    }

    def validate(self, scenario: dict) -> bool:
        """
        Validate full scenario structure before execution.
        """

        if "initial_state" not in scenario:
            raise ScenarioValidationError("Missing 'initial_state'")

        nodes = scenario["initial_state"].get("nodes", [])

        if not isinstance(nodes, list):
            raise ScenarioValidationError("'nodes' must be a list")

        if len(nodes) == 0:
            raise ScenarioValidationError("Scenario must contain at least one node")

        node_ids = set()

        for node in nodes:
            self._validate_node(node, node_ids)

        return True

    def _validate_node(self, node: dict, node_ids: set):

        # Check required fields
        missing = self.REQUIRED_NODE_FIELDS - node.keys()
        if missing:
            raise ScenarioValidationError(f"Node missing fields: {missing}")

        # Validate node_id uniqueness
        node_id = node["node_id"]
        if node_id in node_ids:
            raise ScenarioValidationError(f"Duplicate node_id: {node_id}")
        node_ids.add(node_id)

        # Validate type
        if node["type"] not in self.VALID_TYPES:
            raise ScenarioValidationError(
                f"Invalid node type: {node['type']}"
            )

        # Validate status
        if node["status"] not in self.VALID_STATUS:
            raise ScenarioValidationError(
                f"Invalid node status: {node['status']}"
            )

        # Validate dependencies format
        if not isinstance(node["dependencies"], list):
            raise ScenarioValidationError(
                f"Dependencies must be list in node {node_id}"
            )

        # Self-dependency check
        if node_id in node["dependencies"]:
            raise ScenarioValidationError(
                f"Node cannot depend on itself: {node_id}"
            )
