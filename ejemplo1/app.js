//OLD
// const express = require('express');

// console.log(express);

import express from 'express';

//Crear una api de express
const api = express();

//Meter api en un servidor
api.listen(8000, () => {
  console.log('Api levantadar en un servidor con el puerto', 8000);
});
