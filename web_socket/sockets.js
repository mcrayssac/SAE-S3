const WebSocket = require('ws');
const CryptoJS = require('crypto-js');
require('dotenv').config();
const { connectDatabase, closeDatabase } = require('./database/db');

// Clé secrète pour chiffrer et déchiffrer le message
const encryptionKey = process.env.ENCRYPTION_KEY;

const server = new WebSocket.Server({ port: 3030 });

const connectedClients = new Map();

async function giveMongoValue(base) {
    try {
        const resolve = await connectDatabase(base);
        const client = resolve.client;
        let collection = await resolve.collection;
        let result = await collection.find().toArray();
        await closeDatabase(client);
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Fonction pour stocker les messages reçues dans une base mongo
async function storeMessage(sender, senderAdmin, receiver, receiverAdmin, message, time, base) {
    try {
        const resolve = await connectDatabase(base);
        const client = resolve.client;
        let collection = await resolve.collection;
        let result = await collection.insertOne({sender, senderAdmin, receiver, receiverAdmin, message, time});
        await closeDatabase(client);
        return result;
    } catch (err) {
        console.log(err);
        return null;
    }
}

// Fonction pour déchiffrer le message
async function decryptMessage(ciphertext) {
    const bytes = await CryptoJS.AES.decrypt(ciphertext, encryptionKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}

server.on('connection', async function connection(ws) {
    console.log('Client connected');

    ws.on('message', async function incoming(ciphertext) {
        ciphertext = JSON.parse(ciphertext.toString());

        if (ciphertext.type === 'identification') {
            console.log('Identification reçue !');
            const userId = ciphertext.userId;
            const userAdmin = ciphertext.userAdmin;
            connectedClients.set(ws, {userId, userAdmin});
            console.log(`Client identifié avec l'ID utilisateur: ${userId}, et Admin: ${userAdmin}`);

            // Envoyer tous les messages stockés au nouveau client
            let messages = await giveMongoValue('messages');

            if (messages && messages.length > 0) {
                for await (let message of messages) {
                    if ((userId === await decryptMessage(message.receiver) && userAdmin === await decryptMessage(message.receiverAdmin)) || (userId === await decryptMessage(message.sender) && userAdmin === await decryptMessage(message.senderAdmin))) {
                        ws.send(JSON.stringify({type: "message", sender: message.sender, senderAdmin: message.senderAdmin, receiver: message.receiver, receiverAdmin: message.receiverAdmin, message: message.message, time: message.time}));
                    }
                }
            }
        } else if (ciphertext.type === 'accounts') {
            for await (const clientConnection of server.clients) {
                if (clientConnection.readyState === WebSocket.OPEN) {
                    const userId = connectedClients.get(clientConnection).userId;
                    const userAdmin = connectedClients.get(clientConnection).userAdmin;
                    if (userId === await decryptMessage(ciphertext.sender) && userAdmin === await decryptMessage(ciphertext.senderAdmin)) {
                        connectDatabase('accounts').then(async resolve => {
                            const client = resolve.client;
                            let collection = await resolve.collection;
                            const users = await collection.find({}).toArray();
                            await clientConnection.send(JSON.stringify({
                                type: "update",
                                users: CryptoJS.AES.encrypt(JSON.stringify(users), encryptionKey).toString()
                            }));
                            await closeDatabase(client);
                        })
                    }
                }
            }
        } else {
            console.log('Message reçu !');
            // Stocker le message
            await storeMessage(ciphertext.sender, ciphertext.senderAdmin, ciphertext.receiver, ciphertext.receiverAdmin, ciphertext.message, ciphertext.time, 'messages')

            // Déchiffrement du message
            const plaintextSender = await decryptMessage(ciphertext.sender);
            const plaintextSenderAdmin = await decryptMessage(ciphertext.senderAdmin);
            const plaintextReceiver = await decryptMessage(ciphertext.receiver);
            const plaintextReceiverAdmin = await decryptMessage(ciphertext.receiverAdmin);
            const plaintextMessage = await decryptMessage(ciphertext.message);
            const plaintextTime = await decryptMessage(ciphertext.time);
            console.log('Sender: ', plaintextSender, '\nSenderAdmin: ', plaintextSenderAdmin, '\nReceiver: ', plaintextReceiver, '\nReceiverAdmin: ', plaintextReceiverAdmin, '\nMessage: ', plaintextMessage, '\nTime: ', plaintextTime);

            // Renvoyer le message chiffré à tous les clients connectés
            for await (const client of server.clients) {
                if (client.readyState === WebSocket.OPEN) {
                    const userId = connectedClients.get(client).userId;
                    const userAdmin = connectedClients.get(client).userAdmin;
                    if ((userId === await decryptMessage(ciphertext.receiver) && userAdmin === await decryptMessage(ciphertext.receiverAdmin)) || (userId === await decryptMessage(ciphertext.sender) && userAdmin === await decryptMessage(ciphertext.senderAdmin))) {
                        console.log(`Envoi du message chiffré à l'utilisateur ${userId}`);
                        client.send(JSON.stringify({type: "message", sender: ciphertext.sender, senderAdmin: ciphertext.senderAdmin, receiver: ciphertext.receiver, receiverAdmin: ciphertext.receiverAdmin, message: ciphertext.message, time: ciphertext.time}));
                    }
                }
            }
        }
    });
});