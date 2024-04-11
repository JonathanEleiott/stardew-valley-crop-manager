const client = require('./client.cjs');

const createFarm = async(farmName) => {
  try {
    const { rows: [ newlyCreatedFarm ] } = await client.query(`
      INSERT INTO farms (name)
      VALUES ('${farmName}')
      RETURNING *;
    `);
    return newlyCreatedFarm;
  } catch(err) {
    console.log(err);
  }
}

const getFarms = async() => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM farms;
    `);

    return rows;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createFarm,
  getFarms
}