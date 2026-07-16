import { Router } from "express";
import { incidentController } from "./incidents.controller.js";

const router = Router();

router.get("/", incidentController.findAll.bind(incidentController));
router.get("/:id", incidentController.findById.bind(incidentController));
router.post("/", incidentController.create.bind(incidentController));
router.patch("/:id", incidentController.update.bind(incidentController));
router.delete("/:id", incidentController.delete.bind(incidentController));

export default router;