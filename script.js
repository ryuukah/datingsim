/* =========================================
   TAEHYUNG — 7 DIALOGUE SCENE
========================================= */

const dialogues = [
    {
        japanese:
            "外は寒いのに、どうしてジャケットを着ていないの?",

        english:
            "It's cold outside, why aren't you wearing a jacket?"
    },

    {
        japanese:
            "まるで不在がちな父親みたいに君を放っておいてごめんね…今、君の宿題を添削しているところだよ.",

        english:
            "Sorry i've been like an absent father and neglected you... I'm correcting your homework."
    },

    {
        japanese:
            "何か食べるものを買いたいなら、数ドルあるよ。",

        english:
            "I got a few dollars if you want to buy something to eat."
    },

    {
        japanese:
            "今日はとてもきれいですね。あなたと同じように。",

        english:
            "It looks pretty today. Just like you."
    },

    {
        japanese:
            "私の家にブレスレットを忘れていましたよ。はい、これです。",

        english:
            "You forgot a bracelet at my home. Here you go."
    },

    {
        japanese:
            "寝るときにあなたを抱きしめることに、慣れてしまった…",

        english:
            "I've gotten used to hugging you when I sleep..."
    },

    {
        japanese:
            "私からあなたへの愛を、決して疑わないでください。",

        english:
            "Please never doubt my love for you."
    }
];


/* =========================================
   GAME STATE
========================================= */

let currentDialogue = 0;

const affection = 110;


/* =========================================
   ELEMENTS
========================================= */

const japaneseText =
    document.getElementById("japaneseText");

const englishText =
    document.getElementById("englishText");

const dialogueBox =
    document.getElementById("dialogueBox");

const nextButton =
    document.getElementById("nextButton");

const menuButton =
    document.getElementById("menuButton");

const closeMenu =
    document.getElementById("closeMenu");

const menuOverlay =
    document.getElementById("menuOverlay");

const restartButton =
    document.getElementById("restartButton");

const autoButton =
    document.getElementById("autoButton");

const saveButton =
    document.getElementById("saveButton");

const sceneNumber =
    document.getElementById("sceneNumber");


/* =========================================
   SHOW DIALOGUE
========================================= */

function showDialogue() {

    const dialogue = dialogues[currentDialogue];

    japaneseText.textContent = dialogue.japanese;

    englishText.textContent =
        `[ENG: "${dialogue.english}"]`;

    sceneNumber.textContent =
        `Dialogue ${currentDialogue + 1} / ${dialogues.length}`;
}


/* =========================================
   NEXT DIALOGUE
========================================= */

function nextDialogue() {

    /*
        If we're currently on Dialogue 7,
        clicking will restart at Dialogue 1.
    */

    if (currentDialogue >= dialogues.length - 1) {

        currentDialogue = 0;

        showDialogue();

        return;
    }

    currentDialogue++;

    showDialogue();
}


/* =========================================
   CLICK DIALOGUE BOX
========================================= */

dialogueBox.addEventListener("click", function () {

    nextDialogue();

});


/* =========================================
   NEXT BUTTON
========================================= */

nextButton.addEventListener("click", function (event) {

    event.stopPropagation();

    nextDialogue();

});


/* =========================================
   MENU
========================================= */

menuButton.addEventListener("click", function () {

    menuOverlay.classList.add("open");

});


closeMenu.addEventListener("click", function () {

    menuOverlay.classList.remove("open");

});


menuOverlay.addEventListener("click", function (event) {

    if (event.target === menuOverlay) {

        menuOverlay.classList.remove("open");

    }

});


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener("click", function () {

    currentDialogue = 0;

    showDialogue();

    menuOverlay.classList.remove("open");

    stopAuto();

});


/* =========================================
   AUTO MODE
========================================= */

let autoMode = false;

let autoTimer = null;


autoButton.addEventListener("click", function (event) {

    event.stopPropagation();

    if (autoMode) {

        stopAuto();

        return;
    }

    autoMode = true;

    autoButton.textContent = "AUTO ON";

    autoTimer = setInterval(function () {

        nextDialogue();

    }, 3500);

});


function stopAuto() {

    autoMode = false;

    autoButton.textContent = "AUTO";

    if (autoTimer !== null) {

        clearInterval(autoTimer);

        autoTimer = null;

    }
}


/* =========================================
   SAVE
========================================= */

saveButton.addEventListener("click", function (event) {

    event.stopPropagation();

    localStorage.setItem(
        "taehyungDialogue",
        currentDialogue
    );

    saveButton.textContent = "SAVED";

    setTimeout(function () {

        saveButton.textContent = "SAVE";

    }, 1200);

});


/* =========================================
   LOAD SAVED POSITION
========================================= */

function loadSavedDialogue() {

    const saved =
        localStorage.getItem("taehyungDialogue");

    if (saved === null) {

        return;
    }

    const savedNumber =
        parseInt(saved, 10);

    if (
        !Number.isNaN(savedNumber) &&
        savedNumber >= 0 &&
        savedNumber < dialogues.length
    ) {

        currentDialogue = savedNumber;

    }
}


/* =========================================
   INITIALIZE GAME
========================================= */

loadSavedDialogue();

showDialogue();
