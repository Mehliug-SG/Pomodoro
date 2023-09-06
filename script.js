//the saved time of a work cycle
let work = [0, 25, 0];

//the saved time for a pause cycle
let pause = [0, 5, 0];

//the time that will be ticking down
let current = [0, 0, 0];

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//this function refreshes the timer's display
function refresh(){
    document.getElementById("hour").textContent = current[0];
    document.getElementById("minute").textContent = current[1];
    document.getElementById("second").textContent = current[2];
}

//ticks down the given time by one second
function tick_down(time){

    console.log("aeiou");

    time[2] -= 1;
    if(time[2] == -1){
        time[2] = 59;
        time[1] -= 1;
        if(time[1] == -1){
            time[1] = 59;
            time[0] -= 1;
        }
    }

    console.log(time[0]);
    console.log(time[1]);
    console.log(time[2]);

    return time;
}

function init(){
    document.getElementById("start_stop").textContent = "START";

    refresh();

    var1 = document.getElementById("start_stop").addEventListener("click", () => {

        clock_work();
        document.getElementById("start_stop").style.display = "none";

    }, {once : true});

}

//manages the work clock
async function clock_work(){

    document.getElementById("working_state").innerHTML = "working...";

    current[0] = work[0];
    current[1] = work[1];
    current[2] = work[2];

    while(current[0] + current[1] + current[2] != 0){

        await sleep(1000);

        current = tick_down(current);

        refresh();
    }

    

    clock_pause();
}

//manages the pause work
async function clock_pause(){

    document.getElementById("working_state").innerHTML = "resting...";

    current[0] = pause[0];
    current[1] = pause[1];
    current[2] = pause[2];

    while(current[0] + current[1] + current[2] != 0){

        await sleep(1000);

        current = tick_down(current);

        refresh();
    }

    

    clock_work();
}






init();