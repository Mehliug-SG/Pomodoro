//the saved time of a work cycle
let work = [0, 25, 0];

//the saved time for a pause cycle
let pause = [0, 5, 0];

//the time that will be ticking down
let current = [0, 0, 0];

function init(){
    document.getElementById("start_stop").innerHTML = "START";

    console.log(current[1]);
    console.log(work[1]);

    refresh();

    var1 = document.getElementById("start_stop").addEventListener("click", () => {

        clock_work();
        document.getElementById("start_stop").style.display = "none";

    }, {once : true});

}

//manages the work clock
function clock_work(){

    

    current[0] = work[0];
    current[1] = work[1];
    current[2] = work[2];

    console.log(current[1]);
    console.log(work[1]);

    while(current[0] + current[1] + current[2] != 0){
        current = tick_down(current);
        refresh();
    }

    

    clock_pause();
}

//manages the pause work
function clock_pause(){

    current[0] = pause[0];
    current[1] = pause[1];
    current[2] = pause[2];

    while(current[0] + current[1] + current[2] != 0){
        current = tick_down(current);
        refresh();
    }

    

    clock_work();
}


//ticks down the given time by one second
function tick_down(time){
    time[2] -= 1;
    if(time[2] == -1){
        time[2] = 59;
        time[1] -= 1;
        if(time[1] == -1){
            time[1] = 59;
            time[0] -= 1;
        }
    }
    return time;
}


//this function refreshes the timer's display
function refresh(){
    document.getElementById("hour").INNERHTML = current[0];
    document.getElementById("minute").INNERHTML = current[1];
    document.getElementById("second").INNERHTML = current[2];
}




init();