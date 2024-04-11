const client = require('./client.cjs');

const createFarms_Crops = async(farm_id, crop_id) => {
  try {
    await client.query(`
      INSERT INTO farms_crops (farms_id, crops_id)
      VALUES ('${farm_id}', '${crop_id}');
    `);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createFarms_Crops
}