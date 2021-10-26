import Vue from 'vue';

var timercomponent = {
    template: `
        <slot></slot>
        <div class="timer-container text-center w-33-cent">
            <div class="stopwatch w-50-cent m-auto">
                <span id="timer">00:00:00:00</span>
            </div>
            <div id="button-container" class="my-30">
                <button id="start-btn" class="btn btn-transparent text-white mx-5">Start</button>
                <button id="resume-btn" class="btn btn-transparent text-white mx-5" hidden>Resume</button>
                <button id="pause-btn" class="btn btn-transparent text-white mx-5" hidden>Pause</button>
                <button id="stop-btn" class="btn btn-transparent text-white mx-5">Stop</button>
                <button id="lap-btn" class="btn btn-transparent text-white mx-5" disabled>Lap</button>
            </div>
            <div part="my-30">
                <span id="record" class="record-text">Time <br></span>
            </div>
        </div>
    `,
    data: function() {
        return {
            txt: 'Testing'
        };
    },
    mounted() {

    },
    
    methods: {

    }
};

Vue.component("timer", timer);