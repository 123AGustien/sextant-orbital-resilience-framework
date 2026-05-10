"""
Sextant Orbital Resilience Framework
Orbital Mechanics Layer

Introduces simplified orbital dynamics concepts:
- orbital planes
- visibility windows
- pass timing constraints
- communication availability windows

This is a conceptual model (not a physics engine).
"""

import math


class OrbitalMechanicsLayer:
    def __init__(self):
        # Simple time simulation index (abstract "minutes")
        self.time_step = 0

        # Visibility windows per ground station (simplified)
        self.visibility_map = {}

    def add_ground_station_visibility(self, station_id, start, end):
        """
        Defines a visibility window for a ground station.
        Example: station can see satellites between t=10 and t=40
        """
        self.visibility_map[station_id] = (start, end)

    def is_visible(self, station_id):
        """
        Checks if a station is currently in visibility window.
        """
        if station_id not in self.visibility_map:
            return False

        start, end = self.visibility_map[station_id]
        return start <= self.time_step <= end

    def advance_time(self, steps=1):
        """
        Advances simulation time forward.
        """
        self.time_step += steps

    def reset_time(self):
        """
        Resets simulation clock.
        """
        self.time_step = 0

    def get_system_visibility_state(self):
        """
        Returns visibility status of all ground stations.
        """
        return {
            station_id: self.is_visible(station_id)
            for station_id in self.visibility_map
        }
