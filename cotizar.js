import CorreoArg from "ylazzari-correoargentino";

export default async function handler(req, res) {
  try {
    const { cp_origen, cp_destino, peso } = req.query;

    // Validación de parámetros obligatorios
    if (!cp_origen || !cp_destino || !peso) {
      return res.status(400).json({
        ok: false,
        error: "Faltan parámetros: usa ?cp_origen=XXXX&cp_destino=XXXX&peso=GRAMOS"
      });
    }

    // Llamada a la librería de Correo Argentino
    const resultado = await CorreoArg.quote({
      cp_origen,
      cp_destino,
      peso: parseInt(peso)
    });

    // Respuesta formateada
    return res.status(200).json({
      ok: true,
      costo: resultado?.price || null,
      detalle: resultado
    });

  } catch (e) {
    return res.status(500).json({
      ok: false,
      error: e.message
    });
  }
}
