module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM workspace ORDER BY workspace_id ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err){
                res.redirect('/');
            }

            res.render('index.ejs', {
                title: "Welcome to Spaceto | View Workspaces",
                workspace: result
            });
        });
    }
}