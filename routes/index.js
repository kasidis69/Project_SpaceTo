module.exports = {
    getHomePage: (req, res) => {

        let search = req.body.search;
        let where ="";

        if(search!=null){
        where = "where workspace_name like '%"+search+"%' ";   
        }
        
        let query = "SELECT * FROM workspace ORDER BY workspace_no ASC "+ where;
        console.log(search+"+++++");

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
