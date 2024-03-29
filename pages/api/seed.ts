// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../database/connection';
import { seedData } from '../../database/seed-data';
import EntryModel from '../../models/EntryModel';

type Data = {
    message?: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (process.env.NODE_ENV === 'production') {
        return res.status(401).json({
            message: 'No tiene acceso a este servicio'
        })
    }

    await connect();
    await EntryModel.deleteMany();
    await EntryModel.insertMany(seedData.entries);
    await disconnect();

    return res.status(200).json({
        message: 'Proceso realizado correctamente'
    })
}