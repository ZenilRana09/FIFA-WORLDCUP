import { getIO } from "../../lib/socket.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { incidentRepository } from "./incidents.repository.js";

class IncidentService {
  async createIncident(data: Prisma.IncidentCreateInput) {
    const incident = await incidentRepository.create(data);

    try {
      getIO().emit("incident:new", incident);
    } catch {
      // Socket.IO not initialized (e.g. during tests)
    }

    return incident;
  }

  async getAllIncidents() {
    return incidentRepository.findAll();
  }

  async getIncidentById(id: string) {
    return incidentRepository.findById(id);
  }

  async updateIncident(id: string, data: Prisma.IncidentUpdateInput) {
    const incident = await incidentRepository.update(id, data);

    try {
      getIO().emit("incident:updated", incident);
    } catch {
      // Socket.IO not initialized (e.g. during tests)
    }

    return incident;
  }

  async deleteIncident(id: string) {
    const incident = await incidentRepository.delete(id);

    try {
      getIO().emit("incident:deleted", { id });
    } catch {
      // Socket.IO not initialized (e.g. during tests)
    }

    return incident;
  }
}

export const incidentService = new IncidentService();