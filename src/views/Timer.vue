<template>
    <slot></slot>
    <div class="timer-container text-center w-33-cent" part="timer-container">
        <div class="stopwatch w-50-cent m-auto" part="stopwatch">
            <span id="timer" part="timer">00:00:00:00</span>
        </div>
        <div id="button-container" class="my-30">
            <button id="start-btn" v-on:click="start" class="btn btn-transparent text-white mx-5" part="button">Start</button>
            <button id="resume-btn" v-on:click="resume" class="btn btn-transparent text-white mx-5" hidden part="button">Resume</button>
            <button id="pause-btn" v-on:click="pause" class="btn btn-transparent text-white mx-5" hidden part="button">Pause</button>
            <button id="stop-btn" v-on:click="stop" class="btn btn-transparent text-white mx-5" part="button">Stop</button>
            <button id="lap-btn" v-on:click="lap" class="btn btn-transparent text-white mx-5" disabled part="button">Lap</button>
        </div>
        <div part="my-30">
            <span id="record" part="record-text">Time <br></span>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';

    export default{
        name:'App',
        props:{
            id: String
        },
        data(){
            return{
                timer_tot: 0,
                timerID: this.id,
                startTime: 0,
                elapsedTime: 0,
                timerInterval: 0,
                counter: 1,
                prevLap: 0,
                state: "stopped"
            }
        },
        mounted(){
            console.log(localStorage.getItem("saveData-" + this.id));

            window.addEventListener("beforeunload", (event) => this.save(event));
            this.load();
        },
        methods:{
            save(event) {
                event.preventDefault();

                localStorage.setItem("saveData-" + this.timerID, JSON.stringify({
                    timer_id: this.timerID,
                    counter: this.counter,
                    lap_string: this.recordText.innerHTML,
                    prev_lap: this.prevLap,
                    saved_time: this.elapsedTime,
                    time_closed: Date.now(),
                    state: this.state    
                }));

                return;
            },
            load() {
                if (this.timerID) {
                    const loadData = JSON.parse(localStorage.getItem("saveData-" + this.timerID));
                    if (!loadData) return;
                    this.elapsedTime = loadData.saved_time;
                    switch (loadData.state) {
                        case "started":
                            this.elapsedTime += (Date.now() - loadData.time_closed);
                            this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                            this.recordText.innerHTML = loadData.lap_string;
                            this.counter = loadData.counter;
                            this.prevLap = loadData.prev_lap;
                            this.state = loadData.state;
                            this.start();
                            break
                        case "paused":
                            this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                            this.recordText.innerHTML = loadData.lap_string;
                            this.counter = loadData.counter;
                            this.prevLap = loadData.prev_lap;
                            this.state = loadData.state;
                            this.pause();
                            break
                        case "stopped":
                            this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                            this.recordText.innerHTML = "Time <br/>";
                            break
                    }
                }
            },
            timeToString(time) {
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
            },
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
                console.log(this.elapsedTime);
                this.startTime = Date.now() - this.elapsedTime
                if (this.state == "stopped") {
                    this.counter = 1;
                    this.recordText.innerHTML = "Time <br/>";
                    this.prevLap = this.startTime;
                }
                this.startTime = Date.now() - this.elapsedTime;
                this.timerInterval = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                    this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                }, 10);

                this.state = "started";
                this.pauseButton.hidden = false;
                this.playButton.hidden = true;
                this.resumeButton.hidden = true;
                this.lapButton.disabled = false;
                this.resetButton.disabled = false;
            },
            resume() {
                this.startTime = Date.now() - this.elapsedTime
                this.timerInterval = setInterval(() => {
                    this.elapsedTime = Date.now() - this.startTime;
                    this.timerText.innerHTML = this.timeToString(this.elapsedTime);
                }, 10);

                this.state = "started";
                this.pauseButton.hidden = false;
                this.playButton.hidden = true;
                this.resumeButton.hidden = true;
                this.lapButton.disabled = false;
                this.resetButton.disabled = false;
            },
            pause() {
                clearInterval(this.timerInterval);

                this.state = "paused";
                this.playButton.hidden = true;
                this.pauseButton.hidden = true;
                this.resumeButton.hidden = false;
                this.lapButton.disabled = true;
            },
            reset() {
                const str = this.timerText.innerHTML;
                const timeArr = str.split(":");
                const final_time = "Final time: " + this.printResult(timeArr[0], timeArr[1], timeArr[2]) + "<br>";
                this.lap();
                this.recordText.innerHTML += final_time
                clearInterval(this.timerInterval);
                this.timerText.innerHTML = "00:00:00:00";
                this.elapsedTime = 0;

                this.state = "stopped";
                this.pauseButton.style.display = "none";
                this.resumeButton.style.display = "none";
                this.playButton.style.display = "inline-block";
                this.lapButton.disabled = true;
                this.resetButton.disabled = true;
                localStorage.removeItem("savedata-" + this.timerID);
            },
            lap() {

                const currTime = this.startTime - this.elapsedTime;
                let lapTime = "";
                if (this.counter == 1) {
                    lapTime = this.elapsedTime;
                } else {
                    lapTime = this.prevLap - currTime;
                }
                const lap_time = " Lap " + this.counter + ". " + this.timerText.innerHTML + " (+" + this.timeToString(lapTime) + ")<br>";
                this.recordText.innerHTML += lap_time;
                this.prevLap = currTime;
                this.counter += 1;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>