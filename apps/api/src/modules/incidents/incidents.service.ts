import { io } from "../../server.js";
import type { Prisma } from "../../generated/prisma/client.js";
import { incidentRepository } from "./incidents.repository.js";

class IncidentService {
  async createIncident(data: Prisma.IncidentCreateInput) {
    const incident = await incidentRepository.create(data);

    // Notify all connected clients
    io.emit("incident:new", incident);

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

    io.emit("incident:updated", incident);

    return incident;
  }

  async deleteIncident(id: string) {
    const incident = await incidentRepository.delete(id);

    io.emit("incident:deleted", { id });

    return incident;
  }
}

export const incidentService = new IncidentService();