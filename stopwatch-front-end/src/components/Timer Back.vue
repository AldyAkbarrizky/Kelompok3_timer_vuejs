<template>
    <div>
        <slot></slot>
        <div class="timer-container text-center w-33-cent" part="timer-container">
            <div class="stopwatch w-50-cent m-auto">
                <span id="timer">{{ timer_time }}</span>
            </div>
            <div id="button-container" class="my-30">
                <button 
                    v-if="state === 'started'"
                    @click="pause()"
                    id="pause-btn"
                    class="btn btn-transparent text-white mx-5"
                >Pause</button>
                <button
                    id="start-btn"
                    class="btn btn-transparent text-white mx-5"
                    v-else-if="state !== 'started'"
                    @click="start()"
                >{{ state === "paused" ? "Resume" : "Start" }}</button>
                <button id="stop-btn" class="btn btn-transparent text-white mx-5">Stop</button>
                <button id="lap-btn" class="btn btn-transparent text-white mx-5">Lap</button>
            </div>
            <div part="my-30">
                <span id="record" part="record-text">{{ result }}</span>
            </div>
        </div>
    </div>
</template>

<script>
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

    export default {
        name: "Timer",
        props: {
            timerID: String,
            eTime: Number,
            status: String,
            time: Number
        },
        emits: ["state-update"],
        data() {
            return {
                timer_time: "00:00:00:00",
                state: this.status || "stopped",
                startTime: 0,
                timerInterval: 0,
                elapsedTime: this.eTime !== undefined ? this.eTime : 0,
                counter: 1,
                prevLap: 0,
                result: "Time <br>"
            };
        },
        methods:{
            printResult(hour, minutes, seconds) {
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
            },
            start() {
                console.log("start");
                // this.startTime = Date.now() - this.elapsedTime
                // if (this.state == "stopped") {
                //     this.counter = 1;
                //     this.recordText.innerHTML = "Time <br/>";
                //     this.prevLap = this.startTime;
                // }
                // this.timerInterval = setInterval(() => {
                //     this.elapsedTime = Date.now() - this.startTime;
                //     this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                // }, 10);

                // this.state = "started";
                // this.pauseButton.hidden = false;
                // this.playButton.hidden = true;
                // this.resumeButton.hidden = true;
                // this.lapButton.disabled = false;
                // this.resetButton.disabled = false;
            },
            resume() {
                console.log("resume")
                // this.startTime = Date.now() - this.elapsedTime
                // this.timerInterval = setInterval(() => {
                //     this.elapsedTime = Date.now() - this.startTime;
                //     this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                // }, 10);

                // this.state = "started";
                // this.pauseButton.hidden = false;
                // this.playButton.hidden = true;
                // this.resumeButton.hidden = true;
                // this.lapButton.disabled = false;
                // this.resetButton.disabled = false;
            },
            pause() {
                console.log("pause")
                // clearInterval(this.timerInterval);

                // this.state = "paused";
                // this.playButton.hidden = true;
                // this.pauseButton.hidden = true;
                // this.resumeButton.hidden = false;
                // this.lapButton.disabled = true;
            },
            reset() {
                console.log("reset")
                // const str = this.timerText.innerHTML;
                // const timeArr = str.split(":");
                // const final_time = "Final time: " + this.printResult(timeArr[0], timeArr[1], timeArr[2]) + "<br>";
                // this.lap();
                // this.recordText.innerHTML += final_time
                // clearInterval(this.timerInterval);
                // this.timerText.innerHTML = "00:00:00:00";
                // this.elapsedTime = 0;

                // this.state = "stopped";
                // this.pauseButton.style.display = "none";
                // this.resumeButton.style.display = "none";
                // this.playButton.style.display = "inline-block";
                // this.lapButton.disabled = true;
                // this.resetButton.disabled = true;
                // localStorage.removeItem("savedata-" + this.timerID);
            },
            lap() {
                console.log("lap")
                // const currTime = this.startTime - this.elapsedTime;
                // let lapTime = "";
                // if (this.counter == 1) {
                //     lapTime = this.elapsedTime;
                // } else {
                //     lapTime = this.prevLap - currTime;
                // }
                // const lap_time = " Lap " + this.counter + ". " + this.timerText.innerHTML + " (+" + this.timeToString(lapTime) + ")<br>";
                // this.recordText.innerHTML += lap_time;
                // this.prevLap = currTime;
                // this.counter += 1;
            }
        }
    }
</script>
