document.addEventListener("DOMContentLoaded", function() {

  // Imagination!
  var callPoll = document.querySelector('#call-poll');


  callPoll.addEventListener('click', function(){
    $.ajax({
      url: 'https://bb-election-api.herokuapp.com/',
      method: 'GET',
      dataType: 'json',

    }).done(function(responseData) {
      console.log(responseData);
      var electionPolls = document.querySelector('#election-polls');
      for (var i = 0; i < responseData.candidates.length; i++) {
        var pollName = responseData.candidates[i].name;
        var numVotes =  responseData.candidates[i].votes;
        var electionString = pollName + ': ' + numVotes;
        var listTag = document.createElement('li');
        var formTag = document.createElement('form');
        listTag.append(electionString);
        listTag.append(formTag);
        electionPolls.append(listTag);

        formTag.setAttribute('method', 'POST');
        formTag.setAttribute('action', 'https://bb-election-api.herokuapp.com/vote');

        var voteButton = document.createElement('button');
        voteButton.innerHTML = 'Submit Vote!';
        voteButton.class = 'vote-button';
        formTag.append(voteButton);

        var voteCast = document.createElement('input');
        voteCast.setAttribute('type', 'hidden');
        voteCast.setAttribute('name', 'name');
        voteCast.setAttribute('value', responseData.candidates[i].name);
        formTag.append(voteCast);

          voteButton.addEventListener('submit', function(e) {
            e.preventDefault();
            var votedCandidate = $(this).children('input[type=hidden]').val();
            console.log(votedCandidate);

            $.ajax({
              url: 'https://bb-election-api.herokuapp.com/vote?name=' + votedCandidate,
              method: "POST",
              dataType: "json",
            }).done(function(responseData){
              console.log('you voted!')
              // voteButton.setAttribute('type', 'submit')
            }).fail(function(){
              console.log('Vote did not go through.');
            });
          });

          voteButton.setAttribute('type', 'submit')

      };
      });


  });
});





// In the .done(function(responseData){}) callback function for the AJAX request loop over the candidates in responseData, and append a <li> element for each candidate into the DOM at our <ul> from the last step. You'll want to show the name and votes count of each candidate.
