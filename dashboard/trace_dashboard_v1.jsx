import React, { useState } from "react";

/*
🛰️ Sextant Orbital Resilience Framework
Trace Dashboard v1 (Main Container)

Connects API → Trace Adapter → Visualization Views
*/

import TraceDashboardV1 from "./TraceDashboardViewV1";

export default function TraceDashboardMain() {
  const [traceData, setTraceData] = useState(null);
  const [loading, setLoading] = useState(false);

  // ----------------------------
  // LOAD TRACE FROM API
  // ----------------------------
  const runScenario = async () => {
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/run-scenario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          scenario: {
            id: "demo_orbital_001",
            nodes: ["satellite_A", "satellite_B"],
            expected_states: {
              satellite_A: "HEALTHY",
              satellite_B: "DEGRADED"
            }
          }
        })
      });

      const data = await response.json();

      // Extract trace if you later attach it in API response
      setTraceData(data.trace || null);

    } catch (err) {
      console.error("Trace load failed:", err);
    }

    setLoading(false);
  };

  return (
    <div className="p-6 space-y-4">

      {/* HEADER */}
      <div className="text-2xl font-bold">
        🛰️ Sextant Trace Dashboard
      </div>

      {/* ACTION BUTTON */}
      <button
        onClick={runScenario}
        className="px-4 py-2 border rounded"
      >
        Run Scenario
      </button>

      {loading && (
        <div className="text-gray-500">
          Running simulation...
        </div>
      )}

      {/* DASHBOARD VIEW */}
      {traceData && (
        <TraceDashboardV1 traceData={traceData} />
      )}

    </div>
  );
}
