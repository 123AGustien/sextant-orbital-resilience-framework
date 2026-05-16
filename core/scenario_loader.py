import json


class ScenarioLoader:
    """
    Loads deterministic simulation scenarios from JSON.
    """

    def load(self, path):
        """
        Load and normalize scenario definition.
        """

        with open(path, "r") as f:
            data = json.load(f)

        return self._normalize(data)

    def _normalize(self, data):
        """
        Ensures deterministic structure for engine compatibility.
        """

        data.setdefault("nodes", [])
        data.setdefault("dependencies", [])
        data.setdefault("initial_conditions", {})

        # Normalize nodes
        normalized_nodes = []
        for node in data["nodes"]:
            normalized_nodes.append({
                "id": node["id"],
                "type": node.get("type", "generic"),
                "state": node.get("state", "healthy")
            })

        data["nodes"] = normalized_nodes

        # Normalize dependencies
        normalized_deps = []
        for dep in data["dependencies"]:
            normalized_deps.append({
                "source": dep["source"],
                "target": dep["target"],
                "type": dep.get("type", "link")
            })

        data["dependencies"] = normalized_deps

        return data
