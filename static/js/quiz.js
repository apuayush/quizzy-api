

var timeoutHandle;
	function countdown(minutes) {
    	var seconds = 60;
    	var mins = minutes;
    	function tick() {
        	var counter = document.getElementById("timer");
        	var current_minutes = mins-1
        	seconds--;
        	counter.innerHTML =
        	current_minutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds);
        	if( seconds > 0 ) {
            	timeoutHandle=setTimeout(tick, 1000);
        	} else {

            	if(mins > 1){

               	// countdown(mins-1);   never reach “00″ issue solved:Contributed by Victor Streithorst
               	setTimeout(function () { countdown(mins - 1); }, 1000);

            	}
        	}
    	}
    	tick();
	}
/*function btn1(){
	document.getElementById("q1").style.display="block";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="none";
}

function btn2(){
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="block";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="none";
}

function btn3(){
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="block";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="none";
}

function btn4(){
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="block";
	document.getElementById("q5").style.display="none";
}

function btn5(){
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="block";
	document.getElementById("q5").style.display="none";
}*/

/*var sample=[];
function insertQuestion(){
	var question=document.getElementById('question_added').value;
	var opt1=document.getElementById('opt1').value;
	var opt2=document.getElementById('opt2').value;
	var opt3=document.getElementById('opt3').value;
	var opt4=document.getElementById('opt4').value;
	var correct=document.getElementById('correct').value;
	sample.push([correct,question,opt1,opt2,opt3,opt4]);
}*/
var sample=[["A","CSS stands for ","Cascading Style Sheet","Color Styling Sheet","Cascadeless Scaling Style","None of the above"],["A","SEO stands for ","Search Engine Optimisation","Search Explorer Optimisation","Search Explorer Options","None of the Above"],["B","What does HTML stand for?","Home Tool Markup Language","Hyper Text Markup Language","Hyperlinks and Text Markup Language","None of the Above"]];

/*function generateQuestions(){
	var html='';
	html+="<label>"+"3. "+sample1[1]+"</label><br><br>";
	html+="<input type='radio' name='q3' value='q3-A'>"+sample1[2]+"<br>";
	html+="<input type='radio' name='q3' value='q3-B'>"+sample1[3]+"<br>";
	html+="<input type='radio' name='q3' value='q3-C'>"+sample1[4]+"<br>";
	html+="<input type='radio' name='q3' value='q3-D'>"+sample1[5]+"<br>";
	document.getElementById("q3").innerHTML=html;
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="block";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="none";
}*/

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


//document.getElementById('input1').name=name_of_input;
//document.getElementById('input1').value=value_of_input[0];

var arr=[];            //Store array with numbers 1 to total number of questions inserted.
for(i=0;i<sample.length;i++){
	arr.push(i+1);
}

var random=[];
var max_questions=3;      // Change to 10 afterwards
arr=shuffle(arr);       // Shuffle arr array
for(i=0;i<max_questions;i++){
	random.push(arr[i]);
}
console.log(random);

function arr_diff (a1, a2) {

    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
            delete a[a2[i]];
        } else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
};

var arr_id=[];
var arr_btn_id=[];

for(i=0;i<3;i++){
	arr_id.push("q"+(i+1));
}

for(i=0;i<3;i++){
	arr_btn_id.push("btn"+(i+1));
}

function changeBtn(){
	document.getElementById('start_page').style.display='none';
	document.getElementById('start_quiz').style.display='none';
	document.getElementById('buttons_sub').style.display='block';
}

var jk=0;
function generateFirstQuestion(){
	document.getElementById('timerbox').style.display='block';
	countdown(10);
	var html1='';
	var random_digit=random[jk]-1;
	html1+="<label style='font-family:Trebuchet MS;'>"+"1" +". "+sample[random_digit][1]+"</label><br><br>";
	html1+="<input type='radio' name='q1' value='q1-A'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][2]+"</span>"+"<br>";
	html1+="<input type='radio' name='q1' value='q1-B'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][3]+"</span>"+"<br>";
	html1+="<input type='radio' name='q1' value='q1-C'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][4]+"</span>"+"<br>";
	html1+="<input type='radio' name='q1' value='q1-D'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][5]+"</span>"+"<br>";
	document.getElementById("q1").innerHTML=html1;
	document.getElementById("q1").style.display='block';
	document.getElementById("btn1").style.backgroundColor='#27AE60';
}

var i=1;
function generateQuestions(){
	document.getElementById("q1").style.display='none';
	document.getElementById("btn1").style.backgroundColor='white';
	var question_id=["q"+(i+1)];
	var button_id=["btn"+(i+1)];
	var html1='';
	var random_digit=random[i]-1;
	var new_arr=arr_diff(arr_id,question_id);
	var new_arr_btn=arr_diff(arr_btn_id,button_id);
	console.log(new_arr);
	if(i<3){
		html1+="<label style='font-family:Trebuchet MS;'>"+(i+1)+". "+sample[random_digit][1]+"</label><br><br>";
		html1+="<input type='radio' name=question_id[0] value='q1-A'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][2]+"</span>"+"<br>";
		html1+="<input type='radio' name=question_id[0] value='q1-B'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][3]+"</span>"+"<br>";
		html1+="<input type='radio' name=question_id[0] value='q1-C'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][4]+"</span>"+"<br>";
		html1+="<input type='radio' name=question_id[0] value='q1-D'>"+" "+"<span style='font-family:Trebuchet MS;color:#566573;'>"+sample[random_digit][5]+"</span>"+"<br>";
		document.getElementById(question_id[0]).innerHTML=html1;
		document.getElementById(question_id[0]).style.display='block';
		document.getElementById(button_id[0]).style.backgroundColor='#27AE60';


		for(j=1;j<new_arr.length;j++){
			document.getElementById(new_arr[j]).style.display='none';
		}
		for(j=1;j<new_arr_btn.length;j++){
			document.getElementById(new_arr_btn[j]).style.backgroundColor='white';
		}
	}
	if(i==3){
		document.getElementById(new_arr[i-1]).style.display='none';
		//document.getElementById('q4').innerHTML='Test Ended';
		document.getElementById('q4').style.display='block';
		document.getElementById('submit_answer').style.display='none';
		document.getElementById('skip_answer').style.display='none';
		document.getElementById('get_grade').style.display='block';
		}
	}
	i++;
	//document.getElementById("q1").style.display="block";
	//document.getElementById("q2").style.display="none";
	//document.getElementById("q3").style.display="none";
}

/*function generateQuestions2(){
	var html2='';
	var random_digit=random[1]-1;
	html2+="<label style='font-family:Trebuchet MS;'>"+"2. "+sample[random_digit][1]+"</label><br><br>";
	html2+="<input type='radio' name='q2' value='q2-A'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][2]+"</span>"+"<br>";
	html2+="<input type='radio' name='q2' value='q2-B'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][3]+"</span>"+"<br>";
	html2+="<input type='radio' name='q2' value='q2-C'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][4]+"</span>"+"<br>";
	html2+="<input type='radio' name='q2' value='q2-D'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][5]+"</span>"+"<br>";
	document.getElementById("q2").innerHTML=html2;
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="block";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="none";
}
function generateQuestions3(){
	var html3='';
	var random_digit=random[2]-1;
	html3+="<label style='font-family:Trebuchet MS;'>"+"3. "+sample[random_digit][1]+"</label><br><br>";
	html3+="<input type='radio' name='q3' value='q3-A'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][2]+"</span>"+"<br>";
	html3+="<input type='radio' name='q3' value='q3-B'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][3]+"</span>"+"<br>";
	html3+="<input type='radio' name='q3' value='q3-C'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][4]+"</span>"+"<br>";
	html3+="<input type='radio' name='q3' value='q3-D'>"+" "+"<span style='font-family:Trebuchet MS;color:grey;'>"+sample[random_digit][5]+"</span>"+"<br>";
	document.getElementById("q3").innerHTML=html3;
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="block";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="none";
}
function generateQuestions4(){
	var html4='';
	var random_digit=random[3]-1;
	html4+="<label>"+"3. "+sample[random_digit][1]+"</label><br><br>";
	html4+="<input type='radio' name='q4' value='q4-A'>"+sample[random_digit][2]+"<br>";
	html4+="<input type='radio' name='q4' value='q4-B'>"+sample[random_digit][3]+"<br>";
	html4+="<input type='radio' name='q4' value='q4-C'>"+sample[random_digit][4]+"<br>";
	html4+="<input type='radio' name='q4' value='q4-D'>"+sample[random_digit][5]+"<br>";
	document.getElementById("q4").innerHTML=html4;
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="block";
	document.getElementById("q5").style.display="none";
}
function generateQuestions5(){
	var html5='';
	var random_digit=random[4]-1;
	html5+="<label>"+"3. "+sample[random_digit][1]+"</label><br><br>";
	html5+="<input type='radio' name='q4' value='q4-A'>"+sample[random_digit][2]+"<br>";
	html5+="<input type='radio' name='q4' value='q4-B'>"+sample[random_digit][3]+"<br>";
	html5+="<input type='radio' name='q4' value='q4-C'>"+sample[random_digit][4]+"<br>";
	html5+="<input type='radio' name='q4' value='q4-D'>"+sample[random_digit][5]+"<br>";
	document.getElementById("q5").innerHTML=html5;
	document.getElementById("q1").style.display="none";
	document.getElementById("q2").style.display="none";
	document.getElementById("q3").style.display="none";
	document.getElementById("q4").style.display="none";
	document.getElementById("q5").style.display="block";
}

function openSideMenu(){
	document.getElementById('sidemenu').style.width="200px";
	document.getElementById('sidemenu').style.height="700px";
	document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
}

function closeSideMenu(){
	document.getElementById('sidemenu').style.width="0";
	document.getElementById('sidemenu').style.height="0";
}*/
