import prisma from "../../lib/prisma.js";
import type { Prisma } from "../../generated/prisma/client.js";

export class IncidentRepository {
  async create(data: Prisma.IncidentCreateInput) {
    return prisma.incident.create({
      data,
    });
  }

  async findAll() {
    return prisma.incident.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async findById(id: string) {
    return prisma.incident.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: string, data: Prisma.IncidentUpdateInput) {
    return prisma.incident.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return prisma.incident.delete({
      where: {
        id,
      },
    });
  }
}

export const incidentRepository = new IncidentRepository();