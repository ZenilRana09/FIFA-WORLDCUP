import { describe, it, expect, vi, beforeEach } from "vitest";
import { incidentController } from "../../src/modules/incidents/incidents.controller.js";
import { incidentService } from "../../src/modules/incidents/incidents.service.js";

vi.mock("../../src/modules/incidents/incidents.service.js", () => ({
  incidentService: {
    createIncident: vi.fn(),
    getAllIncidents: vi.fn(),
    getIncidentById: vi.fn(),
    updateIncident: vi.fn(),
    deleteIncident: vi.fn(),
  },
}));

const mockResponse = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
};

describe("Incident Controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return all incidents", async () => {
    const incidents = [
      { id: "1", title: "Crowd Surge" },
      { id: "2", title: "Fire Alert" },
    ];

    (incidentService.getAllIncidents as any).mockResolvedValue(incidents);

    const res = mockResponse();

    await incidentController.findAll({} as any, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: incidents,
    });
  });

  it("should create an incident", async () => {
    const incident = {
      id: "1",
      title: "Fire",
    };

    (incidentService.createIncident as any).mockResolvedValue(incident);

    const req: any = {
      body: incident,
    };

    const res = mockResponse();

    await incidentController.create(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: incident,
    });
  });

  it("should return incident by id", async () => {
    const incident = {
      id: "1",
      title: "Fire",
    };

    (incidentService.getIncidentById as any).mockResolvedValue(incident);

    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    await incidentController.findById(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should update incident", async () => {
    const incident = {
      id: "1",
      title: "Updated",
    };

    (incidentService.updateIncident as any).mockResolvedValue(incident);

    const req: any = {
      params: { id: "1" },
      body: incident,
    };

    const res = mockResponse();

    await incidentController.update(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should delete incident", async () => {
    (incidentService.deleteIncident as any).mockResolvedValue(undefined);

    const req: any = {
      params: { id: "1" },
    };

    const res = mockResponse();

    await incidentController.delete(req, res, vi.fn());

    expect(res.status).toHaveBeenCalledWith(200);
  });

  it("should call next on service error", async () => {
    const next = vi.fn();

    (incidentService.getAllIncidents as any).mockRejectedValue(
      new Error("Database Error")
    );

    await incidentController.findAll({} as any, mockResponse(), next);

    expect(next).toHaveBeenCalled();
  });
});