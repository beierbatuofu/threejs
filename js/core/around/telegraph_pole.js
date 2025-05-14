import * as THREE from "three";
import { NUMERATOR } from "../config";
import { BufferGeometry } from "three";
export default class TelegraphPole {
    houseData;
    defConf = {
        x: -10,
        y: 10,
        height: 10000,
    };
    group = new THREE.Group();
    vertices = [];
    static ins(list, houseData) {
        return new TelegraphPole(list, houseData);
    }
    static R = 0.05;
    constructor(list, houseData) {
        this.houseData = houseData;
        list.map((c) => {
            const conf = { ...this.defConf, ...c };
            const g = this.createModel(conf);
            this.group.add(g);
        });
        // this.vertices.forEach((v: any[]) => {
        //   const line = this.creatLine(v);
        //   this.group.add(line);
        // });
    }
    creatLine(v) {
        const m = new THREE.LineSegments(new BufferGeometry(), new THREE.MeshPhysicalMaterial({
            color: 0x999999,
        }));
        m.castShadow = true;
        m.geometry.setAttribute("position", new THREE.Float32BufferAttribute(v, 3));
        return m;
    }
    createPoles(n, conf) {
        const h = conf.height / NUMERATOR;
        const poles = new THREE.Group();
        const w = 0.4;
        const r = 0.03;
        for (let i = 0; i < n; i++) {
            const p = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 4), new THREE.MeshPhysicalMaterial({ color: 0x999999 }));
            p.position.y = h / 2 - 0.15 * (i + 1);
            p.rotation.x = (Math.PI / 180) * 90;
            p.castShadow = true;
            const verticesIdx = i * 1 + i;
            !this.vertices[verticesIdx] && (this.vertices[verticesIdx] = []);
            this.vertices[verticesIdx].push(conf.x, p.position.y, conf.y - (w / 2) * 0.7);
            !this.vertices[verticesIdx + 1] && (this.vertices[verticesIdx + 1] = []);
            this.vertices[verticesIdx + 1].push(conf.x, p.position.y, conf.y + (w / 2) * 0.7);
            //   console.log(p.position);
            poles.add(p);
        }
        return poles;
    }
    createModel(conf) {
        const group = new THREE.Group();
        const height = conf.height / NUMERATOR;
        const poles = this.createPoles(2, conf);
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(TelegraphPole.R, TelegraphPole.R, height, 32), new THREE.MeshPhysicalMaterial({ color: 0xcccccc }));
        cylinder.castShadow = true;
        group.add(cylinder);
        group.add(poles);
        group.position.set(conf.x, (this.houseData.h - height) / -2, conf.y);
        return group;
    }
}
//# sourceMappingURL=telegraph_pole.js.map