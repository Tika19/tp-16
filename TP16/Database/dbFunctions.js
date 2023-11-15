const express = require('express');
const bodyParser = require('body-parser');
const dbConnection = require('./dbConfig');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Endpoint para agregar un nuevo cliente
app.post('/create', (req, res) => {
  const nuevoCliente = req.body;

  const query = 'INSERT INTO clientes SET ?';

  dbConnection.query(query, nuevoCliente, (err, result) => {
    if (err) {
      console.error('Error al agregar cliente:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.status(201).json({ id: result.insertId });
    }
  });
});

// Endpoint para obtener todos los clientes
app.get('/read', (req, res) => {
  const query = 'SELECT * FROM clientes';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener clientes:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

// a. Listar todos los clientes que tengan peso mayor a 90 y altura mayor a 1.78
app.get('/read/clientes-peso-altura', (req, res) => {
  const query = 'SELECT * FROM clientes WHERE Peso > 90 AND Altura > 1.78';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener clientes por peso y altura:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

// b. Listar todos los clientes que no pertenecen a Mar del Plata y tengan un email igual a gmail
app.get('/read/clientes-no-mar-del-plata-gmail', (req, res) => {
  const query = 'SELECT * FROM clientes WHERE Domicilio <> "Mar del Plata" AND Email LIKE "%gmail%"';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener clientes por ubicación y email:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

// c. Mostrar el promedio de alturas de los clientes
app.get('/read/promedio-alturas', (req, res) => {
  const query = 'SELECT AVG(Altura) AS promedioAlturas FROM clientes';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el promedio de alturas:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results[0]);
    }
  });
});

app.get('/read/mas-alto-peso', (req, res) => {
  const query = 'SELECT * FROM clientes WHERE Peso = (SELECT MAX(Peso) FROM clientes)';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el cliente con el más alto peso:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});


// e. Mostrar el cliente con menor edad
app.get('/read/cliente-menor-edad', (req, res) => {
  const query = 'SELECT * FROM clientes ORDER BY FechaNac ASC LIMIT 1';

  dbConnection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el cliente con menor edad:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.json(results);
    }
  });
});

// Endpoint para actualizar un cliente por ID
app.put('/update/:id', (req, res) => {
  const clienteId = req.params.id;
  const clienteActualizado = req.body;

  const query = 'UPDATE clientes SET ? WHERE id = ?';

  dbConnection.query(query, [clienteActualizado, clienteId], (err) => {
    if (err) {
      console.error('Error al actualizar cliente:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

// Endpoint para eliminar un cliente por ID
app.delete('/delete/:id', (req, res) => {
  const clienteId = req.params.id;

  const query = 'DELETE FROM clientes WHERE id = ?';

  dbConnection.query(query, clienteId, (err) => {
    if (err) {
      console.error('Error al eliminar cliente:', err);
      res.status(500).send('Error interno del servidor');
    } else {
      res.sendStatus(204);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
