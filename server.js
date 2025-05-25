
import express from 'express';
import bodyParser from 'body-parser';
import pg from 'pg';
import cors from 'cors';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'mobileweb',
  password: '369',
  port: 5432,
});
db.connect();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

// GET all designers
app.get('/api/designers', async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM designers ORDER BY id ASC");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST add a new designer
app.post('/api/designers', async (req, res) => {
  const { name, stars, description, projects, years, price, phone1, phone2 } = req.body;
  try {
    const result = await db.query(
      'INSERT INTO designers (name, stars, description, projects, years, price, phone1, phone2) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [name, stars, description, projects, years, price, phone1, phone2]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add designer' });
  }
});

// PUT update designer info
app.put('/api/designers/:id', async (req, res) => {
  const id = req.params.id;
  const { name, stars, description, projects, years, price, phone1, phone2 } = req.body;
  try {
    const result = await db.query(
      'UPDATE designers SET name=$1, stars=$2, description=$3, projects=$4, years=$5, price=$6, phone1=$7, phone2=$8 WHERE id=$9 RETURNING *',
      [name, stars, description, projects, years, price, phone1, phone2, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update designer' });
  }
});

// DELETE designer
app.delete('/api/designers/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await db.query('DELETE FROM designers WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete designer' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
