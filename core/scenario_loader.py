import json


class ScenarioLoader:
    def load(self, path):
        """
        Loads a scenario from JSON file.
        """

        with open(path, "r") as f:
            data = json.load(f)

        return data
