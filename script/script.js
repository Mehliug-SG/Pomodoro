//the saved time of a work cycle
let work = [0, 25, 0];

//the saved time for a pause cycle
let pause = [0, 5, 0];

//the time that will be ticking down
let current = [0, 0, 0];

//probably a bad idea, using a global variable to communicate to another function, used to reset the timer
let reset = false;

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

function init(){

    document.getElementById("work_hour").value = 0;
    document.getElementById("work_minute").value = 25;
    document.getElementById("work_second").value = 0;
    document.getElementById("rest_hour").value = 0;
    document.getElementById("rest_minute").value = 5;
    document.getElementById("rest_second").value = 0;

    
    document.getElementById("reset").style.display = "none";

    document.getElementById("body").style.backgroundColor = "rgb(200 200, 200)";
    document.getElementById("body").style.transition = "background-color 3000ms linear";

    refresh();

    var1 = document.getElementById("start").addEventListener("click", () => {


        clock_work();

        document.getElementById("start").style.display = "none";
        document.getElementById("reset").style.display = "block";

    });

    var2 = document.getElementById("reset").addEventListener("click", (() =>{

        reset = true;

        document.getElementById("start").style.display = "block";
        document.getElementById("reset").style.display = "none";
        
    }))

}

//manages the work clock
async function clock_work(){

    document.getElementById("working_state").innerHTML = "working...";

    document.getElementById("body").style.backgroundColor = "rgb(255, 128, 128)";

    console.log(work);

    current = Array.from(work);

    while(current[0] + current[1] + current[2] != 0){

        refresh();

        await sleep(1000);

        if(reset){
            reset = false;
            
            current = [0, 0, 0];
            refresh();

            return;
        }

        

        current = tick_down(current);
        
    }

    

    clock_pause();
}

//manages the pause work
async function clock_pause(){

    document.getElementById("working_state").innerHTML = "resting...";

    document.getElementById("body").style.backgroundColor = "rgb(91, 175, 212)";

    current = Array.from(pause);

    while(current[0] + current[1] + current[2] != 0){

        refresh();

        await sleep(1000);

        if(reset){
            reset = false;
            
            current = [0, 0, 0];
            refresh();

            return;
        }

        

        current = tick_down(current);

    }

    

    clock_work();
}


//manages the change of allocated time for work
work_hour = document.getElementById("work_hour").addEventListener("change", () => {
    if(document.getElementById("work_hour").value != ""){
        work[0] = Number(document.getElementById("work_hour").value);
        refresh();
    }
});

work_minute = document.getElementById("work_minute").addEventListener("change", () => {
    if(document.getElementById("work_minute").value != ""){
        work[1] = Number(document.getElementById("work_minute").value);
        refresh();
    }
});

work_second = document.getElementById("work_second").addEventListener("change", () => {
    if(document.getElementById("work_second").value != ""){
        work[2] = Number(document.getElementById("work_second").value);
        refresh();
    }
});

//manages the change of allocated time for rest
rest_hour = document.getElementById("rest_hour").addEventListener("change", () => {
    if(document.getElementById("rest_hour").value != ""){
        rest[0] = Number(document.getElementById("rest_hour").value);
        refresh();
    }
});

rest_minute = document.getElementById("rest_minute").addEventListener("change", () => {
    if(document.getElementById("rest_minute").value != ""){
        rest[1] = Number(document.getElementById("rest_minute").value);
        refresh();
    }
});

rest_second = document.getElementById("rest_second").addEventListener("change", () => {
    if(document.getElementById("rest_second").value != ""){
        rest[2] = Number(document.getElementById("rest_second").value);
        refresh();
    }
});






init();