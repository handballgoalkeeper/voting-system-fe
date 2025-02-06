import customAxios from "@/utils/customAxios";

const ELECTION_TYPES_URL = '/election_types';

const findAll = async () => {
    return customAxios.get(ELECTION_TYPES_URL);
};

export {
    findAll
};