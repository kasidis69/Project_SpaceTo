const { query } = require('express');
const e = require('express');
const fs = require('fs');

module.exports = {
    addWorkspacePage: (req, res) => {
        let query = "select * from location ORDER BY location_no ASC";
        db.query(query, (err, result) => {
            if (err){
                
                res.redirect('/'); 
            }

            let location = result
            let query = "select * from workspacetype ORDER BY workspace_type_no ASC";

            db.query(query, (err, result) => {
                if (err){
                    
                    res.redirect('/');
                }
    
                let workspacetype = result
                let query = "select * from equipmentitem ei join equipmentmodel em on ei.model_no = em.model_no join equipmentbrand eb on em.brand_no = eb.brand_no join equipmentname en on eb.equipment_name_no = en.equipment_name_no where ei.item_status = 'UNAVAILABLE' ORDER BY en.equipment_name_no ASC";

            db.query(query, (err, result) => {
                if (err){
                    
                    res.redirect('/');
                }
    
                let equipment = result
                
                res.render('add-workspace.ejs', {
                    title: "Welcome to Spaceto | View Workspaces",
                    location: location,
                    workspacetype: workspacetype,
                    equipment: equipment,
                    message:''
                });
                
  
            });
                
                
                
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
        let Equipmentitem = req.body.Equipmentitem;
        let admin_no = 1;
        
        


        
        image_name = workspace_name + '.' + fileExtension;

        let workspaceNameQuery = "SELECT * FROM workspace WHERE workspace_name = '"+ workspace_name +"'";
        db.query(workspaceNameQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (result.length > 0) {
                message = "Workspace Name already exists";
                
                let query = "select * from location ORDER BY location_no ASC";

        db.query(query, (err, result) => {
            if (err){
                
                res.redirect('/'); 
            }

            let location = result
            let query = "select * from workspacetype ORDER BY workspace_type_no ASC";

            db.query(query, (err, result) => {
                if (err){
                    
                    res.redirect('/');
                }
    
                let workspacetype = result
                let query = "select * from equipmentitem ei join equipmentmodel em on ei.model_no = em.model_no join equipmentbrand eb on em.brand_no = eb.brand_no join equipmentname en on eb.equipment_name_no = en.equipment_name_no where ei.item_status = 'UNAVAILABLE' ORDER BY en.equipment_name_no ASC";

            db.query(query, (err, result) => {
                if (err){
                    
                    res.redirect('/');
                }
    
                let equipment = result
                
                res.render('add-workspace.ejs', {
                    title: "Welcome to Spaceto | View Workspaces",
                    location: location,
                    workspacetype: workspacetype,
                    equipment: equipment,
                    message
                });
                
  
            });
                
                
                
            });
            
        });

            } else {
                if (uploadedFile.mimetype === 'image/png' || uploadedFile.mimetype === 'image/jpeg' || uploadedFile.mimetype === 'image/gif') {
                    uploadedFile.mv(`public/assets/img/${image_name}`, (err) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                        
                        let query = "select * from location where location_name = '" + location + "' "
                        db.query(query, (err, result) => {
                        if (err) {
                                
                                return res.status(500).send(err);
                            }    
                            let location_no = result[0].location_no;
                            
    
                        if(Equipmentitem == "null"){

                                let query = "INSERT INTO workspace (workspace_name, location_no, detail, image, time_openclose, workspace_type_no, admin_no) VALUES ('"+ workspace_name +"', '"+ location_no +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ admin_no +"' ) ";
                            db.query(query, (err, result3) => {
                            if (err) {
                                
                                return res.status(500).send(err);

                                
                            }

                            res.redirect('/');

                        });



                            }else{

                            let query = "INSERT INTO workspace (workspace_name, location_no, detail, image, time_openclose, workspace_type_no, admin_no) VALUES ('"+ workspace_name +"', '"+ location_no +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ admin_no +"' ) ";
                            db.query(query, (err, result3) => {
                            if (err) {
                                
                                return res.status(500).send(err);

                                
                            }
                            
                            
                        
                                let insertworkspaceno = "SELECT * FROM workspace where workspace_no = (SELECT MAX(workspace_no) FROM workspace) ";
                                db.query(insertworkspaceno, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    } 

                                let lastworkspaceno = result[0].workspace_no

                                let insertworkspaceequipment = "INSERT INTO workspace_equipment (equipment_item_no, workspace_no) VALUES ('"+ Equipmentitem +"', '"+ lastworkspaceno +"') ";
                                db.query(insertworkspaceequipment, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }       

                                    let updateavailable = "update equipmentitem set item_status = 'AVAILABLE' where equipment_item_no = '"+ Equipmentitem +"' ";
                                db.query(updateavailable, (err, result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }          
                                    
                                    res.redirect('/');

                                    
            
                            });


                                    
            
                            });

                                
                                
                        
                        });
                                                                   
                                                      
                    
                })
            }
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
        let query = "SELECT * FROM workspace join location on workspace.location_no = location.location_no join workspacetype on workspace.workspace_type_no = workspacetype.workspace_type_no WHERE workspace_no = '"+ workspaceId +"' ";
        

        
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

            let query = "select * from location ORDER BY location_no ASC";
        db.query(query, (err, result) => {
            if (err){
                
                res.redirect('/'); 
            }

            let location = result
            let query = "select * from workspacetype ORDER BY workspace_type_no ASC";

            db.query(query, (err, result) => {
                if (err){
                    
                    res.redirect('/');
                }

                res.render('edit-workspace.ejs', {
                    title: "Welcome to Spaceto | edit of Workspaces",
                    workspacetype: result,
                    location: location,                   
                    message: ''


                }); 
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


        

        let query = "select * from location where location_name = '" + location + "' "
                        db.query(query, (err, result) => {
                        if (err) {
                                
                                return res.status(500).send(err);
                            }    
                        let location_no = result[0].location_no;

        let query = "update workspace set workspace_name = '" + workspace_name + "', location_no = '" + location_no + "', time_openclose = '" + timeopenclose + "', detail = '" + detail + "', workspace_type_no = '" + type + "' where workspace_no = '" + workspaceId + "' "
        db.query(query, (err,result) => {
            if(err){

                
                return res.status(500).send(err);
            }
            
            res.redirect('/');

            
        });
    });

    },
        deleteWorkspace: (req, res) =>{
            
            let workspaceId = req.params.workspace_no;
            let query = "delete from workspace where workspace_no = "+ workspaceId + "";
            db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
                
                res.redirect('/');

                
            });

        },
        myReservedPage: (req, res) => { 

             res.render('my-reserved.ejs', { title: "Welcome to Spaceto | reserve Workspaces", message: '' }); 
            
        },
        addLocationPage: (req, res) =>{

            res.render('add-location.ejs', { title: "Welcome to Spaceto | add Location", message: '' }); 
               
        },

        addLocation: (req, res) =>{
            let location_name = req.body.location_name;
            let query = "INSERT INTO location (location_name) VALUES ('"+ location_name +"') "
            
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                
                res.redirect('/location');

            });
    
    
        },
        locationPage: (req, res) =>{
       
            let query = "SELECT * FROM location ORDER BY location_no ASC";
                  
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                  
                res.render('location.ejs', {
                    title: "Welcome to Spaceto | location",
                    location: result,
                    message: ''
                });
            });
               
        },
        deleteLocation: (req, res) =>{
            
            let location_no = req.params.location_no;
            let query = "delete from location where location_no = "+ location_no + "";
            db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
                
                res.redirect('/location');

                
            });

        },
        myWorkspacePage: (req, res) =>{

            let search = req.body.search;
            let where ="";
            if(search!=null){
            where = " and workspace_name like '%"+search+"%'";   
            }
            
            let query = "SELECT * FROM workspace where admin_no = 1 "+ where +"ORDER BY workspace_no ASC";
            
            // execute query
            db.query(query, (err, result) => {
                if (err){
                    res.redirect('/myworkspace');
                }
    
                
                res.render('my-workspace.ejs', {
                    title: "Welcome to Spaceto | View Workspaces",
                    workspace: result
                });
    
               
            });

        },
        addWorkspaceTypePage: (req, res) =>{

            res.render('add-workspace-type.ejs', { title: "Welcome to Spaceto | add type", message: '' }); 
               
        },

        addWorkspaceType: (req, res) =>{
            let workspace_type_name = req.body.workspace_type_name;
            let query = "INSERT INTO workspacetype (workspace_type_name) VALUES ('"+ workspace_type_name +"') "
            
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                
                res.redirect('/workspacetype');

            });
    
    
        },
        workspaceTypePage: (req, res) =>{
       
            let query = "SELECT * FROM workspacetype ORDER BY workspace_type_no ASC";
                  
            db.query(query, (err, result) => {
                if (err) {
                    return res.status(500).send(err);
                }
                  
                res.render('workspace-type.ejs', {
                    title: "Welcome to Spaceto | workspacetype",
                    workspacetype: result,
                    message: ''
                });
            });
               
        },
        deleteWorkspaceType: (req, res) =>{
            
            let workspace_type_no = req.params.workspace_type_no;
            let query = "delete from workspacetype where workspace_type_no = "+ workspace_type_no + "";
            db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
                
                res.redirect('/workspacetype');

                
            });



        }

}
