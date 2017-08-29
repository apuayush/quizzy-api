$(document).ready(function(){
		var loginbox = document.getElementById('loginform');
		var username = $('#username').val();
		console.log(username)
		console.log('hi')

		$('#loginbtn').click(function(){
			var username = $('#username').val();
			var password = $('#password').val();
			var lgnbtn = $('#loginbtn');
			lgnbtn.html('wait....')

			$.ajax({
				url : '/login',
				data : {
					'username':username,
					'password':password
				},
				type : 'POST',

				success : function(event){
					$('#login-status').html(event)
					lgnbtn.html('Sign In')
				}
			})

		});

		//var usernameArray=new Array();
		function checkPassword(){
			var pass=document.getElementById("password_register").value;
			var password_strength=document.getElementById("password_strength");
			var regex=new Array();
			regex.push("[a-z]");
			regex.push("[A-Z]");
			regex.push("[0-9]");
			regex.push("[~!@#$%^&*+]");
			var passed=0;
			for(var i=0;i<regex.length;i++)
			{
				if(new RegExp(regex[i]).test(pass))
				{	
					passed++;
				}
			}
			if(passed>2 && pass.length<10);
			{
				passed++;	
			}
			var color="";
			var strength="";
			switch(passed){
				case 0:
				case 1:
				case 2: 
					strength="Weak";
					color="red";
					break;
				case 3: 
					strength="Good";
					color="blue";
					break;
				case 4:
				case 5: 
					strength="Very Good";
					color="green";
					break;
			}
			password_strength.innerHTML=strength;
			password_strength.style.color=color;

			if(pass.length==0){
				password_strength.innerHTML="";
			}
		}
})

