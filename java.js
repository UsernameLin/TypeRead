let timer = null;
let word_count = 0;
let total_word_count = 0;
let total_char_count = 0;
let character_count = 0;
let wpm = 0;
let peakwpm = 0;
let mistakes = 0;
let time_sec = 0;
let time_min = 0;
let time_hour = 0;
let time_reached_min = false;
let time_reached_hour = false;
let time_total = 0;
let time_on = false;
let cur_char_index = 0;
let rawText = "The quick brown fox jumps over the lazy dog.";
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
    wpm = Math.round((character_count /5) / (time_total/60));

    if(peakwpm < wpm && wpm != Infinity)
    {
        peakwpm = wpm;
        PEAKWPM_elm.querySelector("span").textContent = peakwpm;
    }

    wpm_elm.querySelector("span").textContent = wpm;
    mistake_elm.querySelector("span").textContent = mistakes;
    word_elm.querySelector("span").textContent = word_count;
    char_elm.querySelector("span").textContent = character_count;

}

//start and resume tracking time
function time_start(){
    timer = setInterval(() => {
        time_sec++;
        time_total++;
       
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

function initializeText(text) {
    text_elm.innerHTML = "";
    const words = text.split(" ");
    
    translate_raw_text(words);

    const firstLetter = text_elm.querySelector(".letter");
    if (firstLetter) firstLetter.classList.add("current");
}

function translate_raw_text(rawText){
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

        if(i < total_word_count -1)
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
function update_display(input_value)
{
    const text = text_elm.querySelectorAll("span");
    const cur_index =  input_value.length;
    character_count = cur_index;     

    if(cur_index > total_char_count){
        input.value = input.value.slice(0,total_char_count);
    }
    //backspace
    if(cur_index <= cur_char_index)
    {
        //if delete whole word
        if(cur_char_index - cur_index > 1)
        {
            for(let i = cur_index + 1; i < cur_char_index; ++i)
            {
            text[i].classList.remove("incorrect", "correct", "current");
            }
        }
        if(text[cur_char_index])
        {
            text[cur_char_index].classList.remove("incorrect", "correct", "current");
        }
        
        text[cur_index].classList.remove("incorrect","correct");
        text[cur_index].classList.add("current");
        cur_char_index = cur_index;
    }

    //if new letter was typed
    if(cur_index > cur_char_index)
    {
        const prev = text[cur_char_index];
        prev.classList.remove("current");
        if(prev.textContent == input_value[cur_char_index])
        {
            prev.classList.add("correct");
        }
        else
        {
            prev.classList.add("incorrect");
            mistakes++;
        }
        if(input_value[cur_char_index]== " ")
        {
            word_count++;
        }
        if(cur_index < total_char_count) 
        {
            text[cur_index].classList.add("current");
        }
        cur_char_index = cur_index;
    }
}

function update_progress()
{
    const progress = (character_count / (total_char_count)) * 100;
    console.log(character_count);
    progress_elm.style.width = Math.min(progress,100) + '%';
}

//input updates basically everything
function inputHandler(e){
    const input_value = e.target.value;
    update_display(input_value);
    update_stats();
    update_progress();
}

//for clicking anywhere on the text
function resume(){
    const icon = document.getElementById("start_icon");
    input.focus();
    if(!time_on && textInit)
    {
        time_on = true;
        time_start();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        startbtn.querySelector("div").textContent = "stop";
    }

}

function start(){
    const icon = document.getElementById("start_icon");
    if(!textInit){
        initializeText(rawText); 
        textInit = true;
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
text_elm.addEventListener('click', resume);
// stopbtn.addEventListener('click', stop_timer) removed
input.addEventListener('keydown', function(event) {
    if (event.metaKey) {
        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault(); 
        }
    }
});