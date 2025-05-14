export default class Operation {
  public titleEl = document.querySelector("#title");
  public sunEl = document.createElement("div");
  private elsMap: Record<string, any> = Object.create(null);

  private defElements = () => ({
    hour: document.querySelector("#hour"),
    month: document.querySelector("#month"),
    day: document.querySelector("#day"),
    title: document.querySelector("#title"),
    info: document.querySelector("#sunInfo"),
  });

  public get $inputType(): Record<string, any> {
    return {
      month: "月",
      day: "日",
      hour: "时",
    };
  }
  public static ins(sunIns: Record<string, any>, els?: Record<string, any>) {
    return new Operation(sunIns, els);
  }
  public events: Record<string, any> = {
    onChange() {},
  };

  public setInputRange(key: string, conf: { max?: string; min?: string }) {
    conf.min && this.elsMap[key].setAttribute("min", conf.min);
    conf.max && this.elsMap[key].setAttribute("max", conf.max);
  }

  protected constructor(private sunIns: Record<string, any>, elsMap: Record<string, any> = {}) {
    this.elsMap = Object.assign(this.defElements(), elsMap);
    this.registerEvent(sunIns);
  }

  public setElement(now: Date) {
    this.setInputRange("month", { min: "1", max: "12" });
    this.setInputRange("day", { min: "1", max: String(this.sunIns.getLastDay(new Date())) });
    this.setInputRange("hour", { min: "0", max: String(this.sunIns.positions.length - 1) });
    this.sunIns.setNowSunInfo(now);
  }

  public updateSunInfo(sumtimes: any) {
    this.elsMap.info.innerHTML = `<span>日出:${sumtimes.sunrise.getHours()}:${String(sumtimes.sunrise.getMinutes()).padStart(2, "0")}</span><span>日落:${sumtimes.sunset.getHours()}:${String(
      sumtimes.sunset.getMinutes()
    ).padStart(2, "0")}</span>`;
  }

  private on(...args: any) {
    for (let key in this.events) {
      Promise.resolve().then(() => this.events[key](args));
    }
  }

  private registerEvent(sunIns: Record<string, any>) {
    const hour = (e: Event) => {
      const now = sunIns.positions[Number((e.target as HTMLInputElement).value)];
      sunIns.setNowSunInfo(now.d);
      this.on(e, now, "hour");
    };

    const month = (e: Event) => {
      const now = new Date(`${sunIns.dateObject.year}/${String((e.target as HTMLInputElement).value).padStart(2, "0")}/${String(sunIns.dateObject.day).padStart(2, "0")} ${sunIns.dateObject.time}:00`);
      const { vertices } = sunIns.getTrackData(now);
      sunIns.updateTrackLine(vertices);
      sunIns.setNowSunInfo(now);

      this.setInputRange("hour", { max: String(sunIns.positions.length - 1) });
      this.on(e, now, "month");
    };

    const day = (e: Event) => {
      const now = new Date(`${sunIns.dateObject.year}/${sunIns.dateObject.month}/${(e.target as HTMLInputElement).value} ${sunIns.dateObject.time}`);
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
