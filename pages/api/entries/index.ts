import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../database/connection';
import EntryModel, { IEntry } from '../../../models/EntryModel';

type Data =
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res);

        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await connect();
    const entries = await EntryModel.find().sort({ createAt: 'ascending' });
    await disconnect();
    res.status(200).json(entries);
}