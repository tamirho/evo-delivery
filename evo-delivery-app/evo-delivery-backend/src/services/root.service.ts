import {ROOTS} from "../models/tmp-data";
import {IdWithAddress} from "../types";

export const getById = async (rootId) => {
    return ROOTS.find(({id}) => id === rootId) as IdWithAddress
};