/// <reference path="../../../node_modules/@types/three/src/Three.d.ts" />
import * as THREE from "three";
import { NUMERATOR } from "../config";
import { EAVE } from "../config";
import { CSG } from "three-csg-ts";
export default class Cube {
    group = new THREE.Group();
    mesh = Object.create(null);
    get $data() {
        return this.config;
    }
    defColor = "#eddac5";
    config = Object.create(null);
    constructor(data) {
        const { roofTemplate } = data;
        //创建房屋
        this.config = this.setConfig(data);
        this.mesh = this.createHouse(this.config.l, this.config.w);
        let mainEave = this.createEave(this.config.eave_l, this.config.eave_w);
        if (roofTemplate != 0) {
            const { cropRect } = data.threeOptions;
            cropRect.forEach((d) => {
                const w = d.long / NUMERATOR;
                const l = d.width / NUMERATOR;
                const [x, y] = d.point;
                const _house = this.createHouse(w, l);
                const _eave = this.createEave(w, l);
                _eave.position.x = _house.position.x = x / NUMERATOR - this.config.l / 2 + w / 2;
                _eave.position.z = _house.position.z = y / NUMERATOR - this.config.w / 2 + l / 2;
                _house.updateMatrix();
                _eave.updateMatrix();
                mainEave = CSG.subtract(mainEave, _eave);
                this.mesh = CSG.subtract(this.mesh, _house);
            });
        }
        this.group.add(this.mesh);
        {
            const { max } = new THREE.Box3().setFromObject(this.mesh);
            mainEave.position.y = max.y;
            this.group.add(mainEave);
        }
        this.mesh.castShadow = true;
    }
    createHouse(a, b) {
        return new THREE.Mesh(new THREE.BoxGeometry(a, this.config.h, b), new THREE.MeshBasicMaterial({ color: new THREE.Color(this.config.c) }));
    }
    createEave(a, b) {
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(a, this.config.eave_h, b), new THREE.MeshStandardMaterial({ depthTest: false, color: this.config.eave_c }));
        mesh.receiveShadow = true;
        return mesh;
    }
    setConfig(data) {
        const { width, long } = data.threeOptions.originRect;
        const w = width / NUMERATOR;
        const l = long / NUMERATOR;
        const h = data.roofHeight / NUMERATOR;
        const c = this.defColor;
        const expand = EAVE.EXPAND;
        const eave_h = EAVE.H;
        const eave_w = w;
        const eave_l = l;
        return {
            w,
            h,
            l,
            c,
            expand,
            eave_h,
            eave_w,
            eave_l,
            eave_c: EAVE.COLOR,
            d: data,
            rt: data.roofType,
        };
    }
    static ins(data) {
        return new Cube(data);
    }
}
//# sourceMappingURL=cube.js.map