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

        let msg = "location not found please add location before your create workspace"    

        if(result == 0)  {
            res.render('location.ejs', {
                title: "Welcome to Spaceto | location",
                location: result,
                message:msg,
                account: req.session.account
            });
  
        } else {

        let query2 = "select * from workspacetype ORDER BY workspace_type_no ASC";
        db.query(query2, (err, result) => {
            if (err){               
                res.redirect('/'); 
            }

        let msg2 = "workspace type not found please add type before your create workspace"    

        if(result == 0)  {
            res.render('workspace-type.ejs', {
                title: "Welcome to Spaceto | type",
                workspacetype: result,
                message:msg2,
                account: req.session.account
            });
  
        } else {


        
           
        /*/ เข้าหน้าแอดเลย */
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
                    message:'',
                    account: req.session.account
                });
                
  
            });
                
                
                
            });
            
        });
    }
    }); 

}
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
        let user_no = 1;
        
        

        if(Equipmentitem != "No Equipment"){
            var str = Equipmentitem;
        var arr = str.split(" SerialID: ");
        Equipmentitem = arr[1];
        }
        

        
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
                    message,
                    account: req.session.account
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
                            
    
                        if(Equipmentitem == "No Equipment"){

                                let query = "INSERT INTO workspace (workspace_name, location_no, detail, image, time_openclose, workspace_type_no, user_no) VALUES ('"+ workspace_name +"', '"+ location_no +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ user_no +"' ) ";
                            db.query(query, (err, result3) => {
                            if (err) {
                                
                                return res.status(500).send(err);

                                
                            }

                            res.redirect('/');

                        });



                            }else{

                            let query = "INSERT INTO workspace (workspace_name, location_no, detail, image, time_openclose, workspace_type_no, user_no) VALUES ('"+ workspace_name +"', '"+ location_no +"', '"+ detail +"', '"+ image_name +"' , '"+ timeopenclose +"' , '"+ workspacetypeid +"', '"+ user_no +"' ) ";
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
        let query = "SELECT wp.workspace_no,wp.image,wp.workspace_name,lc.location_name,wp.time_openclose,wt.workspace_type_name,wp.workspace_status,wp.detail,en.equipment_name FROM workspace wp join location lc on wp.location_no = lc.location_no join workspacetype wt on wp.workspace_type_no = wt.workspace_type_no left join workspace_equipment we on wp.workspace_no = we.workspace_no left join equipmentitem ei on we.equipment_item_no = ei.equipment_item_no left join equipmentmodel em on ei.model_no=em.model_no left join equipmentbrand eb on em.brand_no = eb.brand_no left join equipmentname en on eb.equipment_name_no = en.equipment_name_no  WHERE wp.workspace_no = '"+ workspaceId +"' ";
        

        
        db.query(query, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }

           

            res.render('detail-workspace.ejs', {
                title: "Welcome to Spaceto | detail of Workspaces",
                detail: result[0],
                message: '',
                account: req.session.account
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
                    message: '',
                    account: req.session.account


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

            let query = "select * from workspace wp join workspace_equipment we on wp.workspace_no = we.workspace_no  join equipmentitem ei on we.equipment_item_no = ei.equipment_item_no where wp.workspace_no = "+ workspaceId + ""                     
            db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
 
                if(result.length > 0){

                let equipmentitem = result[0].equipment_item_no;
                let query = "UPDATE equipmentitem SET item_status = 'UNAVAILABLE' where equipment_item_no = "+ equipmentitem + "";
                db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
                
                let query = "delete from workspace where workspace_no = "+ workspaceId + "";
                db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
                
                res.redirect('/');

                
            });

                
            });
        }else {

            let query = "delete from workspace where workspace_no = "+ workspaceId + "";
                db.query(query, (err,result) => {
                if(err){
                    return res.status(500).send(err);
                }
                
                res.redirect('/');

                
            });

        }


                
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
                    message: '',
                    account: req.session.account
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
            
            let query = "SELECT * FROM workspace where user_no = 1 "+ where +"ORDER BY workspace_no ASC";
            
            // execute query
            db.query(query, (err, result) => {
                if (err){
                    res.redirect('/myworkspace');
                }
    
                
                res.render('my-workspace.ejs', {
                    title: "Welcome to Spaceto | View Workspaces",
                    workspace: result,
                    account: req.session.account
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
                    message: '',
                    account: req.session.account
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
