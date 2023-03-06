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

        case 'POST':
            return postEntry(req, res);

        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}


const getEntries = async (res: NextApiResponse<Data>) => {
    try {

        await connect();
        const entries = await EntryModel.find().sort({ createAt: 'ascending' });
        await disconnect();
        return res.status(200).json(entries);

    } catch (error) {
        await disconnect();
        console.log(error);
        return res.status(400).json({ message: 'Algo salio mal, por favor revisar' });
    }
}

const postEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description = '' } = req.body;

    const newEntry = new EntryModel({
        description,
        createAt: Date.now(),
    });

    try {

        await connect();
        await newEntry.save();
        await disconnect();
        return res.status(201).json(newEntry);

    } catch (error) {
        await disconnect();
        console.log(error);
        return res.status(400).json({ message: 'Algo salio mal, por favor revisar' });
    }
}