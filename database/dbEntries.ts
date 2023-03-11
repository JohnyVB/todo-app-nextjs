import mongoose from "mongoose";
import EntryModel, { IEntry } from "../models/EntryModel";
import { connect, disconnect } from "./connection";

export const getEntryById = async (id: string): Promise<IEntry | null> => {

    try {
        if (!mongoose.isValidObjectId(id)) return null;

        await connect();
        const entry = await EntryModel.findById(id).lean();
        await disconnect();

        return JSON.parse(JSON.stringify(entry));

    } catch (error) {
        await disconnect();
        console.log({ error });
        return null;
    }

}