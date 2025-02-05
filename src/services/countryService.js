import customAxios from "@/utils/customAxios";

const COUNTRIES_PATH = '/countries';

const findAll = () => {
    return customAxios.get(COUNTRIES_PATH);
};

export { findAll };