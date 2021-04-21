const e = require('express');
const fs = require('fs');

module.exports = {
    addWorkspacePage: (req, res) => {
        res.render('add-workspace.ejs', {
            title: "Welcome to Spaceto | Add a new Workspaces",
            message: ''
        });
    },
    addWorkspace: (req,res) => {
        if (!req.files){
            return res.status(400).send("No files were uploaded.");
        }

        let message = "";
        let workspace_name = req.body.workspace_name;
        let location = req.body.location;
        let status = "Test";
        let detail = req.body.detail;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];

        image_name = workspace_name + '.' + fileExtension;

        let workspaceNameQuery = "SELECT * FROM workspace WHERE workspace_name = '"+ workspace_name +"'";
        db.query(workspaceNameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                message = "Workspace Name already exists";
                res.render('add-workspace.ejs', {
                    message,
                    title: "Welcome to Spaceto | Add a new Workspaces"
                });
            } else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }

                        let query = "INSERT INTO workspace (workspace_name, location, workspace_status, detail, image) VALUES ('"+ workspace_name +"', '"+ location +"', '"+ status +"', '"+ detail +"', '"+ image_name +"') ";

                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }

                            res.redirect('/');
                        });
                    })
                } else {
                    message = "Invalid File Format. Only 'Png', 'Jpeg', and 'Gif' images are allowed. "
                    res.render('add-workspace.ejs', {
                        message,
                        title: "Welcome to Spaceto | Add a new Workspaces"
                    });
                }
            }
              
        });
    }//,
   // editWorkspacePage
}