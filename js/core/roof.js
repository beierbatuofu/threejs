import * as THREE from "three";
import { NUMERATOR, EAVE } from "./config";
class Support {
    group = new THREE.Group();
    board = Object.create(null);
    cylinder = Object.create(null);
    compData = Object.create(null);
    houseData = Object.create(null);
    static ins(compData, houseData) {
        return new Support(compData, houseData);
    }
    constructor(compData, houseData) {
        this.compData = compData;
        this.houseData = houseData;
        this.board = this.createBoard();
        this.cylinder = this.createCylinder();
        this.group.add(this.board);
        this.group.add(this.cylinder);
    }
    static BORAD_H = 0.01;
    createBoard() {
        const h = Support.BORAD_H;
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(this.compData.w, h, this.compData.l), new THREE.MeshBasicMaterial({ color: 0xdddddd }));
        mesh.position.x = this.compData.x;
        mesh.position.y = this.compData.y + this.houseData.h / 2 + this.houseData.eave_h - h - 0.01;
        mesh.position.z = this.compData.z - Math.cos((Math.PI / 180) * (90 - this.compData.tiltAngle)) * (h + 0.01);
        mesh.rotation.x = (Math.PI / 180) * this.compData.tiltAngle;
        this.compData.direction == 1 && (mesh.rotation.y = (Math.PI / 180) * 90);
        return mesh;
    }
    static CYLINER = {
        H: 0.01,
        W: 0.01,
    };
    createCylinder() {
        const _height = this.compData.height + (Math.sin((Math.PI / 180) * this.compData.tiltAngle) * this.compData.l) / 2;
        const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(Support.CYLINER.W, Support.CYLINER.H, _height, 3), new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5, metalness: 0.5 }));
        cylinder.position.x = this.compData.x;
        cylinder.position.z = this.compData.z;
        cylinder.position.y = this.houseData.h / 2 + _height / 2 + EAVE.H / 2;
        cylinder.castShadow = true;
        return cylinder;
    }
}
class Component {
    static H = 0.02;
    static ins(data) {
        return new Component(data);
    }
    mesh = Object.create(null);
    texture = new THREE.TextureLoader().load("textures/component.png");
    data = Object.create(null);
    constructor(data) {
        this.data = this.setSizeData(data);
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(this.data.w, this.data.h, this.data.l), new THREE.MeshStandardMaterial({ map: this.texture, metalness: 0.7, roughness: 0.7 }));
        const conf = this.setConf(data, mesh);
        mesh.position.x = conf.x;
        mesh.position.y = conf.y;
        mesh.position.z = conf.z;
        mesh.rotation.y = conf.rotationY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.rotation.x = (Math.PI / 180) * this.data.tiltAngle;
        mesh.userData["ins"] = this;
        this.mesh = mesh;
    }
    setConf(data, mesh) {
        const position0 = data.coordinates[0];
        const box = new THREE.Box3();
        const { max } = box.setFromObject(mesh);
        const conf = data.direction == 1
            ? {
                x: position0.x / NUMERATOR + max.x,
                z: position0.y / NUMERATOR - max.z / 2,
                y: data.height / NUMERATOR + (Math.sin((Math.PI / 180) * data.tiltAngle) * data.width) / 2 / NUMERATOR,
                rotationY: (Math.PI / 180) * 90,
                direction: data.direction,
            }
            : {
                x: position0.x / NUMERATOR,
                z: position0.y / NUMERATOR,
                y: data.height / NUMERATOR + (Math.sin((Math.PI / 180) * data.tiltAngle) * data.length) / 2 / NUMERATOR,
                rotationY: 0,
                direction: data.direction,
            };
        this.data = Object.assign(this.data, conf);
        return conf;
    }
    setSizeData(data) {
        const e = 0.005;
        return {
            l: data.length / NUMERATOR + e,
            w: data.width / NUMERATOR + e,
            h: Component.H,
            height: data.height / NUMERATOR,
            tiltAngle: data.tiltAngle,
        };
    }
    get $data() {
        return this.data;
    }
}
export default class Roof {
    group = new THREE.Group();
    houseData = Object.create(null);
    constructor(houseData) {
        this.houseData = houseData;
    }
    drawComp(list) {
        const setOrigin = this.createOrigin(this.houseData, list[0].modules[0]);
        const compGroup = new THREE.Group();
        const supportGroup = new THREE.Group();
        setOrigin(compGroup);
        setOrigin(supportGroup, { y: 0 });
        list.forEach((item, index) => {
            const { modules } = item;
            modules.forEach((ite, idx) => {
                const compIns = Component.ins({ ...ite, tiltAngle: item.tiltAngle });
                const supportIns = Support.ins(compIns.$data, this.houseData);
                compGroup.add(compIns.mesh);
                supportGroup.add(supportIns.group);
            });
        });
        this.group.add(compGroup);
        this.group.add(supportGroup);
    }
    // public drawObstacle(list: Record<string, any>[]) {
    //   const obstacleGroup = new THREE.Group();
    //   list.forEach((item: Record<string, any>) => {
    //     let ins: (...args: any) => any | undefined = obstacle[item.type];
    //     if (!ins) {
    //       //默认障碍物
    //       ins = obstacle.default;
    //     }
    //     const instance = ins(item, this.houseData);
    //     obstacleGroup.add(instance.g);
    //   });
    //   this.group.add(obstacleGroup);
    // }
    createOrigin(houseData, firstCompData) {
        const _x = (-1 * houseData.l) / 2 + firstCompData.width / NUMERATOR / 2;
        const _z = (-1 * houseData.w) / 2 + firstCompData.length / NUMERATOR / 2;
        const _y = houseData.h / 2 + houseData.eave_h;
        return function (object, position) {
            let x = position?.x ?? _x;
            let y = position?.y ?? _y;
            let z = position?.z ?? _z;
            object.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
        };
    }
    static ins(houseData) {
        return new Roof(houseData);
    }
}
//# sourceMappingURL=roof.js.map