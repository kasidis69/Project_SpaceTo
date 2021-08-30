const { query } = require('express');
const e = require('express');
const fs = require('fs');

module.exports = {
    addWorkspacePage: (req, res) => {
        let query = "SELECT * FROM equipmentname ORDER BY equipment_name_no ASC";

        // execute query
        db.query(query, (err, result) => {
            if (err){
                res.redirect('/');
            }

            res.render('add-workspace.ejs', {
                title: "Welcome to Spaceto | View Workspaces",
                eqp: result,
                message:''
            });
        });
        
        let query2 = "SELECT * FROM admin ORDER BY admin_no ASC";

        // execute query
        db.query(query2, (err, result2) => {
            if (err){
                res.redirect('/');
            }

            res.render('add-workspace.ejs', {
                title: "Welcome to Spaceto | View Workspaces",
                adm: result2,
                message:''
            });
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
        let workspacetypeid = req.body.roomtype ;
        let timeopen = req.body.timeopen;
        let timeclose = req.body.timeclose;
        let timeopenclose =timeopen+"-"+timeclose;
        let uploadedFile = req.files.image;
        let image_name = uploadedFile.name;
        let fileExtension = uploadedFile.mimetype.split('/')[1];
        let Equipmentname = req.body.Equipmentname;
        let admin_no = req.body.admin_no;
        let equipmentamount =req.body.equipmentamount;


        
        image_name = workspace_name + '.' + fileExtension;

        let workspaceNameQuery = "SELECT * FROM workspace WHERE workspace_name = '"+ workspace_name +"'";
        db.query(workspaceNameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length < 0) {
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
                        

                            let query = "INSERT INTO workspace (workspace_name, location_no, detail, image, time_openclose, workspace_type_no, admin_no) VALUES ('"+ workspace_name +"', '"+ location +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ admin_no +"' ) ";
                            db.query(query, (err, result3) => {
                            if (err) {
                                return res.status(500).send(err);
                            }          
                            
                            let queryequipmentno  = "SELECT * FROM equipmentname where equipment_name = '"+ Equipmentname +"'";                           
                            db.query(queryequipmentno, (err, result) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }          
                                
                                let equipmentnameno  = result[0].equipment_name_no;
                                console.log(equipmentnameno+"+++++++");

                                let insertworkspaceno = "SELECT * FROM workspace where workspace_no = (SELECT MAX(workspace_no) FROM workspace) ";
                                db.query(insertworkspaceno, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    } 

                                let lastworkspaceno = result[0].workspace_no

                                let insertworkspaceequipment = "INSERT INTO workspace_equipment (equipment_name_no, workspace_no, equipment_max_amount) VALUES ('"+ equipmentnameno +"', '"+ lastworkspaceno +"', '"+ equipmentamount +"') ";
                                db.query(insertworkspaceequipment, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }          
                                    
                                    res.redirect('/');
            
                            });

                                
                                
                        
                        });
                                                                   
                                                      
                    })
                })
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
    },
    detailWorkspacePage: (req, res) => {

        let workspaceId = req.params.workspace_no;
        let query = "SELECT * FROM workspace WHERE workspace_no = '"+ workspaceId +"' ";


    
        

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.render('detail-workspace.ejs', {
                title: "Welcome to Spaceto | detail of Workspaces",
                detail: result[0],
                message: ''
            });
        });

        
    },
    editWorkspacePage: (req, res) =>{
        let workspaceId = req.params.workspace_no;
        let query = "SELECT * FROM workspace WHERE workspace_no = '"+ workspaceId +"' ";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.render('edit-workspace.ejs', {
                title: "Welcome to Spaceto | edit of Workspaces",
                edit: result,
                message: ''
            });
        });


    },
    editWorkspace: (req, res) =>{
        
        let workspaceId = req.params.workspace_no;
        let workspace_name =req.body.workspace_name;
        let timeopen = req.body.timeopen;
        let timeclose = req.body.timeclose;
        let timeopenclose =timeopen+"-"+timeclose;
        let location =req.body.location;
        let detail = req.body.detail;
        let type = req.body.roomtype;


        
        let query = "update workspace set workspace_name = '" + workspace_name + "', location_no = '" + location + "', time_openclose = '" + timeopenclose + "', detail = '" + detail + "', workspace_type_no = '" + type + "' where workspace_no = '" + workspaceId + "' "
        db.query(query, (err,result) => {
            if(err){
                return res.status(500).send(err);
            }
            res.redirect('/');

            
        });

}

}