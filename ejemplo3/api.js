import express from 'express';

const api = express();

api.use(express.json());

/**
 *  Agrega un endpoint '/api/body que responda a una petición de tipo PUT con el body que el cliente envíe al
hacer la petición. Ejemplo: cliente envía un body desde postman o insomnia que luce como este:
{ “nombre”: “César”, “ocupacion”: “Sensei” }
Entonces, el servidor debe responder con un objeto idéntico al que envía el cliente, junto con un status de
respuesta 200.
 */
api.put('/api/body', (req, res) => {
  console.log(req.body);
  return res.json(req.body);
});

api.listen(8000, () => {
  console.log('Servidor corriendo en puerto 8000');
});
