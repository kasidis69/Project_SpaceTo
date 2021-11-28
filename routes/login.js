module.exports = {
    loginPage: (req, res) => {

    
            res.render('login.ejs', {
                title: "Welcome to Spaceto | Login",
                account: req.session.account
            });

    },
    login: (req, res) => {
        var username = req.body.username;
        var password = req.body.password; 
       
        if (username && password) {
            let query1 = "SELECT * FROM users WHERE username = '"+ username +"' AND password = '"+ password +"'";
            db.query(query1, (err, result) => {
              req.session.account = result[0]; 
                if (result[0] != null) {
                    let query = "SELECT * FROM workspace ORDER BY workspace_no ASC";
                    db.query(query, (err, result) => {
                        if (err){
                            res.redirect('/');
                        }
                         req.session.loggedin = true;
                         req.session.username = username; 
                         req.session.password = password; 
                        res.render('index.ejs', {
                            
                            title: "Welcome to Spaceto | View Workspaces",
                            workspace: result,
                            account: req.session.account
                        });
                       
                    });
                } else {
                    res.render('login.ejs', {
                            
                        title: "Welcome to Spaceto | Login",
                        message: "รหัสผ่านไม่ถูกต้อง"
                    });
                }			
                 
            });
            
            
            
        } 
            
    }
}