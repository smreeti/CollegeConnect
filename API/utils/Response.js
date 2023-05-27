const setErrorResponse = (res, error) => {
    return res.status(404).json({ error: error });
}

const setSuccessResponse = (res, message, body = null) => {
    return res.json({ message, body });
}

module.exports = { setSuccessResponse, setErrorResponse }