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
}

export default new TimerDataService();