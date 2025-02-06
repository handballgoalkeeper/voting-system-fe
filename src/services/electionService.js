import customAxios from "@/utils/customAxios";

const ELECTIONS_URL = '/elections';

const findAll = async () => {
    return customAxios.get(ELECTIONS_URL);
};

export { findAll };