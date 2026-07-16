import { Request, Response, NextFunction } from "express";
import { incidentService } from "./incidents.service.js";

class IncidentController {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const incident = await incidentService.createIncident(req.body);

      return res.status(201).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  }

  async findAll(_req: Request, res: Response, next: NextFunction) {
    try {
      const incidents = await incidentService.getAllIncidents();

      return res.status(200).json({
        success: true,
        data: incidents,
      });
    } catch (error) {
      next(error);
    }
  }

  async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const incident = await incidentService.getIncidentById(
        String(req.params.id)
      );

      return res.status(200).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const incident = await incidentService.updateIncident(
        String(req.params.id),
        req.body
      );

      return res.status(200).json({
        success: true,
        data: incident,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await incidentService.deleteIncident(String(req.params.id));

      return res.status(200).json({
        success: true,
        message: "Incident deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export const incidentController = new IncidentController();