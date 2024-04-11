const { Client } = require('pg');
const client = new Client('postgres://localhost:5432/stardew_valley_crop_manager');

module.exports = client;