$(document).ready(function() {
    var loginbox = document.getElementById('loginform');
    var username = $('#username').val();
    console.log(username)
    console.log('hi')

    $('#loginbtn').click(function() {
        var username = $('#username').val();
        var password = $('#password').val();
        var lgnbtn = $('#loginbtn');
        lgnbtn.html('wait....')

        $.ajax({
            url: '/login',
            data: {
                'username': username,
                'password': password
            },
            type: 'POST',
            crossOrigin: true,

            success: function(event) {
                event = JSON.parse(event);
                $('#login-status').html(event['message'])
                console.log('inside')
                if (event['redirect'] != 'none') {
                    window.location = event['redirect']
                }
                lgnbtn.html('Sign In')
            }
        })
    });

    $("#s-password").change(function() {
        checkPassword();
    });
    $('#signupbtn').click(function() {
        var name = $('#s-name').val();
        var username = $('#s-username').val();
        var password = $('#s-password').val();
        var rpassword = $('#s-r-password').val();
        var signup_msg = $('#signup-msg');
        if (password != rpassword) {
            signup_msg.html("password doesn't match").style('font-color:red;')
            return;
        }
        var email = $('#email').val();
        if (checkEmail(email)) {
            signup_msg.html("email is incorrect").style('font-color:red;')
            return;
        }
        if (name == "" || username == "" || password == "" || rpassword == "") {
            signup_msg.html("you must enter all information before registration").style('font-color:red;');
            return;
        }
        var signupbtn = $('#signupbtn');
        signupbtn.html('wait....')

        $.ajax({
            url: '/signup',
            data: {
                'name': name,
                'username': username,
                'password': password,
                'email': email

            },
            type: 'POST',

            success: function(event) {
                event = JSON.parse(event);
                signup_msg.html(event['message'])
                console.log('s-inside')
                signupbtn.html('Sign In')
            }
        })

    });
});

//var usernameArray=new Array();
function checkPassword() {
    var pass = $("input#s-password").val();
    var password_strength = $('#signup-msg');
    var regex = new Array();
    regex.push("[a-z]");
    regex.push("[A-Z]");
    regex.push("[0-9]");
    regex.push("[~!@#$%^&*+]");
    var passed = 0;
    console.log(regex);
    for (var i = 0; i < regex.length; i++) {
        var tester = new RegExp(regex[i]);
        if (tester.test(pass)) {
            passed++;
        }
    }
    if (passed > 2 && pass.length < 10); {
        passed++;
    }
    var color = "";
    var strength = "";
    console.log(passed);
    switch (passed) {
        case 0:
        case 1:
        case 2:
            strength = "Weak password";
            color = "red";
            break;
        case 3:
            strength = "Good password";
            color = "blue";
            break;
        case 4:
        case 5:
            strength = "Very Good password";
            color = "green";
            break;
    }
    password_strength.text(strength);
    password_strength.css("color", color);
}

function checkEmail(email) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
        return true;
    } else {
        return false;
    }
}