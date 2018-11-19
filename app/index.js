const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
const port = 3000

const userList = [{
  email: "johndoe@company1.com",
  firstname: "John",
  lastname: "Doe",
  organization: "company1"
}, {
  email: "johannadoe@company2.com",
  firstname: "Johanna",
  lastname: "Doe",
  organization: "company2"
}, {
  email: "mikesmith@company3.com",
  firstname: "Mike",
  lastname: "Smith",
  organization: "company3"
}, {
  email: "michellemccarraon@company4.com",
  firstname: "Michelle",
  lastname: "McCarron",
  organization: "company4"
}];

// For CDN of css and so
app.use(express.static('ui'));

// For POST body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// For HTML as template engine
app.set('views', path.join(process.cwd() + '/ui/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('', (req, res) => {
  res.redirect('user-list');
});

app.get('/user-list', (req, res) => {
    // res.render('role-list.html', {roles});
  res.render('users.html', {userList});
});

app.get('/user-add', (req, res) => {
    // res.render('role-list.html', {roles});
  res.render('user-add.html');
});

app.post('/user-add', (req, res) => {
  req.body.id = 'ID_UUID';
  // Create user
  userList.push({firstname: req.body.firstname, lastname: req.body.lastname,email: req.body.email, organization: req.body.organization});

  res.redirect('role-list');
});

app.get('/role-list', (req, res) => {
  const roles = [
    { name: "Mark", description: "Otto", organization: "@mdo", permissionCount: 12},
    { name: "Jacob", description: "Thornton", organization: "@fat", permissionCount: 2},
    { name: "Larry", description: "the Bird", organization: "@twitter", permissionCount: 188}
  ];

  res.render('role-list.html', {roles});
});

app.get('/roles', (req, res) => {
  const roles = [
    { name: "Mark", description: "Otto", organization: "@mdo", permissionCount: 12},
    { name: "Jacob", description: "Thornton", organization: "@fat", permissionCount: 2},
    { name: "Larry", description: "the Bird", organization: "@twitter", permissionCount: 188}
  ];

  res.render('role-list.html', {roles});
});

app.get('/role-add', (req, res) => {
  res.render('role-add.html');
});

app.post('/role-details', (req, res) => {
  const role = {
    name: req.body.name,
    description: req.body.description,
    organization: req.body.organization,
    id: 'ID_UUID'
  };

  // Create role

  const permissions = [
    { active: false, name: 'ROLE.WRITE', description: 'Role write permission' },
    { active: false, name: 'ORG.READ', description: 'Read from an org' },
    { active: true, name: 'MDM.ADMINISTRATOR', description: 'Admin role for MDM' }
  ];

  res.render('role-details.html', { role: req.body, permissions });
});

app.post('/permission-activate', (req, res) => {
  const roleName = req.body.role;
  res.send({success: true});
});

app.post('/permission-deactivate', (req, res) => {
  const roleName = req.body.role;
  res.send({success: true});
});

app.get('/group-list', (req, res) => {
  const groups = [
    { name: "Mark", description: "Otto", organization: "@mdo", roleCount: 12, userCount: 8},
    { name: "Jacob", description: "Thornton", organization: "@fat", roleCount: 2, userCount: 120},
    { name: "Larry", description: "the Bird", organization: "@twitter", roleCount: 188, userCount: 98}
  ];

  res.render('group-list.html', {groups});
});


app.get('/group-add', (req, res) => {
  res.render('group-add.html');
});

app.post('/group-details', (req, res) => {
  const group = {
    name: req.body.name,
    description: req.body.description,
    organization: req.body.organization,
    id: 'ID_UUID'
  };

  // Create group

  const roles = [
    { active: false, name: 'Sample Role', description: 'Sample role for sample' },
    { active: true, name: 'Sample Role 2', description: 'Some more' }
  ];

  const users = [
    { active: true, name: 'Sample User 1', description: 'Sample user for sample' },
    { active: false, name: 'Sample User 2', description: 'Some more' }
  ];

  res.render('group-details.html', { group, roles, users });
});

app.post('/user-activate', (req, res) => {
  const roleName = req.body.user;
  res.send({success: true});
});

app.post('/user-deactivate', (req, res) => {
  const roleName = req.body.user;
  res.send({success: true});
});

app.post('/role-activate', (req, res) => {
  const roleName = req.body.role;
  res.send({success: true});
});

app.post('/role-deactivate', (req, res) => {
  const roleName = req.body.role;
  res.send({success: true});
});

app.get('/organizations', (req, res) => {
  res.render('organizations.html');
});

app.get('/groups', (req, res) => {
  res.render('groups.html');
});

app.get('/device-group-add', (req, res) => {
  res.render('device-group-add.html');
});

app.post('/device-group-add', (req, res) => {
  // POST device group
  res.redirect('device-type-add');
});

app.get('/device-type-add', (req, res) => {
  res.render('device-type-add.html');
});

app.post('/device-type-add', (req, res) => {
  // POST device type
  res.redirect('oauth-client-add');
});

app.get('/oauth-client-add', (req, res) => {
  res.render('oauth-client-add.html');
});

app.post('/oauth-client-add', (req, res) => {
  // POST oauth client

  // Download SDK
  var file = '/home/aykut/Downloads/template.zip';
  res.download(file); // Set disposition and send it.
});

app.get('/newproposition', (req, res) => {
  res.render('create-proposition.html');
});

app.get('/newapplication', (req, res) => {
  res.render('create-application.html');
});
app.post('/create-application', (req, res) => {
  res.render('create-application.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))