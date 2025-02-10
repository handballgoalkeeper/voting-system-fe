import customAxios from "@/utils/customAxios";

const ELECTIONS_URL = '/elections';

const findAll = async () => {
    return customAxios.get(ELECTIONS_URL);
};

const create = async (election) => {
    return customAxios.post(ELECTIONS_URL, election);
};

export { findAll, create };