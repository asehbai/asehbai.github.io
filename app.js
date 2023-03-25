// Get references to the score elements and buttons
const score1 = document.getElementById('score-1');
const score2 = document.getElementById('score-2');

// Initialize the scores
let scoreTeam1 = 0;
let scoreTeam2 = 0;

// Add event listeners to the buttons
score1.addEventListener('click', () => {
  scoreTeam1++;
  score1.innerText = scoreTeam1;
});

score1.addEventListener('touchstart', () => { // Add touch event
  scoreTeam1++;
  score1.innerText = scoreTeam1;
});
