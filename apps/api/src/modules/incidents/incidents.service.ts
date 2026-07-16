import type { Prisma } from "../../generated/prisma/client.js";
import { incidentRepository } from "./incidents.repository.js";

class IncidentService {
  async createIncident(data: Prisma.IncidentCreateInput) {
    return incidentRepository.create(data);
  }

  async getAllIncidents() {
    return incidentRepository.findAll();
  }

  async getIncidentById(id: string) {
    return incidentRepository.findById(id);
  }

  async updateIncident(id: string, data: Prisma.IncidentUpdateInput) {
    return incidentRepository.update(id, data);
  }

  async deleteIncident(id: string) {
    return incidentRepository.delete(id);
  }
}

export const incidentService = new IncidentService();