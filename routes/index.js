module.exports = {
    getHomePage: (req, res) => {

        let search = req.body.search;
        let where ="";
        if(search!=null){
        where = "where workspace_name like '%"+search+"%'";   
        }
        
        let query = "SELECT * FROM workspace wp join location lc ON wp.location_no = lc.location_no join workspacetype wt on wp.workspace_type_no = wt.workspace_type_no "+ where +"ORDER BY wp.workspace_no ASC";
        
        
       


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