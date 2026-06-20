let timer = null;
let word_count = 0;
let wpm = 0;
let peakwpm = 0;
let character_count= 0;
let progress = 0;
let mistakes = 0;
let time_sec = 0;
let time_min = 0;
let time_hour = 0;
let time_reached_min = false;
let time_reached_hour = false;
let time_total = 0;
let time_on = false;


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

function start(){
    const icon = document.getElementById("start_icon");
    if(time_on){
        stop_timer();
        icon.classList.remove("fa-pause");
        icon.classList.add("fa-play");
        startbtn.querySelector("div").textContent = "start";
    }
    else{
        time_start();
        icon.classList.remove("fa-play");
        icon.classList.add("fa-pause");
        startbtn.querySelector("div").textContent = "stop";

    }

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
    time_on = true;
    
}
//stops the time
function stop_timer(){
    if(time_elm.querySelector("span").textContent.includes("(PAUSED)")){
    }
    else{
        time_elm.querySelector("span").textContent += " (PAUSED)";
    }
    clearInterval(timer);
    time_on = false;
}

function update_progress_bar(){
    progress_elm.style.width = '10%';
};


startbtn.addEventListener('click', start);
// stopbtn.addEventListener('click', stop_timer) removed