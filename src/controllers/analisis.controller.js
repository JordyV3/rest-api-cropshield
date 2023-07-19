import { pool } from "../db.js";

export const getAnalisisNumeroPlantasEnfermasPorSemana = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = id;
    const [rows] = await pool.query(`SELECT CONCAT('Semana ', secuencia.num_semana) AS semana, COUNT(analises.createdAt) AS plantas_enfermas
    FROM (
        SELECT (ROW_NUMBER() OVER ()) AS num_semana
        FROM information_schema.columns
        LIMIT 10
    ) secuencia
    LEFT JOIN analises ON (WEEK(analises.createdAt) - WEEK(DATE_FORMAT(analises.createdAt, '%Y-%m-01')) + 1) = secuencia.num_semana
        AND analises.prediccion = 'Planta Enferma Trips'
        AND analises.usuarioId = ?
    GROUP BY secuencia.num_semana
    ORDER BY secuencia.num_semana;`, usuarioId);
    const formattedResponse = {
      data: rows
    };
    res.json(formattedResponse);
  } catch (error) {
    return res.status(500).json({ message: "No se pueden analisis con la edad de mayor a menor" });
  }
}

export const getAnalisisClaseId = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = id;
    const [rows] = await pool.query(`SELECT
    SUM(CASE WHEN prediccion = 'Planta Saludable' THEN 1 ELSE 0 END) AS numero_datos_saludables,
    SUM(CASE WHEN prediccion = 'Planta Enferma Trips' THEN 1 ELSE 0 END) AS numero_datos_enfermas
    FROM analises
    WHERE prediccion IN ('Planta Enferma Trips', 'Planta Saludable')
    AND usuarioId = ?;`, usuarioId);

    const formattedResponse = {
      data: rows
    };

    res.json(formattedResponse);
  } catch (error) {
    return res.status(500).json({ message: "No se pueden analisis con la edad de mayor a menor" });
  }
}

export const getAnalisisCombo = async (req, res) => {
  try {
    const { id } = req.params;
    const usuarioId = id;
    const [rows] = await pool.query(`SELECT edad,
    SUM(CASE WHEN prediccion = 'Planta Enferma Trips' THEN 1 ELSE 0 END) AS plantas_enfermas,
    SUM(CASE WHEN prediccion = 'Planta Saludable' THEN 1 ELSE 0 END) AS plantas_sanas
    FROM analises
    WHERE usuarioId = ?
    GROUP BY edad
    ORDER BY edad ASC;`, usuarioId);

    const formattedResponse = {
      data: rows
    };

    res.json(formattedResponse);
  } catch (error) {
    return res.status(500).json({ message: "No se pueden analisis con la edad de mayor a menor" });
  }
}







