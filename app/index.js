const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
const port = 3000

// For CDN of css and so
app.use(express.static('ui'));

// For POST body
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// For HTML as template engine
app.set('views', path.join(process.cwd() + '/ui/'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/role-list', (req, res) => {
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
  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.organization);
  req.body.id = 'ID_UUID';

  // Create role

  const permissions = [
    { active: false, name: 'ROLE.WRITE', description: 'Role write permission' },
    { active: false, name: 'ORG.READ', description: 'Read from an org' },
    { active: true, name: 'MDM.ADMINISTRATOR', description: 'Admin role for MDM' }
  ];

  res.render('role-details.html', { role: req.body, permissions });
});

app.post('/permission-activate', (req, res) => {
  console.log(req.body.role);
  res.send({success: true});
});

app.post('/permission-deactivate', (req, res) => {
  console.log(req.body.role);
  res.send({success: true});
});

app.post('/user-details', (req, res) => {
  console.log(req.body.name);
  console.log(req.body.description);
  console.log(req.body.organization);
  req.body.id = 'ID_UUID';

  // Create user

  res.render('user-details.html', req.body);
});

app.get('/users', (req, res) => {
  res.render('users.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))