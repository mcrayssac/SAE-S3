// Import mongo client from mongodb and os
const { MongoClient } = require('mongodb');
const os = require('os');

// Options
const interfaces = os.networkInterfaces();
const addresses = [];

Object.keys(interfaces).forEach((interfaceName) => {
    interfaces[interfaceName].forEach((iface) => {
        if (iface.family === 'IPv4' && iface.internal === true) {
            addresses.push(iface.address);
        }
    });
});

const databaseName = "sae_s3"
const url = `mongodb://${addresses[0]}:27017/?directConnection=true`;

// Create a client
exports.connectDatabase = async function (base) {
    try {
        const client = new MongoClient(url);
        await client.connect();
        return {collection: client.db(databaseName).collection(base), client};
    } catch (error) {
        console.log(error.message);
    }
}

// Close client
exports.closeDatabase = async function (client) {
    return client.close();
}


