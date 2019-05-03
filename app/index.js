const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path');
const request = require('request');
const rp = require('request-promise-native');
const port = 3000

const userList = [{
  email: "johndoe@xhealthcompany.com",
  firstname: "John",
  lastname: "Doe",
  organization: "XHealthCompany"
}, {
  email: "johannadoe@xhealthcompany.com",
  firstname: "Johanna",
  lastname: "Doe",
  organization: "XHealthCompany"
}, {
  email: "mikesmith@xhealthcompany.com",
  firstname: "Mike",
  lastname: "Smith",
  organization: "XHealthCompany"
}, {
  email: "michellemccarraon@xhealthcompany.com",
  firstname: "Michelle",
  lastname: "McCarron",
  organization: "XHealthCompany"
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

app.get('/test', (req, res) => {
  res.render('test-request.html', { response: null });
});

app.post('/test-request', (req, res) => {
  const sampleUrl = 'https://postb.in/CLsjdFZT';
  const options = {
    method: 'POST',
    uri: sampleUrl,
    resolveWithFullResponse: false,
    body: req.body,
    json: true,
    headers: {
      'User-Agent': 'curl/7.63.0',
      'accept': '*/*',
      'content-type': 'application/json'
    }
  };

  rp(options)
    .then(str => {
      res.render('test-request.html', { response: str });
    })
    .catch(err => console.error(err));
});

app.get('/user-list', (req, res) => {
  // res.render('role-list.html', {roles});
  res.render('users.html', { userList });
});

app.get('/user-add', (req, res) => {
  // res.render('role-list.html', {roles});
  res.render('user-add.html');
});

app.post('/user-add', (req, res) => {
  req.body.id = 'ID_UUID';
  // Create user
  userList.push({ firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, organization: req.body.organization });

  res.redirect('role-list');
});

app.get('/role-list', (req, res) => {
  const roles = [
    { name: "RootAdmin", description: "Root admin role", organization: "XHealthCompany", permissionCount: 12 }
  ];

  res.render('role-list.html', { roles });
});

app.get('/role-add', (req, res) => {
  res.render('role-add.html');
});

app.post('/role-details', (req, res) => {
  const role = {
    name: req.body.name,
    description: req.body.description,
    organization: 'XHealthCompany',
    id: 'ed907290-6579-4291-bd0b-90a6100c6840'
  };

  // Create role

  const permissions = [
    { active: false, name: 'MDM.ADMINISTRATOR', description: 'Admin role for MDM' }
  ];

  res.render('role-details.html', { role: req.body, permissions });
});

app.post('/permission-activate', (req, res) => {
  const roleName = req.body.role;
  res.send({ success: true });
});

app.post('/permission-deactivate', (req, res) => {
  const roleName = req.body.role;
  res.send({ success: true });
});

app.get('/group-list', (req, res) => {
  const groups = [
    { name: "XHealthCompanyRoot", description: "Root group for organization", organization: "XHealthCompany", roleCount: 12, userCount: 8 },
  ];

  res.render('group-list.html', { groups });
});


app.get('/group-add', (req, res) => {
  res.render('group-add.html');
});

app.post('/group-details', (req, res) => {
  const group = {
    name: req.body.name,
    description: req.body.description,
    organization: 'XHealthCompany',
    id: 'ed907290-6579-4291-bd0b-90a6100c6840'
  };

  // Create group

  const roles = [
    { active: false, name: 'PropositionAdmins', description: 'This role is for PropositionAdmins of XHealthCompany' },
  ];

  const users = [
    { active: false, name: 'Proposition Admin', description: 'proposition.admin@xhealthcompany.com' },
  ];

  res.render('group-details.html', { group, roles, users });
});

app.post('/user-activate', (req, res) => {
  const roleName = req.body.user;
  res.send({ success: true });
});

app.post('/user-deactivate', (req, res) => {
  const roleName = req.body.user;
  res.send({ success: true });
});

app.post('/role-activate', (req, res) => {
  const roleName = req.body.role;
  res.send({ success: true });
});

app.post('/role-deactivate', (req, res) => {
  const roleName = req.body.role;
  res.send({ success: true });
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
  var file = '../sample-msnet-device-application.zip';
  res.download(file);
});

app.get('/proposition-add', (req, res) => {
  res.render('create-proposition.html');
});

app.get('/application-add', (req, res) => {
  res.render('create-application.html');
});

app.post('/application-add', (req, res) => {
  res.render('create-application.html');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))