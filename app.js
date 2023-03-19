// Get references to the score elements and buttons
const score1 = document.getElementById('score-1');
const score2 = document.getElementById('score-2');
const team1Btn = document.getElementById('team-1-btn');
const team2Btn = document.getElementById('team-2-btn');

// Initialize the scores
let scoreTeam1 = 0;
let scoreTeam2 = 0;

// Add event listeners to the buttons
team1Btn.addEventListener('click', () => {
  scoreTeam1++;
  score1.innerText = scoreTeam1;
});

team1Btn.addEventListener('touchstart', () => { // Add touch event
  scoreTeam1++;
