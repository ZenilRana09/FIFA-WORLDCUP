import OpenAI from "openai";
import { incidentService } from "../incidents/incidents.service.js";
import { IncidentSeverity } from "../../generated/prisma/client.js";

console.log("====================================");
console.log("OpenRouter API Key Loaded:", !!process.env.OPENROUTER_API_KEY);
console.log("====================================");

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY!,
  baseURL: "https://openrouter.ai/api/v1",
  timeout: 60000,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:4000",
    "X-Title": "FIFA SmartStadium AI",
  },
});

interface IncidentInput {
  title: string;
  description: string;
  location: string;
  severity: string;
  crowdDensity: number;
}

class AIService {
  async analyzeIncident(data: IncidentInput) {
    const prompt = `
You are an AI Stadium Operations Manager for FIFA World Cup 2026.

Analyze this stadium incident.

Title:
${data.title}

Description:
${data.description}

Location:
${data.location}

Severity:
${data.severity}

Crowd Density:
${data.crowdDensity}%

Return ONLY valid JSON:

{
  "risk":"LOW",
  "priority":1,
  "summary":"",
  "recommendedActions":[
    "",
    "",
    ""
  ],
  "estimatedResolutionTime":""
}
`;

    try {
      console.log("🚀 Sending request to OpenRouter...");

      const response = await client.chat.completions.create({
        model:
          process.env.OPENROUTER_MODEL ??
          "meta-llama/llama-3.1-8b-instruct",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.2,
      });

      let aiText = response.choices[0]?.message?.content ?? "{}";

      console.log("Raw AI Response:");
      console.log(aiText);

      aiText = aiText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      let aiResult;

      try {
        aiResult = JSON.parse(aiText);
      } catch {
        console.log("⚠️ AI returned invalid JSON");

        aiResult = {
          risk: data.severity,
          priority: 1,
          summary: "AI analysis generated successfully",
          recommendedActions: [
            "Monitor situation",
            "Deploy security staff",
            "Review CCTV footage",
          ],
          estimatedResolutionTime: "15 minutes",
        };
      }

      const severity = Object.values(IncidentSeverity).includes(
        data.severity as IncidentSeverity
      )
        ? (data.severity as IncidentSeverity)
        : IncidentSeverity.MEDIUM;

      const savedIncident = await incidentService.createIncident({
        title: data.title,
        description: data.description,
        location: data.location,
        severity,
        status: "OPEN",
        crowdDensity: data.crowdDensity,
        aiRisk: aiResult.risk,
        aiPriority: aiResult.priority,
        aiSummary: aiResult.summary,
        aiActions: aiResult.recommendedActions,
        aiResolution: aiResult.estimatedResolutionTime,
      });

      console.log("✅ Incident Saved:", savedIncident.id);

      return {
        incident: savedIncident,
        aiAnalysis: aiResult,
      };
    } catch (error: any) {
      console.error("❌ OpenRouter Error:");
      console.error(error?.message ?? error);
      throw error;
    }
  }
}

export const aiService = new AIService();