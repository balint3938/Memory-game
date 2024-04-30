const symbols=['🍎', '🍊', '🍇', '🍉', '🍌', '🍓', '🍍', '🥭'];
let cards=[];
let flippedCards=[];
let matchedCards=[];
let resetButton=document.createElement("button");
let congrBox=document.createElement("div");
const gameBoard=document.getElementById('game-board');

function initializeGame(){
  cards=[...symbols, ...symbols];
  cards.sort(()=>Math.random()-0.5);

  cards.forEach((symbol, index) => {
    const card=document.createElement('div');
    card.classList.add('card');
    card.dataset.index=index;
    card.textContent='?'; 
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard(){
  const cardIndex=parseInt(this.dataset.index);

  if (flippedCards.length<2&&!flippedCards.includes(cardIndex)&&!matchedCards.includes(cardIndex)) {
    this.textContent=cards[cardIndex]; 
    this.classList.add('flipped');
    flippedCards.push(cardIndex);

    if (flippedCards.length===2) {
      setTimeout(checkMatch, 700);
    }
  }
}

function checkMatch(){
  const [cardIndex1, cardIndex2]=flippedCards;
  const card1=document.querySelector(`.card[data-index="${cardIndex1}"]`);
  const card2=document.querySelector(`.card[data-index="${cardIndex2}"]`);

  if (cards[cardIndex1]===cards[cardIndex2]) {
    matchedCards.push(cardIndex1, cardIndex2);
    if (matchedCards.length===cards.length) {
      congrBox.textContent="Congratulations, you win!\nReset game?";
      congrBox.style.backgroundColor="Green";
      congrBox.style.marginBottom='1rem';
      congrBox.style.marginTop='1rem';
      document.body.appendChild(congrBox);
      resetButton.style.borderRadius='20px';
      resetButton.textContent="Reset";
      resetButton.addEventListener('click', restartGame);
      document.body.appendChild(resetButton);
      
    }
  } else {
    card1.textContent='?';
    card2.textContent='?'; 
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  flippedCards=[];
}

function restartGame() {
  resetButton.remove();
  congrBox.remove();
  gameBoard.innerHTML='';
  flippedCards=[];
  matchedCards=[];
  initializeGame();
}

initializeGame();
