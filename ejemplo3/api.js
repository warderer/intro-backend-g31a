import express from 'express';
import db from './db.js';

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

//Ruta: /employees HttpMethod: GET
api.get('/employees', async (req, res) => {
  try {
    //consultamos todas las columnas con '*' con .from() elegimos la tabla
    const employees = await db.select('*').from('employees');
    return res.json({
      msg: 'Empleados obtenidos',
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error obteniendo todos los empleados',
    });
  }
});

//Ruta: ejemplo-> /employees/3 HttpMethod: GET el la fn callback es async (porque interactua con un 3ro AKA. base de datos)
api.get('/employees/:employeeId', async (req, res) => {
  //Sacamos el employeeId que está dentro de la url ejemplo: 3
  const { employeeId } = req.params;
  // const employeeId = req.params.employeeId

  try {
    //Guardar en una constante el empleado a buscar
    //.where() acepta un obj como parámetro {}
    /**
     * {
     * llave: valor
     * }
     */
    const employee = await db
      //Select todas las columnas
      .select('*')
      //De la tabla employees
      .from('employees')
      //Donde el employee_id = employeeId
      //employee_id = al que viene en la url
      .where({
        employee_id: employeeId,
      })
      //Solo dame el primer registro !array -> {}
      .first();

    return res.json({
      msg: 'Empleado encontrado',
      employee,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error buscando empleado por id',
    });
  }
});

//Ruta: ejmplo /employees/3 HttpMethod: PUT
api.put('/employees/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  const { first_name, salary } = req.body;

  if (!first_name || !salary) {
    return res.status(400).json({
      msg: 'Body inválido',
    });
  }

  try {
    //De la tabla employees
    const updated = await db('employees')
      //.update() acepta como param un {}
      .update({
        first_name,
        salary,
      })
      //Actualizar solamente el employee con id específico
      .where({
        employee_id: employeeId,
      })
      //Si no agrego .returnin() la fn update regresa un number con la cantidad de registros actualizados
      .returning('*');

    return res.json({
      msg: 'Usuario actualizado',
      employee: updated[0],
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error obteniendo todos los empleados',
    });
  }
});

//Ruta: /employees HttpMethod: POST
api.post('/employees', async (req, res) => {
  const { first_name, salary } = req.body;

  //Validar que vengan ambas first_name y salary
  if (!first_name || !salary) {
    return res.status(400).json({
      msg: 'Invalid body',
    });
  }

  try {
    //Usar db importador hasta arriba
    const newEmployee = await db('employees')
      //dentro de .insert() podemos mandar un obj -> {}
      .insert({
        first_name,
        salary,
      })
      //Lo que regresa una vez que se haya registrado el nuevo empleado
      .returning('*');

    //Regresamos al cliente un 200 con el nuevo empleado
    return res.status(201).json({
      msg: 'Empleado registrado',
      employee: newEmployee,
    });
  } catch (error) {
    //Si ocurre algún error dentro del try
    console.error(error);
    return res.status(500).json({
      msg: 'Error registrando empleado',
    });
  }
});

//Ruta: ejmplo -> /employees/3 HttpMethod: DELETE
api.delete('/employees/:employeeId', async (req, res) => {
  const { employeeId } = req.params;
  try {
    await db('employees').delete().where({
      employee_id: employeeId,
    });

    return res.json({
      msg: 'Emepleado borrado',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      msg: 'Error registrando empleado',
    });
  }
});

api.listen(8000, () => {
  console.log('Servidor corriendo en puerto 8000');
});
