var loginbox = document.getElementById('loginform');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == loginbox) {
        loginbox.style.display = "none";
    }
}

//var usernameArray=new Array();

function submitRegistration(){
	var username=document.getElementById('username_register').value;
	var password=document.getElementById('password_register').value;
	var email=document.getElementById('email').value;
	if(username.length>6 && password.length>6 && email.length!=0){

	}
}

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
