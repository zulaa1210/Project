var fs = require('fs');
var path = require('path');
var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'web2020',
	password : 'web2020',
	database : 'web'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

function restrict(req, res, next) {
  if (req.session.loggedin) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.sendFile(path.join(__dirname + '/web/Login.html'));
  }
}

app.use('/', function(request, response, next) {
	if ( request.session.loggedin == true || request.url == "/login" || request.url == "/register" ) {
    next();
	}
	else {
    response.sendFile(path.join(__dirname + '/web/Login.html'));
	}
});

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/web/Login.html'));
});

app.get('/login', function(request, response) {
	response.sendFile(path.join(__dirname + '/web/Login.html'));
});

app.post('/login', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (error) throw error;
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
				response.end();
			} else {
				//response.send('Incorrect Username and/or Password!');
				response.sendFile(path.join(__dirname + '/web/LoginError.html'));
			}			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/web/Register.html'));
});

app.post('/register', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	var password2 = request.body.password2;
	var email = request.body.email;
	console.log(username, password, email);
	if (username && password && email) {
		connection.query('SELECT * FROM user WHERE username = ? AND password = ? AND email = ?', [username, password, email], function(error, results, fields) {
			if (error) throw error;
			if (results.length <= 0) {
        connection.query('INSERT INTO user (username, password, email) VALUES(?,?,?)', [username, password, email],
            function (error, data) {
                if (error)
                  console.log(error);
                else
                  console.log(data);
        });
			  response.send(username + ' Registered Successfully!<br><a href="/home">Home</a>');
			} else {
				response.send(username + ' Already exists!<br><a href="/home">Home</a>');
			}			
			response.end();
		});
	} else {
		response.send('Please enter User Information!');
		response.end();
	}
});

app.get('/logout', function(request, response) {
  request.session.loggedin = false;
	response.send('<center><H1>Logged Out.</H1><H1><a href="/">Goto Home</a></H1></center>');
	response.end();
});

app.get('/home', restrict, function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Home.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kdramaselectyear', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/KdramaSelectYear.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kpopselect', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/KpopSelect.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/topikselect', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/TopikSelect.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/about', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/About.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/contact', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Contact.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kdrama2018', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Kdrama2018.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kdrama2019', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Kdrama2019.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kdrama2020', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Kdrama2020.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kpopgroups', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/KpopGroups.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/kpopsingers', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/KpopSingers.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/topik2017', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Topik2017.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/koreanproverb', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/KoreanProverb.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/topik2017', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Topik2017.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/topik2018', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Topik2018.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/topik2019', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/web/Topik2019.html'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});

app.get('/style', function(request, response) {
	if (request.session.loggedin) {
		response.sendFile(path.join(__dirname + '/Style.css'));
	} else {
		response.send('Please login to view this page!');
		response.end();
	}
});
app.listen(3000, function () {
    console.log('Server Running at http://127.0.0.1:3000');
});