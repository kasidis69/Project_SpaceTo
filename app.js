const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const session = require('express-session'); 
const PORT = process.env.PORT || 5000    



const {getHomePage} = require('./routes/index');
const {addWorkspacePage, addWorkspace, deleteWorkspace, editWorkspacePage, editWorkspace, detailWorkspacePage, myworkspacePage, addLocationPage, addLocation, LocationPage, deleteLocation, locationPage, myWorkspacePage, workspaceTypePage, addWorkspaceTypePage, addWorkspaceType, deleteWorkspaceType} = require('./routes/workspace');
const { reserveWorkspacePage,  reserveWorkspace, myReservedPage, cancelReserveWorkspace, checkInWorkspace, checkOutWorkspace, workspaceRequestPage } = require('./routes/reserve');
const {addEquipmentPage, addEquipment, deleteEquipmentPage, deleteEquipment, equipmentPage} = require('./routes/equipment');
const {loginPage, login} = require('./routes/login');
const {logout} = require('./routes/logout');



const db = mysql.createConnection({
    host: 'eu-cdbr-west-01.cleardb.com',
    user: 'b7b2d074e77e38',
    password: 'c5fd1cf4',
    database: 'heroku_af26ac12eab2980'
});




db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database successfully');
});

global.db = db;

                                                                                                                                  
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.get('/login', loginPage);
app.post('/login', login);
app.get('/logout', logout);

app.get('/', getHomePage);
app.get('/add', addWorkspacePage);
app.get('/detail/:workspace_no', detailWorkspacePage);
app.get('/edit/:workspace_no', editWorkspacePage);
app.get('/addeqp', addEquipmentPage);
app.get('/eqp', equipmentPage);
app.get('/reserve/:workspace_no', reserveWorkspacePage);
app.get('/myreserved', myReservedPage);
app.get('/workspacerequest', workspaceRequestPage);
app.get('/addlocation', addLocationPage);
app.get('/location', locationPage);
app.get('/myworkspace', myWorkspacePage);
app.get('/workspacetype', workspaceTypePage);
app.get('/addworkspacetype', addWorkspaceTypePage);


app.get('/delete/:workspace_no', deleteWorkspace);
app.post('/add', addWorkspace);
app.post('/addeqp', addEquipment);
app.post('/edit/:workspace_no', editWorkspace);
app.post('/reserve/:workspace_no', reserveWorkspace);
app.get('/canclereserve/:reserve_no', cancelReserveWorkspace);
app.get('/checkinworkspace/:reserve_no', checkInWorkspace);
app.get('/checkoutworkspace/:reserve_no', checkOutWorkspace);
app.post('/', getHomePage);
app.post('/myworkspace', myWorkspacePage);
app.get('/eqpdel/:equipment_item_no', deleteEquipment);
app.post('/addlocation', addLocation);
app.get('/locationdel/:location_no', deleteLocation); 
app.post('/addworkspacetype', addWorkspaceType);
app.get('/workspacetypedel/:workspace_type_no', deleteWorkspaceType); 




app.listen(PORT, ()=> {
    console.log(`Server running on port : ${PORT}`)
});