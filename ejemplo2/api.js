import express from 'express';

const api = express();

// endpoint: string, callback: fn
api.get('/', (req, res) => {
  res.json({
    msg: 'Esto es un mensaje',
  });
});

/**
 * Agrega un endpoint '/api/' que responda a una petición de tipo GET con un código de estado 200 y el
siguiente json:
{ 'mensaje':'hola mundo' }
 */

api.get('/api', (req, res) => {
  return res.json({
    mensaje: 'Hola mundo',
  });
});

/**
 * Agrega un endpoint '/api/suma' que responda a una petición de tipo GET con la suma de dos números que
reciba mediante las querys num1 y num2. El servidor debe responder con un código de estado 200 y un
json como el siguiente:
{ 'resultado': 7 }
 */

api.get('/api/suma', (req, res) => {
  if (req.query.numA && req.query.numB) {
    const suma = Number(req.query.numA) + Number(req.query.numB);
    return res.json({
      resultado: suma,
    });
  } else {
    return res.status(400).json({
      msg: 'numA y numB deben estar en los query params',
    });
  }
});

/**
 * Agrega un endpoint '/api/usuario/' que responda a una petición de tipo GET con el nombre que sea recibido
a través de params. El servidor debe responder con un código de estado 200 y un json como este:
{ 'usuario': 'cesar' }
 */

api.get('/api/usuario/:name', (req, res) => {
  return res.json({
    usuario: req.params.name,
  });
});

/**
 * 
 * Agrega un endpoint '/api/swapi' que responda a una petición de tipo GET con el personaje solicitado de
https://swapi.dev/. El cliente debe mandar el número de personaje mediante params. La respuesta del
servidor debe lucir algo así
{ 'personaje': {
'name': 'Luke Skywalker',
...,
} }
 */

api.get('/api/swapi/:personaje', (req, res) => {});

api.listen(8000, () => {
  console.log('Servidor en el puerto 8000');
});
