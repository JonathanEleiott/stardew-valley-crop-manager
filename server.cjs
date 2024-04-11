const express = require('express');
const app = express();
const { getFarms, createFarm } = require('./db/farms.cjs');

const client = require('./db/client.cjs');
client.connect();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static('dist'));

app.get('/', (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

app.get('/api/v1/farms', async(req, res, next) => {
  try {
    const allFarms = await getFarms();

    res.send(allFarms)
  } catch(err) {
    next(err);
  }
});

app.post('/api/v1/farms', async(req, res, next) => {
  try {
    const { name } = req.body;
    const newFarm = await createFarm(name);
    res.send(newFarm);
  } catch(err) {
    next(err);
  }
});

app.listen(3000, () => console.log(`listening on port 3000`));