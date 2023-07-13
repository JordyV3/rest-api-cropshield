import { pool } from "../db.js";

export const getAnalisis = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM analises;");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const getAnalisi = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM analises WHERE id = ?", [
      id,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "Analisis no encontrado" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const getAnalisiLimpios = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT ROW_NUMBER() OVER (ORDER BY titulo) AS id, titulo, area, observaciones, temperatura, altura, edad, prediccion, confianza, cultivoId, categoriaId FROM analises;");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};

export const getAnalisisPuros = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT ROW_NUMBER() OVER (ORDER BY titulo) AS id, titulo, area, observaciones, temperatura, altura, edad, prediccion, confianza FROM analises;");
    res.json(rows);
  } catch (error) {
    return res.status(500).json({ message: "Algo va mal" });
  }
};