
const adapt = (countryTypeObject) => {
    return {
        id: countryTypeObject.id,
        name: countryTypeObject.name,
        description: countryTypeObject.description,
        country_id: countryTypeObject.country.id,
        required_stages_count: countryTypeObject.required_stages_count,
    }
};

export {
    adapt
};