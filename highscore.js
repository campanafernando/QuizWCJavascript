const highScoresList = document.querySelector('#highScoresList')
const highScores = JSON.parse(localStorage.getItem("highScores")) || []

function CleanList() {

    const highScoresList = document.querySelector("#highScoresList");
        
    for (child of highScoresList.children){
        child.remove();
    }
        
  }

highScoresList.innerHTML =
highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`
}).join("")
