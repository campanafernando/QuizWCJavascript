const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Qual destas seleções não vai participar da copa no Qatar? (2022)',
        choice1: 'Austrália',
        choice2: 'Senegal',
        choice3: 'Itália',
        choice4: 'Coreia do Sul',
        answer: 3,

    },
    {
        question: 'Quem é o maior artilheiro da história das copas? (16 gols)',
        choice1: 'Lionel Messi',
        choice2: 'Thierry Henry',
        choice3: 'Ronaldo Fenômeno',
        choice4: 'Miroslav Klose',
        answer: 4,

    },
    {
        question: 'Quem foi o único jogador a marcar gols em todos os jogos de uma edição de copa do mundo?',
        choice1: 'Jairzinho (1970)',
        choice2: 'Gerd Müller (1974)',
        choice3: 'Maradona (1986)',
        choice4: 'Del Piero (2006)',
        answer: 1,

    },
    {
        question: 'Em qual estádio a Alemanha venceu o Brasil pelo placar de 7x1?',
        choice1: 'Maracanã (RJ)',
        choice2: 'Serra Dourada (GO)',
        choice3: 'Mineirão (MG)',
        choice4: 'Beira-Rio (RS)',
        answer: 3,

    },
    {
        question: 'Qual jogador detem o recorde de mais gols marcados em uma única edição? (13 gols)',
        choice1: 'Cristiano Ronaldo (2018)',
        choice2: 'Johan Cruyff (1974)',
        choice3: 'Garrincha (1962)',
        choice4: 'Just Fontaine (1958)',
        answer: 4,

    },
    {
        question: 'Onde foi sediada a primeira copa do mundo?(1930)',
        choice1: 'Grécia',
        choice2: 'Uruguai',
        choice3: 'Itália',
        choice4: 'México',
        answer: 2,

    },
    {
        question: 'Qual jogador foi eleito o melhor da copa de 2010? (África do Sul)',
        choice1: 'Iniesta',
        choice2: 'Sneijder',
        choice3: 'Kaká',
        choice4: 'Diego Forlán',
        answer: 4,

    },
    {
        question: 'Dentre as finais citadas qual foi decidida na disputa de penâltis?',
        choice1: 'Brasil x Suécia (1958)',
        choice2: 'Itália x França (2006)',
        choice3: 'Argentina x Holanda (1978)',
        choice4: 'Inglaterra x Alemanha (1966)',
        answer: 2,

    },

]

const SCORE_POINTS = 1
const MAX_QUESTIONS = 8

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()