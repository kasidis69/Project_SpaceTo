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
     
                        let queryequipmentname= "SELECT equipment_name_no FROM equipmentname where equipment_name ='"+Equipmentname+"'" ;
                        db.query(queryequipmentname, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }    
                          
                        let eqpnameno = result[0].equipment_name_no;    
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
                   
                        let query = "INSERT INTO workspace (workspace_name, location_no, detail, image, time_openclose, workspace_type_no, equipment_name_no) VALUES ('"+ workspace_name +"', '"+ location +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ eqpnameno +"' ) ";
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
        let workspaceId = req.params.workspaceNo;
        let query = "SELECT * FROM workspace WHERE workspace_no = '"+ workspaceId +"' ";

        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            res.render('edit-workspace.ejs', {
                title: "Welcome to Spaceto | edit of Workspaces",
                detail: result[0],
                message: ''
            });
        });


    },
    editWorkspace: (req, res) =>{
        
        let workspace_name =req.body.workspace_name;
        let image_name = uploadedFile.name;
        let timeopen = req.body.timeopen;
        let timeclose = req.body.timeclose;
        let timeopenclose =timeopen+"-"+timeclose;
        
        let query = "update workspace set workspace_name = '" + workspace_name + "', image = '" + image_name + "', time_openclose = '" + timeopenclose + "' where workspace_no = '" + workspaceNo + "' "
        db.query(query, (err,result) => {
            if(err){
                return res.status(500).send(err);
            }
            res.redirect('/');

            
        });

}
}