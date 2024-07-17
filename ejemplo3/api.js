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

/**
 * CRUD
 */

/**
 * employees
 *
 * employee_id
 * name
 * role
 * phone
 *
 */

/**
 *
 * HTTP method  enpoint                    Qué hace?
 * GET           /employess               getAllEmployees
 * GET           /employees/:employeeId   getEmployeeById
 * PUT           /employees/:employeeId   updateEmployeeById
 * POST          /employees               createEmployee
 * DELETE        /employees/:employeeId   deleteEmployeeById
 */

api.get('/employees', (req, res) => {
  return res.json({
    employees: 'Acá todos los empleados',
  });
});

api.get('/employees/:employeeId', (req, res) => {
  const { employeeId } = req.params;

  return res.json({
    employee: `Aca el empleado con id ${employeeId}`,
  });
});

api.put('/employees/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  return res.json({
    employee: `Aca se modifica el empleado con id ${employeeId}`,
  });
});

api.post('/employees', (req, res) => {
  return res.json({
    employee: `Acá se crea un nuevo emmpleado `,
  });
});

api.delete('/employees/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  return res.json({
    employee: `Aca se elimina el empleado con id ${employeeId}`,
  });
});

api.listen(8000, () => {
  console.log('Servidor corriendo en puerto 8000');
});
