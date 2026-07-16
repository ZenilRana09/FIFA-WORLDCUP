export interface Incident {
  id: string;

  title: string;

  description: string;

  location: string;

  severity:
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

  crowdDensity: number;


  aiRisk?: string;

  aiPriority?: number;

  aiSummary?: string;

  aiResolution?: string;


  aiActions?: string[];


  status:
    | "OPEN"
    | "IN_PROGRESS"
    | "RESOLVED";


  createdAt: Date;

  updatedAt: Date;
}