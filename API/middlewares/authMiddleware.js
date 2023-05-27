module.exports = (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        res.status(401).json({ error: "You must be logged in" });
    }
}