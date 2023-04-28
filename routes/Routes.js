const express = require('express');
const router = express.Router();
const { v4 } = require('uuid');

let users = [
    {
	"email" :    "user email",
	"username" : "Username",
	"password" : "user password"
    }
]
let posts = [
    {
	"content" : "Post Content",
    "timeCreated" : "Time created in Date format",
	"timeUpdated" : "Time updated in Date format",
	"status" : "Responsible for soft deletion",
	"author" : "user id of author"
}
]

// GET endpoint
router.get( '/', (request, response) => {
    response.status( 200 ).send({ users: users })
});

// Users POST endpoint
router.post( '/register', (request, response) => {
    const { email, username, password } = request.body;

  // check if user with the given email already exists
    const userExists = users.find(user => user.email === email);

    if (userExists) {
        return response.status( 400 ).send({ error: 'Email already exists in the database' });
    }

  // create new user object and add to users array
    const newUser = {
        userid: v4(),
        email,
        username,
        password
    };
    users.push(newUser);

    return response.status( 201 ).send({ message: 'User has been successfully registered!' });
});

router.post( '/login', (request, response) => {
    const { username, password } = request.body;

  // Find user with the given email and password
    const user = users.find(user => user.username === username && user.password === password);

    if (!user) {
        return response.status( 401 ).send({ error: 'Invalid credentials' });
    }else{
        return response.status( 200 ).send({ message: 'Successful login'})
    }
});

// Posts GET endpoint

router.get( '/:userid/posts', (request, response) => {
    const userid = request.params.userid
    
    response.status( 200 ).send({ users: userid })
});

module.exports = router;