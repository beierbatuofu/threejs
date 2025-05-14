import * as THREE from "three";
import SunCalc from "suncalc";
import { BufferGeometry } from "three";

export default class Sun {
  public static ins(lon: number, lat: number, houseData: Record<string, any>) {
    return new Sun(lon, lat, houseData);
  }

  public group = new THREE.Group();

  private sun = Object.create(null);
  private light = Object.create(null);
  public elIns = Object.create(null);
  public trackLine = Object.create(null);
  public positions: Record<string, any>[] = [];
  private raycolor = 0xffeb3b;
  public dateObject = Object.create(null);
  public lightHelper = Object.create(null);

  private createDateObject(ins: any) {
    return ((o: Record<string, any>, _this: Sun) => {
      const object = Object.create({});

      Object.defineProperty(object, "year", {
        set(v: any) {
          o.year = v;
        },
        get() {
          return o.year;
        },
      });

      Object.defineProperty(object, "month", {
        set(v: any) {
          o.month = v + 1;
          ins.elsMap.month.setAttribute("value", o.month);
        },
        get() {
          return o.month;
        },
      });

      Object.defineProperty(object, "day", {
        set(v: any) {
          o.day = v;

          ins.elsMap.day.setAttribute("value", v);
        },
        get() {
          return o.day;
        },
      });
      Object.defineProperty(object, "timestamp", {
        set(v: any) {
          o.timestamp = v;
        },
        get() {
          return o.timestamp;
        },
      });

      Object.defineProperty(object, "time", {
        set(v: any) {
          o.time = v;
          const defaultHourValue = _this.positions.findIndex((item: any) => o.timestamp <= item.timestamp) || 1;
          ins.elsMap.hour.setAttribute("value", String(defaultHourValue));
        },
        get() {
          return o.time;
        },
      });

      Object.defineProperty(object, "strDate", {
        set(v: any) {
          o.strDate = v;

          ins.titleEl.innerHTML = v;
        },
        get() {
          return o.strDate;
        },
      });

      return object;
    })(Object.create({}), this);
  }

  private createSun() {
    return new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 2), new THREE.MeshBasicMaterial({ color: 0xffc900 }));
  }

  private createLight() {
    const Light = new THREE.DirectionalLight(0xffffff, 1);
    Light.castShadow = true;

    Light.shadow.mapSize.set(1024 * 2, 1024 * 2);

    return Light;
  }

  public getLastDay(d: Date) {
    return new Date(d.getFullYear(), Number(d.getMonth()) + 1, 0).getDate();
  }

  private createTrackLine() {
    return new THREE.LineSegments(
      new BufferGeometry(),
      new THREE.LineBasicMaterial({
        color: 0x999999,
      })
    );
  }

  public updateTrackLine(vertices: number[]) {
    this.trackLine.geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  }

  public setNowSunInfo(d: Date) {
    const { position, year, month, day, timestamp, strDate, time }: any = this.computedSunData(d);
    const lightScale = 2;
    const [x, y, z] = position;
    this.sun.position.set(x, y, z);
    this.light.position.set(x * lightScale, y * lightScale, z * lightScale);
    Promise.resolve().then(() => {
      this.lightHelper.update();
    });

    try {
      this.dateObject.year = year;
      this.dateObject.month = month;
      this.dateObject.day = day;
      this.dateObject.timestamp = timestamp;
      this.dateObject.strDate = strDate;
      this.dateObject.time = time;
    } catch (err) {
      console.log(err);
    }
  }

  public getTrackData(d: Date) {
    const sumtimes = SunCalc.getTimes(d, this.lat, this.lon);
    const sunrise = sumtimes.sunrise;
    const sunset = sumtimes.sunset;
    const endValue = Math.ceil((sumtimes.sunset - sumtimes.sunrise) / (60 * 1000) / 5);
    const startValue = 5 - (sumtimes.sunrise.getMinutes() - 10 * Math.floor(sumtimes.sunrise.getMinutes() / 10));
    const vertices: number[] = [];
    const list: Record<string, any>[] = [];

    list.push(this.computedSunData(sunrise));
    for (let i = 1; i < endValue; i++) {
      const d = this.computedSunData(new Date(sunrise.getFullYear(), sunrise.getMonth(), sunrise.getDate(), sunrise.getHours(), sunrise.getMinutes() + startValue + (i - 1) * 5));
      list.push(d);
      vertices.push(...d.position);
    }
    list.push(this.computedSunData(sunset));

    this.positions = list;

    this.elIns.updateSunInfo(sumtimes);

    return {
      vertices,
    };
  }

  private computedSunData(d: Date) {
    const year = d.getFullYear();
    const month = d.getMonth();
    const day = d.getDate();
    const hour = d.getHours();
    const min = d.getMinutes();
    const timestamp = d.getTime();
    const sumpos = SunCalc.getPosition(d, this.lat, this.lon);
    let y: number = Math.sin(sumpos.altitude);
    const c = Math.sqrt(1 - Math.pow(y, 2));
    let x: number = -c * Math.sin(sumpos.azimuth);
    let z: number = c * Math.cos(sumpos.azimuth);
    const time = `${String(hour).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
    const scale = 20 + this.houseData.h / 2;

    return {
      strDate: `${year}年${month + 1}月${day}日${time}`,
      position: [(x *= scale), (y *= scale), (z *= scale)],
      year,
      month,
      day,
      timestamp,
      hour,
      min,
      d,
      time,
    };
  }

  private addGroup(...args: any) {
    args.map((o: any) => this.group.add(o));
  }

  public async init(operationIns: any) {
    this.dateObject = this.createDateObject((this.elIns = operationIns));
    let now = new Date();
    let { vertices } = this.getTrackData(now);

    this.updateTrackLine(vertices);
    const start = this.positions[0];
    const end = this.positions[this.positions.length - 1];
    const firstDate = new Date(start.d);
    const lastDate = new Date(end.d);

    if (now.getTime() >= lastDate.getTime()) {
      now = lastDate;
    } else if (now.getTime() <= firstDate.getTime()) {
      now = firstDate;
    }

    return now;
  }

  protected constructor(private lon: number, private lat: number, private houseData: Record<string, any>) {
    this.light = this.createLight();
    this.sun = this.createSun();
    this.trackLine = this.createTrackLine();
    this.lightHelper = new THREE.DirectionalLightHelper(this.light, Math.max(this.houseData.l / 2, this.houseData.w / 2), this.raycolor);
    this.addGroup(this.light, this.sun, this.trackLine, this.lightHelper);
  }
}
