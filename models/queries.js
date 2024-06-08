import fs from "fs";

//Roommates
export const addRoommateQuery = async (roommate) => {
  try {
    const roommates = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    roommates.roommates.push(roommate);
    fs.writeFileSync("./data/roommates.json", JSON.stringify(roommates));
    return roommates;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getRoommatesQuery = async () => {
  try {
    const roommates = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    return roommates;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


//Gastos
export const addGastoQuery = async (gasto) => {
  try {
    const gastos = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    gastos.gastos.push(gasto);
    fs.writeFileSync("./data/gastos.json", JSON.stringify(gastos));
    return gastos;
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getGastosQuery = async () => {
  try {
    const gastos = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    return gastos;
  }
  catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const updateGastoQuery = async (nuevoGasto) => {
  const { id } = nuevoGasto
  try {
    let { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    gastos = gastos.map((gasto) => {
      if (gasto.id === id) {
        return nuevoGasto;
      }
      return gasto;
    })
    fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
    return gastos;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const deleteGastoQuery = async (id) => {
  try {
    let { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    gastos = gastos.filter((gasto) => gasto.id !== id);
    fs.writeFileSync("./data/gastos.json", JSON.stringify({ gastos }));
    return gastos;
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const calculateGastos = () => {
  try {
    const { gastos } = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));
    const { roommates } = JSON.parse(fs.readFileSync("./data/roommates.json", "utf-8"));

    roommates.forEach(r => {
      r.debe = 0;
      r.recibe = 0;
      r.total = 0;
    });

    gastos.forEach(g => {
      const montoPorPersona = g.monto / roommates.length;

      roommates.forEach(r => {
        if (g.roommate === r.nombre) {
          r.recibe += montoPorPersona * (roommates.length - 1);
        } else {
          r.debe += montoPorPersona;
        }
      });
    });

    roommates.forEach(r => {
      r.total = r.recibe - r.debe;
    });

    fs.writeFileSync("./data/roommates.json", JSON.stringify({ roommates }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
