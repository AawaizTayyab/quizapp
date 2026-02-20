// SELECTING HTML ELEMENTS
const b1 = document.getElementById("b1");
const b2 = document.getElementById("b2");
const b3 = document.getElementById("b3");
const startBtn = document.querySelector(".start_btn");

const welcomeScreen = document.querySelector(".mainbody");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");

let selectedCategory = "";
let score = 0;
let qIndex = 0;
let currentQuestions = [];

// QUIZ ELEMENTS
const categoryTitle = document.getElementById("categoryTitle");
const questionText = document.getElementById("questionText");

const opt1 = document.getElementById("opt1");
const opt2 = document.getElementById("opt2");
const opt3 = document.getElementById("opt3");
const opt4 = document.getElementById("opt4");

const nextBtn = document.getElementById("nextBtn");

// RESULT ELEMENTS
const finalScore = document.getElementById("finalScore");
const retryBtn = document.getElementById("retryBtn");
const homeBtn = document.getElementById("homeBtn");

// CATEGORY BUTTONS
b1.onclick = () => selectCategory("pillars", b1);
b2.onclick = () => selectCategory("prophets", b2);
b3.onclick = () => selectCategory("quran", b3);

function selectCategory(cat, btn){
    selectedCategory = cat;

    // Reset button styles
    b1.style.background = b2.style.background = b3.style.background = "white";
    b1.style.color = b2.style.color = b3.style.color = "blue";

    // Highlight selected
    btn.style.background = "blue";
    btn.style.color = "white";
}

// QUESTION BANK (5 QUESTIONS EACH)
const questionBank = {
    pillars:[
        {q:"How many pillars are there in Islam?", a:["4","5","6","7"], c:1},
        {q:"What is the first pillar?", a:["Salah","Shahada","Zakat","Hajj"], c:1},
        {q:"Zakat means?", a:["Charity","Prayer","Fasting","Pilgrimage"], c:0},
        {q:"Which month is fasting?", a:["Shawwal","Rajab","Ramadan","Muharram"], c:2},
        {q:"Hajj is performed in?", a:["Madina","Makkah","Taif","Yemen"], c:1},
        {q:"Which pillar requires fasting during Ramadan?", a:["Salah","Zakat","Sawm","Hajj"], c:2},
        {q:"Shahada is the declaration of...", a:["Charity","Faith","Prayer","Pilgrimage"], c:1},
        {q:"How many times a day should Muslims pray?", a:["3","5","7","2"], c:1},
        {q:"Zakat is obligatory for whom?", a:["All Muslims","Only Poor","Only Rich","Only Adults"], c:2},
        {q:"Which pillar involves pilgrimage to Makkah?", a:["Salah","Zakat","Hajj","Sawm"], c:2},

    ],
    prophets:[
        {q:"Who is the final Prophet?", a:["Isa","Musa","Muhammad (PBUH)","Ibrahim"], c:2},
        {q:"Who built an Ark?", a:["Adam","Nuh","Yunus","Idris"], c:1},
        {q:"Who split the sea?", a:["Isa","Musa","Yusuf","Ibrahim"], c:1},
        {q:"Who was swallowed by a fish?", a:["Musa","Yunus","Zakariya","Nuh"], c:1},
        {q:"Who was known for patience?", a:["Ayub","Idris","Saleh","Yusuf"], c:0},
        {q:"Who is the father of Prophet Ismail?", a:["Ibrahim","Adam","Musa","Nuh"], c:0},
        {q:"Who was known for wisdom and judgment?", a:["Sulaiman","Yusuf","Musa","Muhammad"], c:0},
        {q:"Which Prophet was thrown into the fire but remained safe?", a:["Ibrahim","Musa","Isa","Nuh"], c:0},
        {q:"Who received the Ten Commandments?", a:["Isa","Musa","Yusuf","Ibrahim"], c:1},
        {q:"Which Prophet interpreted dreams in Egypt?", a:["Yusuf","Musa","Ibrahim","Zakariya"], c:0},

    ],
    quran:[
        {q:"How many Surahs in Quran?", a:["114","200","90","50"], c:0},
        {q:"The Quran was revealed in?", a:["Arabic","Persian","Hebrew","Turkish"], c:0},
        {q:"First revealed Surah?", a:["Fatiha","Ikhlas","Alaq","Baqarah"], c:2},
        {q:"Longest Surah?", a:["Nisa","Baqarah","Kahf","Yaseen"], c:1},
        {q:"Surah Ikhlas teaches?", a:["Prophets","Tawheed","Angels","Qiyamah"], c:1},
        {q:"Surah Al-Fatiha has how many verses?", a:["6","7","5","8"], c:1},
        {q:"The Quran was revealed over how many years?", a:["20","23","30","25"], c:1},
        {q:"Which Surah is called 'The Heart of the Quran'?", a:["Yaseen","Baqarah","Ikhlas","Kahf"], c:0},
        {q:"The Quran was revealed to which Prophet?", a:["Musa","Muhammad","Isa","Ibrahim"], c:1},
        {q:"Surah Al-Kahf is recommended to read on which day?", a:["Friday","Monday","Sunday","Thursday"], c:0},

    ]
};

// START QUIZ
startBtn.onclick = () => {
    if(selectedCategory === ""){
        alert("Please select a category first!");
        return;
    }

    welcomeScreen.style.display = "none";
    quizScreen.style.display = "block";

    currentQuestions = questionBank[selectedCategory];
    qIndex = 0;
    score = 0;

    categoryTitle.innerHTML = selectedCategory.toUpperCase() + " QUIZ";

    loadQuestion();
};

// LOAD QUESTION
function loadQuestion(){

    // Reset button styles
    const options = [opt1, opt2, opt3, opt4];
    options.forEach(btn => {
        btn.classList.remove("correct", "wrong", "disabled");
    });

    let q = currentQuestions[qIndex];

    questionText.innerHTML = q.q;

    opt1.innerHTML = q.a[0];
    opt2.innerHTML = q.a[1];
    opt3.innerHTML = q.a[2];
    opt4.innerHTML = q.a[3];

    opt1.onclick = () => checkAnswer(0);
    opt2.onclick = () => checkAnswer(1);
    opt3.onclick = () => checkAnswer(2);
    opt4.onclick = () => checkAnswer(3);
}

// CHECK ANSWER (Green / Red Borders)
function checkAnswer(selected){
    let correct = currentQuestions[qIndex].c;
    const options = [opt1, opt2, opt3, opt4];

    // Disable all buttons
    options.forEach(btn => btn.classList.add("disabled"));

    // Highlight WRONG selected answer
    if(selected !== correct){
        options[selected].classList.add("wrong");
    }

    // Always highlight correct
    options[correct].classList.add("correct");

    // Score update
    if(selected === correct){
        score++;
    }
}

// NEXT QUESTION
nextBtn.onclick = () => {
    qIndex++;

    if(qIndex === 10){
        endQuiz();
    } else {
        loadQuestion();
    }
};

// END QUIZ
function endQuiz(){
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";

    finalScore.innerHTML = score;

    // Calculate percentage
    let percent = (score / 10) * 100;
    document.getElementById("finalPercent").innerHTML = percent;
    
}

// RETRY & HOME
retryBtn.onclick = () => {
    qIndex = 0;
    score = 0;
    resultScreen.style.display = "none";
    quizScreen.style.display = "block";
    loadQuestion();
};

homeBtn.onclick = () => {
    location.reload();
};
