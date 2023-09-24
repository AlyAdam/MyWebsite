const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'what is the correct css syntax?',
    answers: [
      { text: 'body {color: black;}', correct: true },
      { text: '{body;color: black;}', correct: false },
      { text: 'body color = black;', correct: false },
      { text: '{body color = black;}', correct: false }
    ]
  },
  {
    question: 'how do you make a list that displays its elements with squares?',
    answers: [
      { text: 'list\= square;', correct: false },
      { text: 'list\: square;', correct: false  },
      { text: 'list-style-type\\: square;', correct: true },
      { text: 'list-type\: square;', correct: false }
    ]
  },
  {
    question: 'How do you select a class name "test" ?',
    answers: [
      { text: '#test', correct: false },
      { text: '.test', correct: true },
      { text: 'test', correct: false },
      { text: '$test', correct: false }
      
    ]
  },
  {
    question: 'look at the following selector: $("div").what is selected?',
    answers: [
      { text: 'The first div element', correct: false },
      { text: 'All div elements', correct: true }
    ]
  }
]