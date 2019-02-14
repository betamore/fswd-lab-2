var express = require('express');
var router = express.Router();

const models = require('../../models');

router.get('/register', function(request, response) {
    response.render('users/register');
});

router.post('/register', async function(request, response) {
    const username = request.body.username;
    const user = await models.User.findOne({ where: { username }});
    if (user) {
        response.render('users/register', { error: 'User already exists' });
    } else {
        const password = request.body.password;
        const password_confirm = request.body.password_confirm;
        if (password !== password_confirm) {
            response.render('users/register', { error: 'Passwords do not match'});
        } else {
            const email = request.body.email;
            try {
                await models.User.create({ username, password, email });
                response.redirect('/users/welcome?username=' + username);
            } catch (error) {
                if (error.errors[0].path === 'email') {
                    response.render('users/register', { error: 'Not an email address' });
                }
            }
        }
    }
});

router.get('/welcome', function (request, response) {
    response.render('users/welcome', { username: request.query.username });
});

module.exports = router;