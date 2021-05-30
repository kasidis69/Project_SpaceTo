const e = require('express');


module.exports = {
    addEquipmentPage: (req, res) => {
        res.render('add-equipment.ejs', {
            title: "Welcome to Spaceto | Add your Equipment",
            message: '',
            eqpdata: ''

        });

    },
    addEquipment: (req, res) => {


        let message = "";
        let equipment_name = req.body.equipment_name;
        let equipment_serial_id = req.body.equipment_serial_id;
        let equipment_brand = req.body.equipment_brand;
        let equipment_model = req.body.equipment_model;
        let location = req.body.location;


        let equipmentidQuery = "SELECT * FROM equipmentnames WHERE equipmentname  = '" + equipment_name + "'";

        db.query(equipmentidQuery, (err, result) => {
            if (err) {
                return res.status(500).send(err);

            }

            if (result.length > 0) {
                message = "equipment already exists";
                res.render('add-equipment.ejs', {
                    message,
                    title: "Welcome to Spaceto | Add a new Workspaces"
                });


            } else {
 
                        let query = "INSERT INTO equipmentnames (equipmentName) VALUES ('" + equipment_name + "' ) ";
                        db.query(query, (err, result) => {
                            if (err) {
                                return res.status(500).send(err);
                            }

                            res.redirect('/');
                        });
              
               

            }


        });
    }//,


}
