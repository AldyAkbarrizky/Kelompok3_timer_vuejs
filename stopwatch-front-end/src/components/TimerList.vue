<template>
    <div id="main-cont" class="w-100-v h-100-v">
        <div id="container" class="m-auto text-center">
            <div id="stopwatch-header" class="my-30">
                <h1>The Timer God Only Knows</h1>
                <button id="add-btn" @click="add()" class="btn btn-transparent text-white mx-5">Add Timer</button>
                <button id="clear-btn" @click="clearTimer()" class="btn btn-transparent text-white mx-5">Clear Timer</button>
            </div>
        </div>
        <div id="timer-cont" class="w-100-v">
        </div>   
    </div>
</template>

<script>
    import TimerDataService from "../services/TimerDataService";
    import TimerVue from "./Timer";
    import { createApp } from "vue"

    export default {
        name: "App",
        props: {
            counter: Number
        },
        data() {
            return {
                timer: {
                    id: "Timer-1"
                },
                submitted: false,
                timer_counter: 0,
                timerComp1: null,
                timerComp2: null,
                timerComp3: null
            }
        },
        mounted() {
            if(localStorage.timer_count) {
                this.timer_counter = localStorage.timer_count;
            } else {
                localStorage.timer_count = 0;
            }

            console.log("Start: " + localStorage.timer_count);

            if(parseInt(localStorage.timer_count) === 1) {
                this.timerComp1 = createApp(TimerVue);
                const wrapper = document.createElement("div");
                wrapper.setAttribute("id", "0");
                wrapper.setAttribute("class", "timer-container w-33-cent text-center");
                this.timerComp1.mount(wrapper);
                document.getElementById('timer-cont').append(wrapper);
            } else if(parseInt(localStorage.timer_count) === 2) {
                this.timerComp1 = createApp(TimerVue);
                const wrapper1 = document.createElement("div");
                wrapper1.setAttribute("id", "0");
                wrapper1.setAttribute("class", "timer-container w-33-cent text-center");
                this.timerComp1.mount(wrapper1);
                document.getElementById('timer-cont').append(wrapper1);
                this.timerComp2 = createApp(TimerVue);
                const wrapper2 = document.createElement("div");
                wrapper2.setAttribute("id", "1");
                wrapper2.setAttribute("class", "timer-container w-33-cent text-center");
                this.timerComp2.mount(wrapper2);
                document.getElementById('timer-cont').append(wrapper2);
            } else if(parseInt(localStorage.timer_count) === 3) {
                this.timerComp1 = createApp(TimerVue);
                const wrapper1 = document.createElement("div");
                wrapper1.setAttribute("id", "0");
                wrapper1.setAttribute("class", "timer-container w-33-cent text-center");
                this.timerComp1.mount(wrapper1);
                document.getElementById('timer-cont').append(wrapper1);
                this.timerComp2 = createApp(TimerVue);
                const wrapper2 = document.createElement("div");
                wrapper2.setAttribute("id", "1");
                wrapper2.setAttribute("class", "timer-container w-33-cent text-center");
                this.timerComp2.mount(wrapper2);
                document.getElementById('timer-cont').append(wrapper2);
                this.timerComp3 = createApp(TimerVue);
                const wrapper3 = document.createElement("div");
                wrapper3.setAttribute("id", "2");
                wrapper3.setAttribute("class", "timer-container w-33-cent text-center");
                this.timerComp3.mount(wrapper3);
                document.getElementById('timer-cont').append(wrapper3);
            }
        },
        methods:{
            add() {
                var data = {
                    timer_id: "Timer-" + localStorage.timer_count
                };

                if(parseInt(localStorage.timer_count) === 3) {
                    alert("Jumlah timer sudah maksimal");
                } else {
                    TimerDataService.create(data)
                    .then(response => {
                        // Add new Timer
                        if(parseInt(localStorage.timer_count) === 0) {
                            this.timerComp1 = createApp(TimerVue);
                            const wrapper = document.createElement("div");
                            wrapper.setAttribute("id", localStorage.timer_count);
                            wrapper.setAttribute("class", "timer-container w-33-cent text-center");
                            this.timerComp1.mount(wrapper);
                            document.getElementById('timer-cont').append(wrapper);
                        } else if(parseInt(localStorage.timer_count) === 1) {
                            this.timerComp2 = createApp(TimerVue);
                            const wrapper = document.createElement("div");
                            wrapper.setAttribute("id", localStorage.timer_count);
                            wrapper.setAttribute("class", "timer-container w-33-cent text-center");
                            this.timerComp2.mount(wrapper);
                            document.getElementById('timer-cont').append(wrapper);
                        } else if(parseInt(localStorage.timer_count) === 2) {
                            this.timerComp3 = createApp(TimerVue);
                            const wrapper = document.createElement("div");
                            wrapper.setAttribute("id", localStorage.timer_count);
                            wrapper.setAttribute("class", "timer-container w-33-cent text-center");
                            this.timerComp3.mount(wrapper);
                            document.getElementById('timer-cont').append(wrapper);
                        }
                        localStorage.timer_count = parseInt(localStorage.timer_count) + 1;

                        console.log(response.data);
                        this.submitted = true;
                    })
                    .catch(e => {
                        console.log(e);
                    });
                }
            },
            clearTimer() {
                TimerDataService.deleteAll()
                    .then(response => {
                        console.log(response.data);
                    })
                    .catch(e => {
                        console.log(e);
                    })
                if (parseInt(localStorage.timer_count) === 1){
                    this.timerComp1.unmount();
                    document.getElementById("0").remove();
                } else if (parseInt(localStorage.timer_count) === 2){
                    this.timerComp1.unmount();
                    this.timerComp2.unmount();
                    document.getElementById("0").remove();
                    document.getElementById("1").remove();
                } else if (parseInt(localStorage.timer_count) === 3){
                    this.timerComp1.unmount();
                    this.timerComp2.unmount();
                    this.timerComp3.unmount();
                    document.getElementById("0").remove();
                    document.getElementById("1").remove();
                    document.getElementById("2").remove();
                }

                localStorage.timer_count = 0;
                console.log("End: " + localStorage.timer_count);
            }
        }
    }
</script>
