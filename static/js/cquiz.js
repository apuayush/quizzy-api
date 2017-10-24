$(document).ready(function () {
        $('#generate').click(function(){
            var ques_set = $('#ques_module').html
            var ques_set1 = []
            for(var i=0;i<ques_set.length;i++){
                var question = ques_set[i].getElementById('question_added');
                console.log(question)
            }
        })
})