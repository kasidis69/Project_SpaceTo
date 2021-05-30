const e = require('express');
const fs = require('fs');

module.exports = {
    addWorkspacePage: (req, res) => {
        let query = "SELECT * FROM equipmentnames ORDER BY equipmentNameNo ASC";

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


        
        image_name = workspace_name + '.' + fileExtension;

        let workspaceNameQuery = "SELECT * FROM workspaces WHERE workspaceName = '"+ workspace_name +"'";
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
     
                        let queryequipmentname= "SELECT equipmentNameNo FROM equipmentnames where equipmentName ='"+Equipmentname+"'" ;
                        db.query(queryequipmentname, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }    
                          
                        let eqpnameno = result[0].equipmentNameNo;    
                        console.log(eqpnameno);


                        /* อันนี้ตัวทดลองที่ทำได้
                        let queryeqpname= "insert into test(eqpname) values ('"+ eqpname +"')";
                        db.query(queryeqpname, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }          
                            
                        let querylasteqp="SELECT eqpid FROM test where eqpid = (SELECT MAX(eqpid) FROM test) "    
                        db.query(querylasteqp, (err, result2) => {
                            if (err) {
                                return res.status(500).send(err);
                            }  

                        let eqpid = result2[0].eqpid;    
                        console.log(eqpid);


/*
อันที่ลองเขียนเอง many to many
                    let queryequipmentname= "SELECT equipment_name_no FROM equipmentname where equipment_name ='"+Equipmentname+"'" ;
                        db.query(queryequipmentname, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }          
                        let eqpnameno = result[0].equipment_name_no;    
                        console.log(eqpnameno);

                      let insertnameno="insert into workspace_equipment(equipment_name_no) values ('"+ eqpnameno +"')";  
                        db.query(querylasteqp, (err, result2) => {
                            if (err) {
                                return res.status(500).send(err);

                            }  */
                   
                        let query = "INSERT INTO workspaces (workspaceName, locationNo, status, details, image, timeopenclose, workspacetypeno, equipmentNameNo) VALUES ('"+ workspace_name +"', '"+ location +"', '"+ status +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ eqpnameno +"' ) ";
                        db.query(query, (err, result3) => {
                            if (err) {
                                return res.status(500).send(err);
                            }          
                            res.redirect('/');

                            console.log(Equipmentname);
                        
                        });
                          
               
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
    },
    detailWorkspacePage: (req, res) => {

        let workspaceId = req.params.workspaceNo
        let query = "SELECT * FROM workspaces WHERE workspaceNo = '"+ workspaceId +"' ";

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

        
    }
}