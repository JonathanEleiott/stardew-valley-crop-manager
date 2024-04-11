const client = require('./client.cjs');

const createCrop = async(cropName) => {
  try {
    const { rows: [ newlyCreatedCrop ] } = await client.query(`
      INSERT INTO crops (name)
      VALUES ('${cropName}')
      RETURNING *;
    `);
    return newlyCreatedCrop;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createCrop
}