$( document ).ready(function() {

  var modalTitles = {
    lose : 'YOU LOSE!',
    win : 'YOU WIN!',
    tie : 'TIE!'
  }

  var winCounter = 0
  var loseCounter = 0

  //when the user select paper, rock or scissor
  $(document).on('click', '.game-option', function() {

    let userOption = $(this).data('option')

    let opponentOption = getOpponentOption()

    result = userHasWon(userOption,opponentOption)

    loadModalData(userOption, opponentOption, result)
    
    setTimeout(function() {
      updateResultCounters(result)
    }, 2000);

  })

  //update result counter labels in the html 
  function updateResultCounters(result)
  {
    if(result == 'win')
      winCounter++
    else if(result == 'lose') 
      loseCounter++

    $('#match-resume .win-counter').text(winCounter)
    $('#match-resume .lose-counter').text(loseCounter)
  }

  //insert the html in the modal by the result of the game
  function loadModalData(userOption, opponentOption, result)
  {
    title = modalTitles[result]

    let html = `<div class="result">
        <div class="row">
          <div class="col-sm">
            <h3>You</h3>
          </div>
          <div class="col-sm">
            <img id="user-option" src="images/${userOption}.svg">
          </div>
          <div class="col-sm">
            <img id="minions-option" src="images/${opponentOption}.svg">
          </div>
          <div class="col-sm">
            <h3>PC</h3>
          </div>
        </div>
      </div><!-- end result -->

      <div class="message">
        <h1>${title}</h1>
        <img class="minion" src="images/minions/${result}.png">
      </div>`

    $.sweetModal({
      content: html
    });

    $(getWinner(result)).addClass('winner')
  }

  //return the selector of the winner in the modal
  function getWinner(result) 
  {
    switch (result) 
    {
      case 'win': return '#user-option'
      case 'lose': return '#minions-option'
      default: return ''
    }
  }

  function getOpponentOption()
  {
    let options = ['rock', 'paper', 'scissor']
    return options[Math.floor(Math.random()*options.length)]
  }

  function userHasWon(userOption, opponentOption)
  {
    if(userOption == opponentOption)
    {
      return 'tie'
    }
    else if(userOption == 'rock' && opponentOption == 'scissor')
    {
      return 'win'
    }
    else if(userOption == 'rock' && opponentOption == 'paper')
    {
      return 'lose'
    }
    else if(userOption == 'paper' && opponentOption == 'rock')
    {
      return 'win'
    }
    else if(userOption == 'paper' && opponentOption == 'scissor')
    {
      return 'lose'
    }
    else if(userOption == 'scissor' && opponentOption == 'paper')
    {
      return 'win'
    }
    else if(userOption == 'scissor' && opponentOption == 'rock')
    {
      return 'lose'
    }
  }

  $.sweetModal({
      content: `
        <div id="welcome-modal">
          <h1>Hi, do you want to play with the minions?</h1>
          <p>To play rock, paper and scissor you just have to <i><b>click an icon</b></i> and enjoy the game.</p>
          <img class="minion" src="images/minions/hi.png">
        </div>`
    });
});
