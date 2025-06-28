const quizData = [
  {
    q: "Which CSS rule is used to make a website responsive?",
    choices: ["@keyframes", "@media", "@font-face", "@supports"],
    a: 1
  },
  {
    q: "What does the fetch() method return?",
    choices: ["A Promise", "A JSON object", "Undefined", "An Array"],
    a: 0
  },
  {
    q: "Which HTML tag do we put JavaScript code inside when linking external file?",
    choices: ["<javascript>", "<link>", "<script>", "<js>"],
    a: 2
  }
];


let current = 0, score = 0;
const questionEl = document.getElementById("question");
const choicesEl  = document.getElementById("choices");
const nextBtn    = document.getElementById("next-btn");
const scoreEl    = document.getElementById("score");

function loadQuestion() {
  const item = quizData[current];
  questionEl.textContent = item.q;
  choicesEl.innerHTML = "";

  item.choices.forEach((choice, idx) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(idx, btn));
    choicesEl.appendChild(btn);
  });

  nextBtn.disabled = true;
}

function selectAnswer(idx, btn) {
  const item = quizData[current];
  Array.from(choicesEl.children).forEach(b => b.disabled = true);

  if (idx === item.a) {
    btn.classList.add("correct"); score++;
  } else {
    btn.classList.add("wrong");
    choicesEl.children[item.a].classList.add("correct");
  }
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < quizData.length) {
    loadQuestion();
  } else {
    questionEl.textContent = "Quiz finished!";
    choicesEl.innerHTML = "";
    nextBtn.style.display = "none";
    scoreEl.textContent = `Your score: ${score} / ${quizData.length}`;
  }
});

loadQuestion();

const jokeBtn   = document.getElementById("joke-btn");
const jokeText  = document.getElementById("joke-text");

jokeBtn.addEventListener("click", async () => {
  jokeText.textContent = "Loading…";
  try {
    const res   = await fetch("https://official-joke-api.appspot.com/random_joke");
    const joke  = await res.json();
    jokeText.textContent = `${joke.setup}\n${joke.punchline}`;
  } catch (err) {
    jokeText.textContent = "Oops, couldn't fetch a joke right now.";
  }
});
