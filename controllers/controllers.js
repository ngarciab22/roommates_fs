import path from "path";
import { addRoommateQuery, getRoommatesQuery, addGastoQuery, getGastosQuery, updateGastoQuery, deleteGastoQuery, calculateGastos } from "../models/queries.js";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

const __dirname = path.resolve();

export const home = (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
}

//Roommates
export const addRoommate = async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api")
    const data = response.data.results[0];
    const id = uuidv4().slice(0, 6);
    const roommate = {
      id,
      nombre: `${data.name.first} ${data.name.last}`,
      email: data.email,
      debe: 0,
      recibe: 0
    }
    const resultado = await addRoommateQuery(roommate);
    res.status(201).json({ message: "Roommate agregado correctamente", roommate: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getRoommates = async (req, res) => {
  try {
    const resultado = await getRoommatesQuery();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Gastos
export const addGasto = async (req, res) => {
  try {
    const id = uuidv4().slice(0, 6);
    const { roommate, descripcion, monto } = req.body;
    const newGasto = {
      id,
      roommate,
      descripcion,
      monto
    }
    const resultado = await addGastoQuery(newGasto);
    calculateGastos();
    res.status(201).json({ message: "Gasto agregado correctamente", gasto: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export const getGastos = async (req, res) => {
  try {
    const resultado = await getGastosQuery();
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateGasto = async (req, res) => {
  try {
    const { roommate, descripcion, monto } = req.body;
    const { id } = req.query;
    const newGasto = {
      id,
      roommate,
      descripcion,
      monto
    }
    const resultado = await updateGastoQuery(newGasto);
    calculateGastos();
    res.status(200).json({ message: "Gasto actualizado correctamente", newGasto: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

}

export const deleteGasto = async (req, res) => {
  try {
    const { id } = req.query;
    const resultado = await deleteGastoQuery(id);
    calculateGastos();
    res.status(200).json({ message: "Gasto eliminado correctamente", gasto: resultado });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
