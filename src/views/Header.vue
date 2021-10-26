<template>
    <header>
        <div id="main-cont" class="w-100-v h-100-v">
        <div id="container" class="m-auto text-center">
            <div id="stopwatch-header" class="my-30">
                <h1>The Timer God Only Knows</h1>
                <button @click="addButton()" class="btn btn-transparent text-white mx-5">Add Timer</button>
                <button @click="clearButton()" class="btn btn-transparent text-white mx-5">Clear Timer</button>
            </div>
        </div>
    </div>
    </header>
</template>

<script>
    import $ from 'jquery';
    import Timer from './Timer.vue'
    export default{
        name: 'App',
        data(){
            return{
                tot_timer: 0,
            }
        },
        method:{
            addButton(){
                $.get("count-timer", function (data, status) {
                    this.tot_timer = parseInt(data)
                    if (!this.tot_timer) this.tot_timer = 0;

                    if (this.tot_timer === 3) {
                        alert("Timer sudah mencapai batas maksimum")
                    } else {
                        var timerData = {
                            timer_id: "timer-" + this.tot_timer
                        }
                        $.ajax({
                            type: "POST",
                            contentType: "application/json",
                            url: window.location + "new-timer",
                            data: JSON.stringify(timerData),
                            dataType: 'json',
                            success: function(data) {
                                var timer = new Timer({ id: 'timer-' + this.tot_timer });
                                timer.setAttribute('id', 'timer-' + this.tot_timer);
                                $("#main-cont").append(timer);
                            },
                            error: function(e) {
                                alert("Error!")
                            }
                        })
                    }
                })
            },
            clearButton(){
                $.get("count-timer", function (data, status) {
                    this.tot_timer = parseInt(data)

                    $.ajax({
                        type: 'DELETE',
                        url: window.location + "delete-all",
                        success: function(data) {
                            for (var i = 0; i < this.tot_timer; i++) {
                            //$('#timer-' + tot_timer).remove();
                            document.getElementById('timer-' + i).remove();
                            }
                        }
                    })
                })
            }
        }
    }
    
</script>

<style scoped>
    
</style>