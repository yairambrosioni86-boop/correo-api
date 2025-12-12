import CorreoArg from "ylazzari-correoargentino";

export default async function handler(req, res) {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ error: "Falta el parámetro ?id=" });
    }

    const tracking = await CorreoArg.track(id);

    res.status(200).json({
      ok: true,
      tracking
    });

  } catch (e) {
    res.status(500).json({
      ok: false,
      error: e.message
    });
  }
}
