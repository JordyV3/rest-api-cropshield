import { Router } from "express";
import {
    getAnalisi,
    getAnalisis,
    getAnalisiLimpios,
    getAnalisisPuros
} from "../controllers/analisis.controller.js";

const router = Router();

router.get("/analisis", getAnalisis);
router.get("/analisis/:id", getAnalisi);
router.get("/analisis-limpios", getAnalisiLimpios)
router.get("/analisis-puros", getAnalisisPuros)

export default router;