const reportPost = (req, res) => {
    const loggedInUser = req.user;
    const { selectedPostId } = req.body;

    console.log(loggedInUser)
    console.log(selectedPostId)

}

module.exports = { reportPost };