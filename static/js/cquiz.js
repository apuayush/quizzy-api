$(document).ready(function () {
    console.log($('#message').text())
        $('#generate').click(function(){
            var ques_set = $('#quesSet').children();
            var ques_set1 = [];
            var node = $(ques_set[0]);
         var values = [];
    node.find("input[id='opt']").each(function() {
        values.push($(this).val());
        });
          console.log(values)
            for(var i=0;i<ques_set.length;i++){
                var $node = $(ques_set[i]);
                var question = $node.find('#question_added').val();
                var values = [];
                 node.find("input[id='opt']").each(function() {
                     values.push($(this).val());
                 });

                var correct = $node.find('#correct').val();
                ques_set1.push({"question": question, "options": values, "correct": correct})
            }
            console.log(ques_set1);
            console.log(Date.parse($('#start-time').val())/1000);

            $.ajax({
            url: '/cquiz',
            data: {
                'quiz_title': $('#quiz-title').val(),
                'question': JSON.stringify(ques_set1),
                'time-limit': $('#time-limit').val(),
                'start-time': Date.parse($('#start-time').val())/1000
            },
            type: 'POST',

            success: function(event) {
                event = JSON.parse(event);
                $('#message').html(event['message'])
                console.log(event['message'])
            }
        })

        })

})