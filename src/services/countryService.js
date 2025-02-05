import customAxios from "@/utils/customAxios";

const COUNTRIES_PATH = '/countries';

const findAll = async () => {
    return customAxios.get(COUNTRIES_PATH);
};

const create = async (newCountry) => {
    return customAxios.post(COUNTRIES_PATH, newCountry);
}

export { findAll, create};