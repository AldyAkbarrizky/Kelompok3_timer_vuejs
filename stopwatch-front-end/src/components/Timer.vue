<template>
        <slot></slot>
        <div class="timer-container">
            <div class="stopwatch w-50-cent m-auto">
                <span id="timer">{{ timer_time }}</span>
            </div>
            <div id="button-container" class="my-30">
                <button id="start-btn" @click="start()" class="btn btn-transparent text-white mx-5">Start</button>
                <button id="resume-btn" class="btn btn-transparent text-white mx-5" hidden>Resume</button>
                <button id="pause-btn" class="btn btn-transparent text-white mx-5" hidden>Pause</button>
                <button id="stop-btn" class="btn btn-transparent text-white mx-5">Stop</button>
                <button id="lap-btn" class="btn btn-transparent text-white mx-5" disabled>Lap</button>
            </div>
            <div part="my-30">
                <span id="record" class="record-text">{{ result }}</span>
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
        data() {
            return {
                timerID: "Timer-"+localStorage.timer_count,
                timer_time: "00:00:00:00",
                state: "stopped",
                startTime: 0,
                timerInterval: 0,
                elapsedTime: localStorage.eTime !== undefined ? localStorage.eTime : 0,
                counter: 1,
                prevLap: 0,
                result: "Time"
            };
        },
        methods: {
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
            resume() {
                
            },
            pause() {

            },
            reset() {

            },
            lap() {

            }
        }
    }
</script>
