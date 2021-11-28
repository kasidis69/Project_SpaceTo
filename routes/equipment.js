const e = require('express');


module.exports = {
    addEquipmentPage: (req, res) => {
        res.render('add-equipment.ejs', {
            title: "Welcome to Spaceto | Add your Equipment",
            message: '',
            eqpdata: '',
            account: req.session.account

        });

    },
    addEquipment: (req, res) => {


        let message = "";
        let equipment_name = req.body.equipment_name;
        let equipment_item_no = req.body.equipment_serial_id;
        let equipment_brand = req.body.equipment_brand;
        let equipment_model = req.body.equipment_model;
        


        let equipmentnoQuery = "SELECT * FROM equipmentitem WHERE equipment_item_no  = '" + equipment_item_no + "'";

        db.query(equipmentnoQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);

            }
            /* เช็คว่า id eqp นี้มีคนแอดยัง */
            if (result.length > 0) {
                message = "equipment serial ID is already add";
                res.render('add-equipment.ejs', {
                    message,
                    title: "Welcome to Spaceto | Add a new Workspaces",
                    account: req.session.account
                });

            } else {
                  
                let equipmentnameduplicate = "SELECT * FROM equipmentname WHERE equipment_name = '" + equipment_name + "'";
                db.query(equipmentnameduplicate, (err, result) =>{
                    if(err){
                        return res.status(500).send(err);
                    }

                    /*เช็คก่อนว่าชื่อเคยมียัง ถ้ามีเข้า if นี้*/ 
                    if (result.length > 0) {

                        let equipmentbranduplicate = "SELECT * FROM equipmentbrand WHERE brand_name  = '" + equipment_brand + "'";
                        db.query(equipmentbranduplicate, (err, result)=>{
                            if(err){
                                return res.status(500).send(err);
                            }    
                            /* เช็คอีกว่าชื่อนี้แบรนนี้มียัง ถ้ามีแล้วเข้า if นี้*/
                            if(result.length>0){

                            let equipmentmodeluplicate = "SELECT * FROM equipmentmodel WHERE model_name  = '" + equipment_model + "'";    
                            db.query(equipmentmodeluplicate, (err, result)=>{
                                if(err){
                                    return res.status(500).send(err);
                                }    
                                
                                /* เช็คอีกว่าชื่อนี้แบรนด์นี้เคยมีโมเดลตัวนี้หรือยัง ถ้ามีแล้ว เข้า if นี้ละแอด itemno เลย */
                                if(result.length>0){
                                    
                                    let modelno = result[0].model_no;
                                    let insertitem = "INSERT INTO equipmentitem (model_no, equipment_item_no) VALUES ('" + modelno +"', '" + equipment_item_no +"' ) ";
                                    db.query(insertitem, (err, result)=>{
                                    if(err){
                                        return res.status(500).send(err);
                                    }    
                                    res.redirect('/eqp'); 
                                    })
                                

                                /*ถ้ายังแอดโมเดลด้วย */    
                                }else{

                                    let equipmentbrand = "SELECT * FROM equipmentbrand WHERE brand_name = '" + equipment_brand + "'";
                                    db.query(equipmentbrand, (err, result)=>{
                                        if(err){
                                            return res.status(500).send(err);
                                        }    

                                        let brandno = result[0].brand_no;
                                        let insertmodel = "INSERT INTO equipmentmodel (brand_no, model_name) VALUES ('" + brandno +"', '" + equipment_model +"' ) ";
                                        db.query(insertmodel, (err, result)=>{
                                        if(err){
                                            return res.status(500).send(err);
                                        }    
                                        
                                        let querylasteqpmodelno="SELECT model_no FROM equipmentmodel where model_no = (SELECT MAX(model_no) FROM equipmentmodel) "    
                                    db.query(querylasteqpmodelno, (err, result) => {
                                    if (err) {
                                    return res.status(500).send(err);
    
                                     }
                                    let eqplastmodelno = result[0].model_no;    
                                    
                                        
                                    let queryinsertitem = "INSERT INTO equipmentitem (model_no, equipment_item_no) VALUES ('" + eqplastmodelno +"', '" + equipment_item_no +"' ) ";
                                    db.query(queryinsertitem, (err,result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
    
                                        res.redirect('/eqp'); 
                                        
                                        
                                    })
                            
                                  })
                                      
                                        })


                                        })
                                  
                                }
                                }) 
                                
                            /*ถ้าชื่อนี้เคยมีแล้ว แต่ยังไม่เคยมีชื่อแบรนด์นี้ แอดแบรนด์ */    
                            }else{

                                let equipmentname = "SELECT * FROM equipmentname WHERE equipment_name = '" + equipment_name + "'";
                                db.query(equipmentname, (err, result)=>{
                                    if(err){
                                        return res.status(500).send(err);
                                    }           

                                    let nameno = result[0].equipment_name_no;
                                    let insertbrand = "INSERT INTO equipmentbrand (equipment_name_no, brand_name) VALUES ('" + nameno +"', '" + equipment_brand +"' ) ";
                                    db.query(insertbrand, (err, result)=>{
                                    if(err){
                                        return res.status(500).send(err);
                                    }  
                                    
                                    let querylasteqpbrandno="SELECT brand_no FROM equipmentbrand where brand_no = (SELECT MAX(brand_no) FROM equipmentbrand) "    
                                    db.query(querylasteqpbrandno, (err, result) => {
                                    if (err) {
                                    return res.status(500).send(err);
       
                                    }
                                    let eqplastbrandno = result[0].brand_no;    
                                    
                                        
                                    let queryinsertmodel = "INSERT INTO equipmentmodel (brand_no, model_name) VALUES ('" + eqplastbrandno +"', '" + equipment_model +"' ) ";
                                    db.query(queryinsertmodel, (err,result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
    
    
                                    
                                    let querylasteqpmodelno="SELECT model_no FROM equipmentmodel where model_no = (SELECT MAX(model_no) FROM equipmentmodel) "    
                                    db.query(querylasteqpmodelno, (err, result) => {
                                    if (err) {
                                    return res.status(500).send(err);
    
                                     }
                                    let eqplastmodelno = result[0].model_no;    
                                    
                                        
                                    let queryinsertitem = "INSERT INTO equipmentitem (model_no, equipment_item_no) VALUES ('" + eqplastmodelno +"', '" + equipment_item_no +"' ) ";
                                    db.query(queryinsertitem, (err,result) => {
                                    if (err) {
                                        return res.status(500).send(err);
                                    }
    
                                        res.redirect('/eqp'); 
                                        
                                        
                                    })
                            
                                  })
                                        
                                        
                                    })
                            
                                  })
                                                                      
                                    })
  
                                    
                                })

                            }
                            })


                    /*อันนี้คือชื่อยังไม่เคยมี*/ 
                    } else {
                  
                    let queryequipmentname = "INSERT INTO equipmentname (equipment_name) VALUES ('" + equipment_name + "' ) ";
                    db.query(queryequipmentname, (err, result) => {
                        if (err) {
                            return res.status(500).send(err);
                        }
                       

                        let querylasteqpnameno="SELECT equipment_name_no FROM equipmentname where equipment_name_no = (SELECT MAX(equipment_name_no) FROM equipmentname) "    
                        db.query(querylasteqpnameno, (err, result1) => {
                            if (err) {
                                return res.status(500).send(err);


                            }
                                let eqplastnameno = result1[0].equipment_name_no;    
                                let queryinsertbrand = "INSERT INTO equipmentbrand (equipment_name_no, brand_name) VALUES ('" + eqplastnameno +"', '" + equipment_brand +"' ) ";
                                db.query(queryinsertbrand, (err,result2) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }
                             
                                let querylasteqpbrandno="SELECT brand_no FROM equipmentbrand where brand_no = (SELECT MAX(brand_no) FROM equipmentbrand) "    
                                db.query(querylasteqpbrandno, (err, result) => {
                                if (err) {
                                return res.status(500).send(err);


                                 }
                                let eqplastbrandno = result[0].brand_no;    
                                
                                    
                                let queryinsertmodel = "INSERT INTO equipmentmodel (brand_no, model_name) VALUES ('" + eqplastbrandno +"', '" + equipment_model +"' ) ";
                                db.query(queryinsertmodel, (err,result) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }


                                
                                let querylasteqpmodelno="SELECT model_no FROM equipmentmodel where model_no = (SELECT MAX(model_no) FROM equipmentmodel) "    
                                db.query(querylasteqpmodelno, (err, result) => {
                                if (err) {
                                return res.status(500).send(err);

                                 }
                                let eqplastmodelno = result[0].model_no;    
                                
                                    
                                let queryinsertitem = "INSERT INTO equipmentitem (model_no, equipment_item_no) VALUES ('" + eqplastmodelno +"', '" + equipment_item_no +"' ) ";
                                db.query(queryinsertitem, (err,result) => {
                                if (err) {
                                    return res.status(500).send(err);
                                }

                                    res.redirect('/eqp'); 
                                    
                                    
                                })
                        
                              })
                                    
                                    
                                })
                        
                              })
                                                                  
                                })
                        
                              })

                        

                    });

                }
                }) 

                                       
                


               

            }


        });
    },

    equipmentPage: (req, res) => {


        let query = "SELECT en.equipment_name,eb.brand_name,em.model_name,ei.equipment_item_no,we.workspace_no,ei.item_status FROM equipmentname en join equipmentbrand eb on en.equipment_name_no = eb.equipment_name_no join equipmentmodel em on eb.brand_no = em.brand_no join equipmentitem ei on em.model_no = ei.model_no left join workspace_equipment we on ei.equipment_item_no = we.equipment_item_no ORDER BY we.workspace_equipment_no ASC";
        db.query(query, (err, result) => {
            if (err){
                res.redirect('/');
            }

            res.render('equipment.ejs', {
                title: "Welcome to Spaceto | All Equipment",
                eqp: result,
                account: req.session.account
            });

           
        });

    },


    deleteEquipment: (req, res) => {

        let equipmentitemno = req.params.equipment_item_no;
        let query = "delete from equipmentitem where equipment_item_no = "+ equipmentitemno + "";
        db.query(query, (err,result) => {
            if(err){
                return res.status(500).send(err);
            }
            
            res.redirect('/eqp');

            
        });
    },
    


}
