const { query } = require("express");
const e = require("express");
const fs = require("fs");

module.exports = {
  reserveWorkspacePage: (req, res) => {
    let workspaceId = req.params.workspace_no;
    let query =
      "SELECT * FROM workspace wp join workspace_equipment we on wp.workspace_no = we.workspace_no join equipmentitem ei on we.equipment_item_no = ei.equipment_item_no join equipmentmodel em on ei.model_no = em.model_no join equipmentbrand eb on em.brand_no = eb.brand_no join equipmentname en on eb.equipment_name_no = en.equipment_name_no where wp.workspace_no = '" +
      workspaceId +
      "' ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("reserve-workspace.ejs", {
        title: "Welcome to Spaceto | edit of Workspaces",
        reserve: result,
        message: "",
      });
    });
  },

  reserveWorkspace: (req, res) => {
    let workspaceId = req.params.workspace_no;
    let reservedate = req.body.reservedate;
    let timestart = req.body.timestart;
    let timeend = req.body.timeend;
    let reserve_datetime_start = reservedate + " " + timestart;
    let reserve_datetime_end = reservedate + " " + timeend;
    let equipmentitem = req.body.equipmentitem;


    let query =
      "SELECT * FROM workspace wp join workspace_equipment we on wp.workspace_no = we.workspace_no join equipmentitem ei on we.equipment_item_no = ei.equipment_item_no join equipmentmodel em on ei.model_no = em.model_no join equipmentbrand eb on em.brand_no = eb.brand_no join equipmentname en on eb.equipment_name_no = en.equipment_name_no where wp.workspace_no = '" +
      workspaceId +
      "' ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      let reserve = result;

    let reservecheck = "select * from reserve where workspace_no = " +workspaceId +" and (reserve_datetime_start <= '" +reserve_datetime_start +"' and reserve_datetime_end >= '" +reserve_datetime_end +
      "')";
    db.query(reservecheck, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (result.length > 0) {
        message = "This period time  has already reserved , Please try again ";
        res.render("reserve-workspace.ejs", {
          message,
          title: "Welcome to Spaceto | Add a new Workspaces",
          reserve : reserve
        });
      } else {
        let reservecheck2 ="select * from reserve where workspace_no = " +workspaceId +" and (reserve_datetime_start > '" +reserve_datetime_start +"' and reserve_datetime_start <= '" +reserve_datetime_end +"')";
        db.query(reservecheck2, (err, result) => {
          if (err) {
            return res.status(500).send(err);
          }

          if (result.length > 0) {
            message =
              "This period time  has already reserved , Please try again ";

            res.render("reserve-workspace.ejs", {
              message,
              title: "Welcome to Spaceto | Add a new Workspaces",
              reserve : reserve
            });
          } else {
            let reservecheck3 =
              "select * from reserve where workspace_no = " +workspaceId +" and (reserve_datetime_end >= '" +reserve_datetime_start +"' and reserve_datetime_end < '" +reserve_datetime_end +
              "')";
            db.query(reservecheck3, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }

              if (result.length > 0) {
                message =
                  "This period time  has already reserved , Please try again ";

                res.render("reserve-workspace.ejs", {
                  message,
                  title: "Welcome to Spaceto | Add a new Workspaces",
                  reserve : reserve
                });
              } else {
                 "select * from reserve where workspace_no = " +workspaceId +" and (reserve_datetime_end >= '" +reserve_datetime_start +"' and reserve_datetime_end < '" +reserve_datetime_end +
              "')";
            db.query(reservecheck3, (err, result) => {
              if (err) {
                return res.status(500).send(err);
              }

              if (result.length > 0) {
                message =
                  "This period time  has already reserved , Please try again ";

                res.render("reserve-workspace.ejs", {
                  message,
                  title: "Welcome to Spaceto | Add a new Workspaces",
                  reserve : reserve
                });
                
              } else {///// เช็คของ reserve หมดแล้วว่าไม่ทับเวลากัน เช็คrequest eqp ต่อ
               


                let insertreserve =
                "insert reserve set user_no = '1', workspace_no = '" +workspaceId +"', reserve_datetime_start = '" +reserve_datetime_start +"', reserve_datetime_end = '" + reserve_datetime_end +
                "' ";
              db.query(insertreserve, (err, result) => {
                if (err) {
                  return res.status(500).send(err);
                }

                if(equipmentitem == "null"){

                  res.redirect('/');

                }else{


                let selectlastreserveno = "SELECT * FROM reserve where reserve_no = (SELECT MAX(reserve_no) FROM reserve) ";
              db.query(selectlastreserveno, (err, result) => {
                if (err) {
                  return res.status(500).send(err);
                }

                let lastreserveno = result[0].reserve_no
                


                let queryequipmentno  = "SELECT * FROM equipmentitem where equipment_item_no = '"+ equipmentitem +"'";  
                
                db.query(queryequipmentno, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                let equipmentno = result[0].equipment_item_no
                let insertrequestequipment = "INSERT INTO request_equipment (equipment_item_no, reserve_no) VALUES ('"+ equipmentno +"', '"+ lastreserveno +"') "
                db.query(insertrequestequipment, (err, result) => {
                  if (err) {
                    return res.status(500).send(err);
                  }
                  
                  
                  res.redirect('/');
                     
                 
                });
           
                 
                });
              });
            
            }
                
               
              });
                
            
  
              }
            });

              }
            });
          }
        });
      }
    });
  });
  },
  workspaceRequestPage: (req, res) => {
    let query =
      "SELECT rs.reserve_no,us.firstname , rs.timestamp , rs.reserve_datetime_start, rs.reserve_datetime_end, wp.workspace_name,wt.workspace_type_name,wp.detail,en.equipment_name FROM reserve rs join workspace wp on rs.workspace_no=wp.workspace_no join users us on rs.user_no = us.user_no join workspacetype wt on wp.workspace_type_no = wt.workspace_type_no left join request_equipment re on rs.reserve_no = re.reserve_no left join equipmentitem ei on re.equipment_item_no = ei.equipment_item_no left join equipmentmodel em on ei.model_no = em.model_no left join equipmentbrand eb on eb.brand_no = em.brand_no left join equipmentname en on en.equipment_name_no = eb.equipment_name_no   ORDER BY rs.reserve_no ASC ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      res.render("workspace-request.ejs", {
        title: "Welcome to Spaceto | Workspaces request",
        reserverequest: result,
        message: "",
      });
    });
  },
};
