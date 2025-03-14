
 /* Key features:
 - Multiple-choice questions with joke explanations
 - Score tracking and progress visualization
 - Special celebration animation for high scores (8+)
 - Responsive design with smooth transitions
 */
 document.addEventListener("DOMContentLoaded", () => {
    // Quiz questions
    const questions = [
      {
        question: "Why don't scientists trust atoms?",
        options: [
          "Because they're too small to see",
          "Because they make up everything",
          "Because they're always changing",
          "Because they're unstable",
        ],
        correctIndex: 1,
        explanation: "Atoms make up everything, so they can't be trusted!",
      },
      {
        question: "What did the mathematician say when his friend asked if he'd been to the dentist recently?",
        options: [
          "Square root of negative one, it's imaginary",
          "I have a cavity in my tooth-dimensional space",
          "Yes, I went to the 2π-dentist",
          "No, I'm trying to avoid the square root canal",
        ],
        correctIndex: 3,
        explanation: "Mathematicians try to avoid the square root canal!",
      },
      {
        question: "What did one ocean say to the other ocean?",
        options: ["Nothing, they just waved", "Sea you later", "Water you doing?", "You're salty today"],
        correctIndex: 0,
        explanation: "They didn't talk, they just waved!",
      },
      {
        question: "Why did the physicist break up with the biologist?",
        options: [
          "There was no chemistry",
          "They had no potential energy",
          "Their relationship had too much friction",
          "Their bond was too weak",
        ],
        correctIndex: 0,
        explanation: "Without chemistry, relationships just don't work!",
      },
      {
        question: "What's a mathematician's favorite pick-up line?",
        options: [
          "Are you the square root of -1? Because you can't be real",
          "I wish I was your derivative so I could lie tangent to your curves",
          "Are you a 90-degree angle? Because you're looking right",
          "Can I have your number? I promise I won't divide by zero",
        ],
        correctIndex: 1,
        explanation: "Mathematicians love their curves and tangent lines!",
      },
      {
        question: "Why don't programmers like nature?",
        options: [
          "It has too many bugs",
          "The Wi-Fi signal is terrible",
          "They prefer artificial intelligence",
          "They can't control it",
        ],
        correctIndex: 0,
        explanation: "Programmers already deal with enough bugs in their code!",
      },
      {
        question: "What did the proton say to the electron on their first date?",
        options: ["You're so negative", "I'm positively attracted to you", "Let's bond", "We have great chemistry"],
        correctIndex: 1,
        explanation: "Opposites attract - protons are positive and electrons are negative!",
      },
      {
        question: "Why did the math book look sad?",
        options: [
          "It had too many problems",
          "Nobody would solve its equations",
          "It was divided by zero",
          "It failed the test",
        ],
        correctIndex: 0,
        explanation: "Math books are full of problems!",
      },
      {
        question: "What's a physicist's favorite dating app?",
        options: ["Radiometric", "Carbon Date", "Quantum Entanglement", "Atomic Attraction"],
        correctIndex: 2,
        explanation: "Once quantum entangled, particles remain connected no matter the distance!",
      },
      {
        question: "What did one DNA strand say to the other?",
        options: [
          "Do these genes make me look fat?",
          "I think we make a great pair",
          "You're the only one for me",
          "Let's unzip",
        ],
        correctIndex: 1,
        explanation: "DNA strands are made of complementary base pairs!",
      },
    ]
  
    // DOM elements
    const welcomeScreen = document.getElementById("welcome-screen")
    const questionScreen = document.getElementById("question-screen")
    const resultsScreen = document.getElementById("results-screen")
    const startBtn = document.getElementById("start-btn")
    const restartBtn = document.getElementById("restart-btn")
    const questionText = document.getElementById("question-text")
    const optionsContainer = document.getElementById("options-container")
    const currentQuestionEl = document.getElementById("current-question")
    const totalQuestionsEl = document.getElementById("total-questions")
    const progressBar = document.getElementById("progress")
    const scoreEl = document.getElementById("score")
    const maxScoreEl = document.getElementById("max-score")
    const resultMessage = document.getElementById("result-message")
    const confettiContainer = document.getElementById("confetti-container")
    const celebrationSplash = document.getElementById("celebration-splash")
    const celebrationScore = document.getElementById("celebration-score")
    const continueBtn = document.getElementById("continue-btn")
  
    // Quiz state
    let currentQuestionIndex = 0
    let score = 0
    let answeredQuestions = 0
  
    // Initialize quiz
    /**
     Initializes the quiz by resetting all state variables and showing the welcome screen.
     This function is called when the quiz first loads and when the user restarts.
     */
    function initQuiz() {
      currentQuestionIndex = 0
      score = 0
      answeredQuestions = 0
      totalQuestionsEl.textContent = questions.length
      maxScoreEl.textContent = questions.length
      showScreen(welcomeScreen)
    }
  
    // Create confetti effect for celebration
    /**
     Creates a confetti animation effect to celebrate high scores.
     Generates 100 random confetti pieces with varied colors, shapes, and animation timing.
     */
    function createConfetti() {
      // Clear any existing confetti
      confettiContainer.innerHTML = ""
  
      // Create 100 confetti pieces
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div")
        confetti.classList.add("confetti")
  
        // Randomize confetti properties
        confetti.style.left = `${Math.random() * 100}%`
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`
        confetti.style.animationDelay = `${Math.random() * 2}s`
  
        // Randomize confetti colors
        const colors = ["#fbbf24", "#ec4899", "#8b5cf6", "#10b981", "#3b82f6"]
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
  
        // Randomize confetti shapes
        const shapes = ["circle", "square", "triangle"]
        const shape = shapes[Math.floor(Math.random() * shapes.length)]
  
        if (shape === "circle") {
          confetti.style.borderRadius = "50%"
        } else if (shape === "triangle") {
          confetti.style.width = "0"
          confetti.style.height = "0"
          confetti.style.backgroundColor = "transparent"
          confetti.style.borderLeft = "10px solid transparent"
          confetti.style.borderRight = "10px solid transparent"
          confetti.style.borderBottom = `20px solid ${confetti.style.backgroundColor}`
        }
  
        confettiContainer.appendChild(confetti)
      }
    }
  
    // Show a specific screen
    /**
     * Shows a specific screen by adding the 'active' class and removing it from all other screens.
     * This handles the navigation between welcome, question, and results screens.
     * @param {HTMLElement} screen - The screen element to display
     */
    function showScreen(screen) {
      document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"))
      screen.classList.add("active")
    }
  
    // Load question
    /**
     * Loads the current question and its options into the UI.
     * Updates the progress bar and question counter.
     */
    function loadQuestion() {
      const question = questions[currentQuestionIndex]
      questionText.textContent = question.question
      currentQuestionEl.textContent = currentQuestionIndex + 1
  
      // Update progress bar
      const progressPercentage = (currentQuestionIndex / questions.length) * 100
      progressBar.style.width = `${progressPercentage}%`
  
      // Clear previous options
      optionsContainer.innerHTML = ""
  
      // Add options
      question.options.forEach((option, index) => {
        const optionElement = document.createElement("div")
        optionElement.classList.add("option")
        optionElement.textContent = option
        optionElement.dataset.index = index
        optionElement.addEventListener("click", handleOptionClick)
        optionsContainer.appendChild(optionElement)
      })
    }
  
    // Handle option click
    /**
     * Handles user clicks on answer options.
     * Marks correct and incorrect answers, updates the score, and moves to the next question.
     * @param {Event} e - The click event object
     */
    function handleOptionClick(e) {
      const selectedIndex = Number.parseInt(e.target.dataset.index)
      const question = questions[currentQuestionIndex]
  
      // Disable all options
      document.querySelectorAll(".option").forEach((option) => {
        option.removeEventListener("click", handleOptionClick)
        option.style.cursor = "default"
      })
  
      // Mark correct and incorrect options
      document.querySelectorAll(".option").forEach((option, index) => {
        if (index === question.correctIndex) {
          option.classList.add("correct")
        } else if (index === selectedIndex) {
          option.classList.add("incorrect")
        }
      })
  
      // Update score
      if (selectedIndex === question.correctIndex) {
        score++
      }
  
      answeredQuestions++
  
      // Move to next question after delay
      setTimeout(() => {
        currentQuestionIndex++
        if (currentQuestionIndex < questions.length) {
          loadQuestion()
        } else {
          showResults()
        }
      }, 1500)
    }
  
    // Show celebration splash for high scores
    /*
     Displays a special celebration splash screen for high-scoring users.
     Shows confetti animation and a congratulatory message.
     */
    function showCelebration() {
      createConfetti()
      celebrationScore.textContent = score
      celebrationSplash.style.display = "block"
  
      // Add event listener to continue button
      continueBtn.addEventListener(
        "click",
        () => {
          celebrationSplash.style.display = "none"
          showScreen(resultsScreen)
        },
        { once: true },
      )
    }
  
    // Show results
    /*
     Shows the final results screen with the user's score and a personalized message.
      For scores of 8 or higher, triggers the celebration animation first.
     */
    function showResults() {
      scoreEl.textContent = score
  
      // Generate result message
      let message = ""
      const percentage = (score / questions.length) * 100
  
      if (percentage >= 80) {
        message = "Amazing! You're a nerdy joke master!"
  
        // Show celebration splash for scores 8 and above
        if (score >= 8) {
          showCelebration()
          return // Exit early, the continue button will show results
        }
      } else if (percentage >= 60) {
        message = "Good job! Your sense of humor is scientifically sound."
      } else if (percentage >= 40) {
        message = "Not bad! You're getting there with your nerdy humor."
      } else {
        message = "Keep studying those nerdy jokes! Practice makes perfect."
      }
  
      resultMessage.textContent = message
      showScreen(resultsScreen)
    }
  
    // Event listeners
    startBtn.addEventListener("click", () => {
      showScreen(questionScreen)
      loadQuestion()
    })
  
    restartBtn.addEventListener("click", () => {
      initQuiz()
    })
  
    // Initialize the quiz
    initQuiz()
  })
  
  