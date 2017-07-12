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
        listTag.append(electionString);
        electionPolls.append(listTag);
      }
    });
  });
});


// In the .done(function(responseData){}) callback function for the AJAX request loop over the candidates in responseData, and append a <li> element for each candidate into the DOM at our <ul> from the last step. You'll want to show the name and votes count of each candidate.
