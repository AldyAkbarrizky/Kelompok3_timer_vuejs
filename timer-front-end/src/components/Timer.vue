<template>
        <slot></slot>
        <div class="timer-container">
            <div class="stopwatch w-50-cent m-auto">
                <span id="timer">{{ timer_time }}</span>
            </div>
            <div id="button-container" class="my-30">
                <button
                    v-if="state == 'started'" @click="pause()"
                    id="pause-btn"
                    class="btn btn-transparent text-white mx-5"
                >Pause</button>
                <button
                    v-if="state != 'started'" @click="start()"
                    id="start-btn"
                    class="btn btn-transparent text-white mx-5"
                >{{ state === "paused" ? "Resume" : "Start" }}</button>
                <button id="stop-btn" @click="reset()" class="btn btn-transparent text-white mx-5">Stop</button>
                <button id="lap-btn" @click="lap()" class="btn btn-transparent text-white mx-5">Lap</button>
            </div>
            <div part="my-30">
                <span id="record" class="record-text" v-html="result"></span>
            </div>
        </div>
</template>

<script>
    import TimerDataService from "../services/TimerDataService";
    function timeToString(time) {
        let diffInHrs = time / 3600000;
        let hh = Math.floor(diffInHrs);

        let diffInMin = (diffInHrs - hh) * 60;
        let mm = Math.floor(diffInMin);

        let diffInSec = (diffInMin - mm) * 60;
        let ss = Math.floor(diffInSec);

        let diffInMs = (diffInSec - ss) * 100;
        let ms = Math.floor(diffInMs);

        let formattedHH = hh.toString().padStart(2, "0");
        let formattedMM = mm.toString().padStart(2, "0");
        let formattedSS = ss.toString().padStart(2, "0");
        let formattedMS = ms.toString().padStart(2, "0");

        return `${formattedHH}:${formattedMM}:${formattedSS}:${formattedMS}`;
    }

    function printResult(hour, minutes, seconds) {
        let txt = "";
        if (hour != "00") {
            var hourTime = parseInt(hour);
            if (hourTime >= 24) {
                var day = parseInt(hourTime / 24);
                hourTime = hourTime - (day * 24);
                txt = day + " hari " + hourTime + " jam " + minutes + " menit " + seconds + " detik ";
            }
            else {
                txt = hour + " jam " + minutes + " menit " + seconds + " detik ";
            }
        }
        else if (minutes != "00") {
            txt = minutes + " menit " + seconds + " detik ";
        }
        else if (seconds != "00") {
            txt = seconds + " detik ";
        } else {
            txt = "0 detik"
        }
        return txt
    }

    export default {
        name: "Timer",
        props: {
            id: String
        },
        data() {
            return {
                timerID: this.id,
                timer_time: "00:00:00:00",
                state: "stopped",
                startTime: 0,
                timerInterval: 0,
                elapsedTime: localStorage.eTime !== undefined ? localStorage.eTime : 0,
                counter: 1,
                prevLap: 0,
                result: "Time <br/>"
            };
        },
        watch: {    
            state: function() {
                console.log("State changed");
            }
        },
        created: function() {
            // add event listener to handle tab/browser closing
            // and do logout
            window.addEventListener(
                "beforeunload",
                this.save
            );
        },
        mounted() {
            console.log(this.timerID);
            console.log(localStorage.getItem("saveData-" + this.timerID));
            
            this.load()
        },
        methods: {
            save(e) {
                e.preventDefault();
                
                localStorage.setItem("saveData-" + this.timerID, JSON.stringify({
                    state: this.state,
                    savedTime: this.elapsedTime,
                    record: this.result,
                    timeClosed: Date.now(),
                    counter: this.counter,
                    prevLap: this.prevLap
                }));
            },
            load() {
                if(this.timerID) {
                    console.log("Masuk ke load")
                    const loadData = JSON.parse(localStorage.getItem("saveData-" + this.timerID));
                    if(!loadData) return;

                    this.elapsedTime = loadData.savedTime;
                    
                    switch(loadData.state) {
                        case "started":
                            console.log("Timer " + this.timerID + " masuk started");
                            this.elapsedTime += (Date.now() - loadData.timeClosed);
                            this.timer_time = timeToString(this.elapsedTime);
                            this.result = loadData.record;
                            this.counter=loadData.counter;
                            this.prevLap=loadData.prevLap;
                            this.state= loadData.state;
                            this.start();
                            break
                        case "paused":
                            console.log("Timer " + this.timerID + " masuk paused");
                            this.timer_time = timeToString(this.elapsedTime);
                            this.result = loadData.record;
                            this.counter=loadData.counter;
                            this.prevLap=loadData.prevLap;
                            this.state= loadData.state;
                            this.pause();
                            break
                        case "stopped":
                            console.log("Timer " + this.timerID + " masuk stopped");
                            this.timer_time = timeToString(this.elapsedTime);
                            this.result = "Time <br/>";
                            break
                    }
                }
            },
            start() {
                this.startTime = Date.now() - this.elapsedTime
                if (this.state == "stopped") {
                    this.counter = 1;
                    this.result = "Time <br/>";
                    this.prevLap = this.startTime;
                }
                this.timerInterval = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                    this.timer_time = timeToString(this.elapsedTime);
                }, 10);

                this.state = "started";
            },
            pause() {
                clearInterval(this.timerInterval);
                this.state = "paused";
            },
            reset() {
                const str = this.timer_time;
                const timeArr = str.split(":");
                const final_time = "Final time: " + printResult(timeArr[0], timeArr[1], timeArr[2]) + "<br>";
                this.lap();
                this.result += final_time
                clearInterval(this.timerInterval);
                this.timer_time = "00:00:00:00";
                this.elapsedTime = 0;

                this.state = "stopped";

                console.log(this.timerID);

                var data = {
                    counter: this.counter,
                    lap_string: this.result,
                    prev_lap: this.prevLap,
                    savedtime: null,
                    closedtime: null,
                    state: null
                }

                TimerDataService.update(this.timerID, data)
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
            },
            lap() {
                const currTime = this.startTime - this.elapsedTime;
                let lapTime = "";
                if (this.counter == 1) {
                    lapTime = this.elapsedTime;
                } else {
                    lapTime = this.prevLap - currTime;
                }
                const lap_time = " Lap " + this.counter + ". " + this.timer_time + " (+" + timeToString(lapTime) + ")<br>";
                this.result += lap_time;
                this.prevLap = currTime;
                this.counter += 1;
            }
        }
    }
</script>
