import mongoose from "mongoose";
/*
    0 = disconnected
    1 = connected
    2 = connecting
    3 = disconnecting
*/

const mongoConnection = {
    isConnected: 0
}

export const connect = async () => {
    if (mongoConnection.isConnected) {
        console.log('Conectado a MongoDB');
        return;
    }

    if (mongoose.connections.length > 0) {
        mongoConnection.isConnected = mongoose.connections[0].readyState;
        if (mongoConnection.isConnected === 1) {
            console.log('Usando conexion anterior');
            return;
        }

        await disconnect();
    }

    await mongoose.connect(process.env.NODE_ENV === 'production' ? process.env.MONGO_ATLAS_URL || '' : process.env.MONGO_URL_DOCKER || '', {
        dbName: 'todoappdb',
    });

    mongoConnection.isConnected = 1;
    console.log('Conectado a MongoDB', process.env.NODE_ENV === 'production' ? process.env.MONGO_ATLAS_URL || '' : process.env.MONGO_URL_DOCKER || '');
}

export const disconnect = async () => {
    if (mongoConnection.isConnected === 0) return;
    await mongoose.disconnect();
    mongoConnection.isConnected = 0;
    console.log('Desconectado de MongoDB');
}