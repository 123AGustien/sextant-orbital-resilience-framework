class CascadeModel:
    def __init__(self, dependencies):
        """
        dependencies format:
        {
            "A": ["B"],
            "B": ["C"],
            "C": []
        }
        """
        self.dependencies = dependencies

    def propagate_failure(self, failed_node):
        """
        Returns all nodes affected by cascade failure
        """
        affected = set()
        queue = [failed_node]

        while queue:
            node = queue.pop(0)

            for parent, children in self.dependencies.items():
                if node in children and parent not in affected:
                    affected.add(parent)
                    queue.append(parent)

        return list(affected)
