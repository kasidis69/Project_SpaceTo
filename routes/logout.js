module.exports = {
    logout: (req, res) => {
        if (req.session.account) {
            req.session.account = null
        }

        res.redirect('/');

    }
}