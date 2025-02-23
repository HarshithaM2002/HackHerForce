const { CosmosClient } = require('@azure/cosmos');
require('dotenv').config();

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;

if (!endpoint || !key) {
    console.error("Missing Cosmos DB credentials");
    process.exit(1);
}

const client = new CosmosClient({ endpoint, key });
const database = client.database("MedisenseDB");
const container = database.container("PatientData");

module.exports = container;
