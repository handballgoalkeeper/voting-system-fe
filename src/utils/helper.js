const utcToLocalDateTime = (utcTime) => {
    return new Date(utcTime).toLocaleDateString(undefined, {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });
}

const formatErrorMessage = (errors, status) => {
    let message = '';

    if (status === 422) {
        Object.keys(errors).forEach(key => {
            message += errors[key] + '\n';
        });
    }
    else {
        errors.forEach(error => {
            message += error + '\n';
        });
    }

    return message;

};

export {
    utcToLocalDateTime,
    formatErrorMessage
};