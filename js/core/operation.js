export default class Operation {
    sunIns;
    titleEl = document.querySelector("#title");
    sunEl = document.createElement("div");
    elsMap = Object.create(null);
    defElements = () => ({
        hour: document.querySelector("#hour"),
        month: document.querySelector("#month"),
        day: document.querySelector("#day"),
        title: document.querySelector("#title"),
        info: document.querySelector("#sunInfo"),
    });
    get $inputType() {
        return {
            month: "月",
            day: "日",
            hour: "时",
        };
    }
    static ins(sunIns, els) {
        return new Operation(sunIns, els);
    }
    events = {
        onChange() { },
    };
    setInputRange(key, conf) {
        conf.min && this.elsMap[key].setAttribute("min", conf.min);
        conf.max && this.elsMap[key].setAttribute("max", conf.max);
    }
    constructor(sunIns, elsMap = {}) {
        this.sunIns = sunIns;
        this.elsMap = Object.assign(this.defElements(), elsMap);
        this.registerEvent(sunIns);
    }
    setElement(now) {
        this.setInputRange("month", { min: "1", max: "12" });
        this.setInputRange("day", { min: "1", max: String(this.sunIns.getLastDay(new Date())) });
        this.setInputRange("hour", { min: "0", max: String(this.sunIns.positions.length - 1) });
        this.sunIns.setNowSunInfo(now);
    }
    updateSunInfo(sumtimes) {
        this.elsMap.info.innerHTML = `<span>日出:${sumtimes.sunrise.getHours()}:${String(sumtimes.sunrise.getMinutes()).padStart(2, "0")}</span><span>日落:${sumtimes.sunset.getHours()}:${String(sumtimes.sunset.getMinutes()).padStart(2, "0")}</span>`;
    }
    on(...args) {
        for (let key in this.events) {
            Promise.resolve().then(() => this.events[key](args));
        }
    }
    registerEvent(sunIns) {
        const hour = (e) => {
            const now = sunIns.positions[Number(e.target.value)];
            sunIns.setNowSunInfo(now.d);
            this.on(e, now, "hour");
        };
        const month = (e) => {
            const now = new Date(`${sunIns.dateObject.year}/${String(e.target.value).padStart(2, "0")}/${String(sunIns.dateObject.day).padStart(2, "0")} ${sunIns.dateObject.time}:00`);
            const { vertices } = sunIns.getTrackData(now);
            sunIns.updateTrackLine(vertices);
            sunIns.setNowSunInfo(now);
            this.setInputRange("hour", { max: String(sunIns.positions.length - 1) });
            this.on(e, now, "month");
        };
        const day = (e) => {
            const now = new Date(`${sunIns.dateObject.year}/${sunIns.dateObject.month}/${e.target.value} ${sunIns.dateObject.time}`);
            const { vertices } = sunIns.getTrackData(now);
            sunIns.updateTrackLine(vertices);
            sunIns.setNowSunInfo(now);
            this.setInputRange("hour", { max: String(sunIns.positions.length - 1) });
            this.on(e, now, "day");
        };
        this.elsMap.hour.addEventListener("input", hour);
        this.elsMap.month.addEventListener("input", month);
        this.elsMap.day.addEventListener("input", day);
        return {
            hour,
            month,
            day,
        };
    }
}
//# sourceMappingURL=operation.js.map