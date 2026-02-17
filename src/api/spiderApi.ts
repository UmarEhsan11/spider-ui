export type Orientation = "Up" | "Right" | "Down" | "Left";

export interface SimulationRequest {
  wallMaxX: number;
  wallMaxY: number;
  startX: number;
  startY: number;
  startOrientation: Orientation;
  instructions: string;
}

export interface SimulationResponse {
  x: number;
  y: number;
  orientation: Orientation;
}

export async function runSimulation(request: SimulationRequest): Promise<SimulationResponse> {
  const response = await fetch("/api/spider-simulation/run", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  });

  if (!response.ok) {
    const contentType = response.headers.get("content-type") ?? "";
    let errorMessage = "Simulation failed.";

    if (contentType.includes("application/json")) {
      try {
        const error = await response.json();
        errorMessage = error?.detail ?? error?.message ?? errorMessage;
      } catch {
        // fall through to generic message
      }
    } else {
      try {
        const errorText = await response.text();
        if (errorText.trim().length > 0) {
          errorMessage = errorText.trim();
        }
      } catch {
        // fall through to generic message
      }
    }

    throw new Error(`${errorMessage} (HTTP ${response.status})`);
  }

  return response.json();
}