const { query } = require("express");
const e = require("express");
const fs = require("fs");

module.exports = {
  reserveWorkspacePage: (req, res) => {
    let workspaceId = req.params.workspace_no;
    let query =
      "SELECT * FROM workspace wp join equipmentitem ei on wp.workspace_no = ei.workspace_no join equipmentmodel em on ei.model_no = em.model_no join equipmentbrand eb on em.brand_no = eb.brand_no join equipmentname en on eb.equipment_name_no = en.equipment_name_no  where wp.workspace_no = '" +
      workspaceId +
      "' ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      let result1 = result;
      let query ="SELECT * from reserve rs join workspace wp on rs.workspace_no = wp.workspace_no where wp.workspace_no = '" +workspaceId + "' order by rs.reserve_datetime_start ASC ";

      db.query(query, (err, result2) => {
        if (err) {
          return res.status(500).send(err);
        }
      
        

      let reserve = result2;
      var array = [] ;

      reserve.forEach((reserves, index) => {  
          let a = reserves.reserve_datetime_start   
          let c = reserves.reserve_datetime_end    
          let b  = a+""+c  


          var arr = b.split(" ");
          datetime = arr[2]+"  "+arr[1]+"  "+arr[4]+" - "+arr[11];
          array.push(datetime)


       })   
           
       
      res.render("reserve-workspace.ejs", {
        title: "Welcome to Spaceto | edit of Workspaces",
        reserve: result1,
        reserved: array,
        message: "",
        account: req.session.account
      });
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
    let equipmentitem = req.body.Equipmentitem;

    

    
    if(equipmentitem != "No Equipment"){
      var str = equipmentitem;
  var arr = str.split(" SerialID: ");
  equipmentitem = arr[1];
  }

    let query =
      "SELECT * FROM workspace wp  join equipmentitem ei on wp.workspace_no = ei.workspace_no join equipmentmodel em on ei.model_no = em.model_no join equipmentbrand eb on em.brand_no = eb.brand_no join equipmentname en on eb.equipment_name_no = en.equipment_name_no where wp.workspace_no = '" +
      workspaceId +
      "' ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }



      let query ="SELECT * from reserve rs join workspace wp on rs.workspace_no = wp.workspace_no where wp.workspace_no = '" +workspaceId + "' order by rs.reserve_datetime_start ASC ";

      db.query(query, (err, result2) => {
        if (err) {
          return res.status(500).send(err);
        }
      

      let date = result2;
      var array = [] ;

      date.forEach((dates, index) => {  
          let a = dates.reserve_datetime_start   
          let b = dates.reserve_datetime_end    
          let c  = a+""+b  

          var arr = c.split(" ");
          datetime = arr[2]+"  "+arr[1]+"  "+arr[4]+" - "+arr[14];
          
          array.push(datetime)
       })
    if (req.session.account) {
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
          reserve : reserve,
          reserved: array,
          account: req.session.account

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
              reserve : reserve,
              reserved: array,
              account: req.session.account
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
                  reserve : reserve,
                  reserved: array,
                  account: req.session.account
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
                  reserve : reserve,
                  reserved: array,
                  account: req.session.account
                });
                
              } else {///// เช็คของ reserve หมดแล้วว่าไม่ทับเวลากัน 
               
                

                let insertreserve =
                "insert reserve set username = '"+req.session.account.username+"', workspace_no = '" +workspaceId +"', reserve_datetime_start = '" +reserve_datetime_start +"', reserve_datetime_end = '" + reserve_datetime_end +
                "' ";
              db.query(insertreserve, (err, result) => {
                if (err) {
                  return res.status(500).send(err);
                }

                

                  res.redirect('/');

                


                
                
               
              });
                
            
  
              }
            });

              }
            });
          }
        });
      }
    });

  } else {
     res.redirect('/login');
  }

  });
});


  },
  workspaceRequestPage: (req, res) => {
    let query =
      "SELECT wp.image,rs.reserve_status,rs.reserve_no,us.firstname , rs.timestamp , rs.reserve_datetime_start, rs.reserve_datetime_end, wp.workspace_name,wt.workspace_type_name,wp.detail,en.equipment_name FROM reserve rs join workspace wp on rs.workspace_no=wp.workspace_no join users us on rs.username = us.username join workspacetype wt on wp.workspace_type_no = wt.workspace_type_no  left join equipmentitem ei on wp.workspace_no = ei.workspace_no left join equipmentmodel em on ei.model_no = em.model_no left join equipmentbrand eb on eb.brand_no = em.brand_no left join equipmentname en on en.equipment_name_no = eb.equipment_name_no   ORDER BY wp.workspace_no DESC ";

    db.query(query, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }

      let date = result;
      var array = [] ;

      date.forEach((dates, index) => {  
          let a = dates.reserve_datetime_start   
          let b = dates.reserve_datetime_end    
          let c  = a+""+b  

          var arr = c.split(" ");
          datetime = arr[2]+"  "+arr[1]+"  "+arr[4]+" - "+arr[12];
          array.push(datetime)
          
       })


      res.render("workspace-request.ejs", {
        title: "Welcome to Spaceto | Workspaces request",
        reserverequests: result,
        reserved: array,
        message: "",
        account: req.session.account
      });
    });
  
  },
  cancelReserveWorkspace: (req, res) =>{
      let reserveNo = req.params.reserve_no;
      let query = "UPDATE RESERVE SET RESERVE_STATUS = 'CANCELRESERVED' WHERE RESERVE_NO = '"+ reserveNo +"' ";
  
          
          
  
          db.query(query, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
  
              res.redirect('/myreserved');
          });
  },
  
  myReservedPage: (req, res) =>{
    let userNo = req.session.account.username;
    let query = "SELECT wp.image,rs.reserve_status,rs.reserve_no,us.firstname , rs.timestamp , rs.reserve_datetime_start, rs.reserve_datetime_end, wp.workspace_name,wt.workspace_type_name,wp.detail,en.equipment_name  FROM reserve rs join workspace wp on rs.workspace_no=wp.workspace_no join users us on rs.username = us.username join workspacetype wt on wp.workspace_type_no = wt.workspace_type_no  left join equipmentitem ei on wp.workspace_no = ei.workspace_no left join equipmentmodel em on ei.model_no = em.model_no left join equipmentbrand eb on eb.brand_no = em.brand_no left join equipmentname en on en.equipment_name_no = eb.equipment_name_no where us.username = '"+ userNo +"' ORDER BY rs.reserve_no DESC";
  
    

      db.query(query, (err, result) => {
          if (err) {
              return res.status(500).send(err);
          }
          
          let date = result;
          var array = [] ;

           date.forEach((dates, index) => {  
          let a = dates.reserve_datetime_start   
          let b = dates.reserve_datetime_end    
          let c  = a+""+b  

          var arr = c.split(" ");
          datetime = arr[2]+"  "+arr[1]+"  "+arr[4]+" - "+arr[12];
          array.push(datetime)
          
       })

          res.render('my-reserved.ejs', {
              title: "Welcome to Spaceto | reserved",
              reserves: result,
              reserved: array,
              message: '',
              account: req.session.account
              
              
          });
      });
  
  },
  checkInWorkspace: (req, res) =>{
      let reserveNo = req.params.reserve_no;
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
  
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
      // current year
      let year = date_ob.getFullYear();
  
      // current hours
      let hours = date_ob.getHours();
  
      // current minutes
      let minutes = date_ob.getMinutes();
  
      // current seconds
      let seconds = date_ob.getSeconds();
  
      let current_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
  
      let query = "UPDATE RESERVE SET RESERVE_STATUS = 'CHECKIN' WHERE RESERVE_NO = '"+ reserveNo +"' AND RESERVE_DATETIME_START <= '"+ current_time +"' AND RESERVE_DATETIME_END >= '"+ current_time +"'";

      
        
          
  
          db.query(query, (err, result) => {
              if (err) {
                
                  return res.status(500).send(err);
                  
              }              
              res.redirect('/myreserved');
              
          });
  },
  checkOutWorkspace: (req, res) =>{
      let reserveNo = req.params.reserve_no;
      let date_ob = new Date();
      let date = ("0" + date_ob.getDate()).slice(-2);
  
      // current month
      let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  
      // current year
      let year = date_ob.getFullYear();
  
      // current hours
      let hours = date_ob.getHours();
  
      // current minutes
      let minutes = date_ob.getMinutes();
  
      // current seconds
      let seconds = date_ob.getSeconds();
  
      let current_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
      let query = "UPDATE RESERVE SET RESERVE_STATUS = 'CHECKOUT' WHERE RESERVE_NO = '"+ reserveNo +"' AND RESERVE_DATETIME_START <= '"+ current_time +"'";
  
          
          
  
          db.query(query, (err, result) => {
              if (err) {
                  return res.status(500).send(err);
              }
  
              res.redirect('/myreserved');
          });
  }
  
  
  }