export interface Incident {
  id: string;
  title: string;
  description: string;
  location: string;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  crowdDensity: number;

  aiAnalysis: {
    risk: string;
    priority: number;
    summary: string;
    recommendedActions: string[];
    estimatedResolutionTime: string;
  };

  status: "OPEN" | "IN_PROGRESS" | "RESOLVED";

  createdAt: Date;
  updatedAt: Date;
}