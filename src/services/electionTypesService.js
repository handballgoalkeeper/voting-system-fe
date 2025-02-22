import customAxios from "@/utils/customAxios";

const ELECTION_TYPES_URL = '/election_types';

const findAll = async () => {
    return customAxios.get(ELECTION_TYPES_URL);
};

const update = async (electionType) => {
    return customAxios.put(ELECTION_TYPES_URL, electionType);
};

const create = async (electionType) => {
    return customAxios.post(ELECTION_TYPES_URL, electionType);
};

const findAllByCountryId = async (countryId) => {
    let allElectionTypes = (await findAll()).data;
    return allElectionTypes.filter((electionType) => electionType.country.id === countryId);
};

export {
    findAll,
    update,
    create,
    findAllByCountryId
};