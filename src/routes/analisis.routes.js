import { Router } from "express";
import {
    getAnalisisNumeroPlantasEnfermasPorSemana,
    getAnalisisClaseId,
    getAnalisisCombo
} from "../controllers/analisis.controller.js";

const router = Router();

router.get("/analisis-semana/:id", getAnalisisNumeroPlantasEnfermasPorSemana)
router.get("/analisis-clase/:id", getAnalisisClaseId)
router.get("/analisis-combo/:id", getAnalisisCombo)

export default router;