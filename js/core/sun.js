import * as THREE from "three";
import SunCalc from "suncalc";
import { BufferGeometry } from "three";
export default class Sun {
    lon;
    lat;
    houseData;
    static ins(lon, lat, houseData) {
        return new Sun(lon, lat, houseData);
    }
    group = new THREE.Group();
    sun = Object.create(null);
    light = Object.create(null);
    elIns = Object.create(null);
    trackLine = Object.create(null);
    positions = [];
    raycolor = 0xffeb3b;
    dateObject = Object.create(null);
    lightHelper = Object.create(null);
    createDateObject(ins) {
        return ((o, _this) => {
            const object = Object.create({});
            Object.defineProperty(object, "year", {
                set(v) {
                    o.year = v;
                },
                get() {
                    return o.year;
                },
            });
            Object.defineProperty(object, "month", {
                set(v) {
                    o.month = v + 1;
                    ins.elsMap.month.setAttribute("value", o.month);
                },
                get() {
                    return o.month;
                },
            });
            Object.defineProperty(object, "day", {
                set(v) {
                    o.day = v;
                    ins.elsMap.day.setAttribute("value", v);
                },
                get() {
                    return o.day;
                },
            });
            Object.defineProperty(object, "timestamp", {
                set(v) {
                    o.timestamp = v;
                },
                get() {
                    return o.timestamp;
                },
            });
            Object.defineProperty(object, "time", {
                set(v) {
                    o.time = v;
                    const defaultHourValue = _this.positions.findIndex((item) => o.timestamp <= item.timestamp) || 1;
                    ins.elsMap.hour.setAttribute("value", String(defaultHourValue));
                },
                get() {
                    return o.time;
                },
            });
            Object.defineProperty(object, "strDate", {
                set(v) {
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
    createSun() {
        return new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 2), new THREE.MeshBasicMaterial({ color: 0xffc900 }));
    }
    createLight() {
        const Light = new THREE.DirectionalLight(0xffffff, 1);
        Light.castShadow = true;
        Light.shadow.mapSize.set(1024 * 2, 1024 * 2);
        return Light;
    }
    getLastDay(d) {
        return new Date(d.getFullYear(), Number(d.getMonth()) + 1, 0).getDate();
    }
    createTrackLine() {
        return new THREE.LineSegments(new BufferGeometry(), new THREE.LineBasicMaterial({
            color: 0x999999,
        }));
    }
    updateTrackLine(vertices) {
        this.trackLine.geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
    }
    setNowSunInfo(d) {
        const { position, year, month, day, timestamp, strDate, time } = this.computedSunData(d);
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
        }
        catch (err) {
            console.log(err);
        }
    }
    getTrackData(d) {
        const sumtimes = SunCalc.getTimes(d, this.lat, this.lon);
        const sunrise = sumtimes.sunrise;
        const sunset = sumtimes.sunset;
        const endValue = Math.ceil((sumtimes.sunset - sumtimes.sunrise) / (60 * 1000) / 5);
        const startValue = 5 - (sumtimes.sunrise.getMinutes() - 10 * Math.floor(sumtimes.sunrise.getMinutes() / 10));
        const vertices = [];
        const list = [];
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
    computedSunData(d) {
        const year = d.getFullYear();
        const month = d.getMonth();
        const day = d.getDate();
        const hour = d.getHours();
        const min = d.getMinutes();
        const timestamp = d.getTime();
        const sumpos = SunCalc.getPosition(d, this.lat, this.lon);
        let y = Math.sin(sumpos.altitude);
        const c = Math.sqrt(1 - Math.pow(y, 2));
        let x = -c * Math.sin(sumpos.azimuth);
        let z = c * Math.cos(sumpos.azimuth);
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
    addGroup(...args) {
        args.map((o) => this.group.add(o));
    }
    async init(operationIns) {
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
        }
        else if (now.getTime() <= firstDate.getTime()) {
            now = firstDate;
        }
        return now;
    }
    constructor(lon, lat, houseData) {
        this.lon = lon;
        this.lat = lat;
        this.houseData = houseData;
        this.light = this.createLight();
        this.sun = this.createSun();
        this.trackLine = this.createTrackLine();
        this.lightHelper = new THREE.DirectionalLightHelper(this.light, Math.max(this.houseData.l / 2, this.houseData.w / 2), this.raycolor);
        this.addGroup(this.light, this.sun, this.trackLine, this.lightHelper);
    }
}
//# sourceMappingURL=sun.js.map