import type { NextApiRequest, NextApiResponse } from 'next'
import mongoose from 'mongoose';
import { connect, disconnect } from '../../../database/connection';
import EntryModel, { IEntry } from '../../../models/EntryModel';

type Data =
    | { message: string }
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const { id = '' } = req.query;
    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ message: 'El id no es valido: ' + id });
    }
    switch (req.method) {
        case 'PUT':
            return putEntry(req, res);
        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }

}

const putEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { id } = req.query;

    try {
        await connect();
        const entryToUpdate = await EntryModel.findById(id);

        if (!entryToUpdate) {
            await disconnect();
            return res.status(400).json({ message: 'No existe entrada con el ID: ' + id });
        }

        const {
            description = entryToUpdate.description,
            status = entryToUpdate.status
        } = req.body;

        const updatedEntry = await EntryModel.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true });
        await disconnect();

        return res.status(200).json(updatedEntry!);
    } catch (error) {
        console.log({ error });
        await disconnect();
        return res.status(400).json({ message: 'bad request' });
    }


}

