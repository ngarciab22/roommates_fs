import express from "express";
import { home, addRoommate, getRoommates, addGasto, getGastos, updateGasto, deleteGasto} from "../controllers/controllers.js";

const router = express.Router();

router.get("/", home)
router.post("/roommate", addRoommate)
router.get("/roommates", getRoommates)
router.post("/gasto", addGasto)
router.get("/gastos", getGastos)
router.put("/gasto", updateGasto)
router.delete("/gasto", deleteGasto)


export default router