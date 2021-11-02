import http from "../http-common";

class TimerDataService {
    getAll() {
        return http.get("/timers");
    }
    create(data) {
        return http.post("/timers", data);
    }
    deleteAll() {
        return http.delete(`/timers`);
    }
    update(timerID, data) {
        return http.put(`/timers/${timerID}`, data);
    }
}

export default new TimerDataService();