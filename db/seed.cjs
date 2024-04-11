const client = require('./client.cjs');
const { createFarm } = require('./farms.cjs');
const { createCrop } = require('./crops.cjs');
const { createFarms_Crops } = require('./farms_crops.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS farms_crops;
      DROP TABLE IF EXISTS farms;
      DROP TABLE IF EXISTS crops;
    `);
  } catch(err) {
    console.log(err);
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE farms (
        id SERIAL PRIMARY KEY,
        name VARCHAR(50)
      );
      
      CREATE TABLE crops (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20)
      );

      CREATE TABLE farms_crops (
        id SERIAL PRIMARY KEY,
        farms_id INT REFERENCES farms(id),
        crops_id INT REFERENCES crops(id)
      )
    `)
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED');

  await dropTables();
  console.log(`TABLES DROPPED`);

  await createTables();
  console.log(`TABLES CREATED`);

  const farmvilleFarms = await createFarm('Farmville Farms');
  const eleiottAcres = await createFarm('Eleiott Acres');
  const greenAcres = await createFarm('Green Acres');
  const rottenRoosters = await createFarm('Rotten Roosters');
  console.log('FARMS CREATED');

  await createCrop('wheat');
  const corn = await createCrop('corn');
  const watermelon = await createCrop('watermelon');
  await createCrop('starfruit');
  const taters = await createCrop('taters');
  console.log('CROPS CREATED');

  await createFarms_Crops(farmvilleFarms.id, corn.id);
  await createFarms_Crops(farmvilleFarms.id, taters.id);
  await createFarms_Crops(eleiottAcres.id, watermelon.id);
  await createFarms_Crops(greenAcres.id, taters.id);
  await createFarms_Crops(greenAcres.id, corn.id);
  await createFarms_Crops(greenAcres.id, watermelon.id);
  await createFarms_Crops(rottenRoosters.id, corn.id);
  console.log(`FARMS_CROPS CREATED`);

  
  await client.end();
  console.log(`DISCONNECTED`);
}

syncAndSeed();