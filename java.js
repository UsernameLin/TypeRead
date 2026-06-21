let timer = null;
let word_count = 0;
let total_word_count = 0;
let total_char_count = 0;
let character_count = 0;
let wpm = 0;
let peakwpm = 0;
let progress = 0;
let mistakes = 0;
let time_sec = 0;
let time_min = 0;
let time_hour = 0;
let time_reached_min = false;
let time_reached_hour = false;
let time_total = 0;
let time_on = false;
let cur_char_index = 0;
let rawText = "The quick brown fox jumps over the lazy dog. ";
let textInit = false;


// buttons
const startbtn = document.getElementById("start");
// const stopbtn = document.getElementById("stop"); removed
const savebtn = document.getElementById("save");
const uploadbtn = document.getElementById("upload-file");

//elements
const time_elm = document.getElementById("stopwatch");
const wpm_elm = document.getElementById("wpm");
const word_elm = document.getElementById("WORDS");
const char_elm = document.getElementById("CHARACTERS");
const mistake_elm = document.getElementById("MISTAKES");
const PEAKWPM_elm = document.getElementById("PEAK-WPM");
const progress_elm = document.getElementById("progress-fill");
const input = document.getElementById("hidden-input");
const text_elm = document.getElementById("words")


function update_stats()
{
    wpm = (character_count /5) / (60/time_total);

    if(peakwpm < wpm)
    {
        peakwpm = wpm;
        peakwpm.textContent = peakwpm;
    }
    
    wpm_elm.querySelector("span").textContent = wpm;
    mistake_elm.querySelector("span").textContent = mistakes;
    word_elm.querySelector("span").textContent = word_count;
    char_elm.querySelector("span").textContent = character_count;

}

//start and resume tracking time
//time is main loop for calculate everything
function time_start(){
    timer = setInterval(() => {
        time_sec++;
        time_total++;

        update_stats();
       
        //convert sec to min
        if(time_sec >= 60){time_sec = 0; time_reached_min = true; time_min++}

        //then convert min to hour
        if(time_min >= 60){time_min = 0; time_reached_hour = true; time_hour++}

        //checks to see how what time format fits best for the time elapsed 
        if(time_reached_hour){
            if(time_min < 10){time_elm.querySelector("span").textContent = time_hour + ":0" + time_min;}
            else{time_elm.querySelector("span").textContent = time_hour + ":" + time_min;}
        }
        else if(time_reached_min){
            if(time_sec < 10){time_elm.querySelector("span").textContent = time_min+ ":0" + time_sec;}
            else{time_elm.querySelector("span").textContent = time_min+ ":" + time_sec;}
        }
        else{time_elm.querySelector("span").textContent = time_sec;}
        }, 1000);
    
}
//stops the time
function stop_timer(){
    if(time_elm.querySelector("span").textContent.includes("(PAUSED)")){
    }
    else{
        time_elm.querySelector("span").textContent += " (PAUSED)";
    }
    clearInterval(timer);
}

function update_progress_bar(){
    progress_elm.style.width = '';
};

function initializeText(text) {
    text_elm.innerHTML = "";
    const words = text.split(" ");
    
    translate_raw_text(words);

    const firstLetter = text_elm.querySelector(".letter");
    if (firstLetter) firstLetter.classList.add("current");
}

function translate_raw_text(rawText){
    word_index = 0;
    total_word_count = rawText.length;
    for(let i = 0; i< total_word_count; ++i)
        {
        const word_div = document.createElement("div");
        word_div.className = "word";

        total_char_count += rawText[i].length;

        for(let j = 0; j < rawText[i].length; ++j){
            let letter_span = document.createElement("span");
            letter_span.className = "letter";
            letter_span.textContent = rawText[i][j];
            word_div.appendChild(letter_span);
        }

        if(word_index < total_word_count -1)
        {
            let space_span = document.createElement("span");
            space_span.className = "letter";
            space_span.textContent = " ";
            total_char_count += 1;
            word_div.appendChild(space_span);
        }
        text_elm.appendChild(word_div);
    }
}
function update_display(){}
function update_progress(){}


function inputHandler(e){
    const input_value = e.target.value;
    cur_char_index = input_value.length;


}

function start(){
    const icon = document.getElementById("start_icon");
    if(!textInit){
        initializeText(rawText); 
    }
    input.focus();
    if(time_on){
        time_on = false;
        stop_timer();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        startbtn.querySelector("div").textContent = "start";
    }
    else{
        time_on = true;
        time_start();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        startbtn.querySelector("div").textContent = "stop";
    }
}

input.addEventListener('input', inputHandler);
startbtn.addEventListener('click', start);
// stopbtn.addEventListener('click', stop_timer) removed