"""
Sextant Orbital Resilience Framework
Orbital System Model Layer

This module defines the structural representation of a satellite constellation system,
including satellites, ground stations, payloads, and dependency relationships.
"""

class OrbitalNode:
    def __init__(self, node_id, node_type, status="nominal"):
        self.node_id = node_id
        self.node_type = node_type  # satellite | ground_station | payload
        self.status = status

        # Dependencies: other nodes this node relies on
        self.dependencies = []

    def add_dependency(self, node):
        self.dependencies.append(node)

    def set_status(self, status):
        self.status = status


class OrbitalSystemModel:
    def __init__(self):
        # All nodes in the constellation system
        self.nodes = {}

    def add_node(self, node_id, node_type):
        """
        Create a new orbital system node.
        """
        node = OrbitalNode(node_id, node_type)
        self.nodes[node_id] = node
        return node

    def link_dependency(self, from_node_id, to_node_id):
        """
        Define dependency relationship:
        from_node depends on to_node
        """
        from_node = self.nodes[from_node_id]
        to_node = self.nodes[to_node_id]

        from_node.add_dependency(to_node)

    def get_system_state(self):
        """
        Returns a structured snapshot of the entire orbital system.
        """
        return {
            node_id: {
                "type": node.node_type,
                "status": node.status,
                "dependencies": [d.node_id for d in node.dependencies]
            }
            for node_id, node in self.nodes.items()
        }

    def get_failure_nodes(self):
        """
        Returns nodes that are not in nominal state.
        """
        return {
            node_id: node.status
            for node_id, node in self.nodes.items()
            if node.status != "nominal"
        }
