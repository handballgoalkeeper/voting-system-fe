import customAxios from "@/utils/customAxios";

const ELECTION_TYPES_URL = '/election_types';

const findAll = async () => {
    return customAxios.get(ELECTION_TYPES_URL);
};

const update = async (electionType) => {
    return customAxios.put(ELECTION_TYPES_URL, electionType);
};

export {
    findAll,
    update
};