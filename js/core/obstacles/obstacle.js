import * as THREE from "three";
import { NUMERATOR } from "../config";
import { CSG } from "three-csg-ts";
class Base {
    g;
    data = Object.create(null);
    get $data() {
        return this.data;
    }
    w = 0;
    h = 0;
    l = 0;
    position = Object.create(null);
    shape = 0;
    constructor(data) {
        const { actualHeight, length, width, shape, roofInside, x, y } = data;
        this.g = new THREE.Group();
        this.position = {
            x,
            y,
        };
        this.w = Number((width / NUMERATOR).toFixed(6));
        this.h = Number((actualHeight / NUMERATOR).toFixed(6));
        this.l = Number((length / NUMERATOR).toFixed(6));
        this.shape = shape;
        this.data = { x, y, height: actualHeight, length, width, isRoofInside: roofInside };
    }
    get topIdx() {
        return this.shape == 1 ? 1 : 2;
    }
    createModel(houseData) {
        const handler = this.shape == 1 ? this.cylinder : this.createCube;
        const mesh = handler.call(this, houseData);
        return mesh;
    }
    createCube(houseData) {
        const material = new THREE.MeshStandardMaterial({ color: 0x999999 });
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(this.w, this.h, this.l), new Array(6).fill(material.clone()));
        const positionY = this.data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        mesh.position.y = positionY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.x = this.position.x / NUMERATOR + this.w / 2 - houseData.l / 2;
        mesh.position.z = this.position.y / NUMERATOR + this.l / 2 - houseData.w / 2;
        this.g.add(mesh);
        return mesh;
    }
    cylinder(houseData) {
        const r = this.w / 2;
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, this.h, 32), [new THREE.MeshStandardMaterial({ color: 0x999999 }), new THREE.MeshStandardMaterial({ color: 0x999999 })]);
        const positionY = this.data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        mesh.position.y = positionY;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.x = this.position.x / NUMERATOR + r - houseData.l / 2;
        mesh.position.z = this.position.y / NUMERATOR + r - houseData.w / 2;
        this.g.add(mesh);
        return mesh;
    }
}
export class DefType extends Base {
    static type = "default";
    static label = "默认";
    static ins(data, houseData) {
        return new DefType(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        this.createModel(houseData);
    }
}
export class Type8 extends Base {
    static type = 8;
    static label = "女儿墙";
    static ins(data, houseData) {
        return new Type8(data, houseData);
    }
    texture = new THREE.TextureLoader().load("textures/wall.jpg");
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        this.texture.wrapS = THREE.RepeatWrapping;
        this.texture.wrapT = THREE.MirroredRepeatWrapping;
        this.l > this.w ? this.texture.repeat.set(this.l * 2, 2) : this.texture.repeat.set(2, this.w * 2);
        mesh.material.forEach((m, idx) => {
            if (idx == this.topIdx) {
                m.color = new THREE.Color("#150c01");
            }
            else {
                m.map = this.texture;
            }
        });
    }
}
export class Type0 extends Base {
    static type = 0;
    static label = "烟囱";
    static ins(data, houseData) {
        return new Type0(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        const texture = new THREE.TextureLoader().load("textures/wall.jpg");
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.MirroredRepeatWrapping;
        texture.repeat.set(this.h * 2, 2);
        mesh.material.forEach((m, idx) => {
            if (idx == this.topIdx) {
                m.color = new THREE.Color("#150c01");
            }
            else {
                m.map = texture;
            }
        });
    }
}
export class Type1 extends Base {
    static type = 1;
    static label = "太阳能";
    static ins(data, houseData) {
        return new Type1(data, houseData);
    }
    createTop() {
        const r = 0.03;
        const h = Math.min(this.w, this.l);
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 }));
        mesh.rotation.z = (Math.PI / 180) * 90;
        mesh.position.y = h / 2 + r;
        return mesh;
    }
    createComponent(v) {
        const r = (Math.PI / 180) * v;
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(this.w, Math.abs(this.h / Math.cos(r))), new THREE.MeshStandardMaterial({
            color: 0x666666,
            metalness: 0.5,
            roughness: 0.5,
            alphaMap: new THREE.TextureLoader().load("textures/1.jpg"),
            transparent: true,
            side: THREE.DoubleSide,
        }));
        mesh.rotation.x = r;
        mesh.position.z = -1 * (v / Math.abs(v)) * Math.abs(Math.sin(r) * this.l);
        return mesh;
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        const top = this.createTop();
        const body = this.createComponent(-25);
        const bottom = this.createComponent(10);
        mesh.material.forEach((m) => {
            m.transparent = true;
            m.opacity = 0;
            m.depthTest = false;
        });
        mesh.add(top, body, bottom);
    }
}
export class Type2 extends Base {
    static type = 2;
    static label = "水箱";
    static ins(data, houseData) {
        return new Type2(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        mesh.material.forEach((m, idx) => {
            if (idx == this.topIdx) {
                m.color = new THREE.Color("#41768b");
            }
            else {
                m.color = new THREE.Color("#3b7389");
            }
        });
    }
}
export class Type3 extends Base {
    static type = 3;
    static label = "树";
    static LEAF = {
        H: 0.15,
        S: 16,
    };
    static ins(data, houseData) {
        return new Type3(data, houseData);
    }
    createLeaf() {
        const scale = 0.9;
        const len = Math.ceil(this.h / (Type3.LEAF.H * scale));
        const group = new THREE.Group();
        for (let i = 0; i < len; i++) {
            const m = new THREE.Mesh(new THREE.ConeGeometry((this.w / len) * (((i + 1) / len) * 2 + 1), Type3.LEAF.H, Type3.LEAF.S), new THREE.MeshLambertMaterial({ color: 0x00721a }));
            m.position.y = (len - i) * Type3.LEAF.H * scale - this.h / 2;
            group.add(m);
        }
        return group;
    }
    createMain(houseData) {
        const tree = new THREE.Mesh(new THREE.CylinderGeometry(this.w, this.l, this.h, 32), new THREE.MeshBasicMaterial());
        const positionY = this.$data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        tree.castShadow = true;
        tree.receiveShadow = true;
        tree.position.y = positionY;
        tree.position.x = this.position.x / NUMERATOR + this.w / 2 - houseData.l / 2;
        tree.position.z = this.position.y / NUMERATOR + this.l / 2 - houseData.w / 2;
        return tree;
    }
    constructor(data, houseData) {
        super(data);
        const shadow = this.createMain(houseData);
        const leaf = this.createLeaf();
        const tree = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, this.h, 32), new THREE.MeshBasicMaterial({ color: 0x6a4d00 }));
        shadow.material.transparent = true;
        shadow.material.opacity = 0;
        shadow.add(leaf);
        shadow.add(tree);
        this.g.add(shadow);
    }
}
export class Type4 extends Base {
    static type = 4;
    static label = "电线杆";
    static ins(data, houseData) {
        return new Type4(data, houseData);
    }
    createPoles(n) {
        const group = new THREE.Group();
        const w = 0.2;
        const r = 0.01;
        for (let i = 0; i < n; i++) {
            const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, w, 8), new THREE.MeshPhysicalMaterial({ color: 0x999999 }));
            m.position.y = this.h / 2 - 0.05 * (i + 1);
            m.rotation.x = (Math.PI / 180) * 90;
            m.castShadow = true;
            group.add(m);
        }
        return group;
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        mesh.add(this.createPoles(2));
    }
}
export class Type5 extends Base {
    static type = 5;
    static label = "炮台";
    static ins(data, houseData) {
        return new Type5(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.08, Math.min(this.h, 0.12) * 0.9), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("textures/window.jpg") }));
        const position = this.w / 2 + 0.0001;
        const rotations = [0, (Math.PI / 180) * 90, (Math.PI / 180) * 90];
        const createWindow = () => plane.clone();
        const doorHeight = 0.15;
        const doorWidth = Math.min(this.h, 0.25) * 0.9;
        const door = new THREE.Mesh(new THREE.PlaneGeometry(doorHeight, doorWidth), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x000000 }));
        rotations.forEach((r, idx) => {
            const m = createWindow();
            const result = idx % 2 ? position : -1 * position;
            if (r == 0) {
                m.position.z = result;
            }
            else {
                m.position.x = result;
                m.rotation.y = r;
            }
            mesh.add(m);
        });
        door.position.z = position;
        door.position.y = -1 * (this.h / 2 - doorWidth / 2);
        mesh.add(door);
    }
}
export class Type6 extends Base {
    static type = 6;
    static label = "邻居家平屋顶";
    static ins(data, houseData) {
        return new Type6(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createCube(houseData);
        mesh.material.forEach((m, idx) => {
            m.color = new THREE.Color("#eddac5");
        });
    }
}
export class Type7 extends Base {
    static type = 7;
    static label = "洞口";
    static ins(data, houseData) {
        return new Type7(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const mesh = this.createModel(houseData);
        mesh.material.forEach((m, idx) => {
            m.color = new THREE.Color("#111");
            if (idx != this.topIdx) {
                m.depthTest = false;
                m.transparent = true;
                m.opacity = 0;
            }
        });
        mesh.castShadow = false;
        mesh.position.y = houseData.h / 2 - this.h / 2 + 0.02;
    }
}
export class Type9 extends Base {
    static type = 9;
    static label = "邻居家斜屋顶";
    static roofHeight = 0.05;
    static ins(data, houseData) {
        return new Type9(data, houseData);
    }
    createRoof() {
        const create = () => {
            const scale = this.h > 1.5 ? 0.6 : 0.5;
            const m = new THREE.Mesh(new THREE.CylinderGeometry(this.l * scale, this.l * scale, this.w, 6), new THREE.MeshBasicMaterial({ color: 0xffff00 }));
            m.rotation.x = (Math.PI / 180) * -90;
            m.rotation.z = (Math.PI / 180) * -90;
            m.rotation.y = (Math.PI / 180) * -180;
            m.position.y = Math.max(this.l, this.h, this.w) / 2;
            return m;
        };
        const roof_before = create();
        const roof_after = create();
        roof_before.position.z = -this.l / 2;
        roof_after.position.z = this.l / 2;
        roof_before.updateMatrix();
        roof_after.updateMatrix();
        const result = CSG.union(roof_before, roof_after);
        result.castShadow = true;
        result.receiveShadow = true;
        return result;
    }
    constructor(data, houseData) {
        super(data);
        const mesh = new THREE.Mesh(new THREE.BoxGeometry(this.w, this.h, this.l), new THREE.MeshStandardMaterial({ color: 0xeddac5 }));
        const positionY = this.$data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;
        const roof = this.createRoof();
        roof.updateMatrix();
        const result = CSG.subtract(mesh, roof);
        result.position.y = positionY;
        result.castShadow = true;
        result.receiveShadow = true;
        result.position.x = this.position.x / NUMERATOR + this.w / 2 - houseData.l / 2;
        result.position.z = this.position.y / NUMERATOR + this.l / 2 - houseData.w / 2;
        this.g.add(result);
    }
}
export class Type10 extends Base {
    static type = 10;
    static label = "电线";
    static roofHeight = 0.05;
    static ins(data, houseData) {
        return new Type10(data, houseData);
    }
    constructor(data, houseData) {
        super(data);
        const geometry = new THREE.BoxGeometry(this.l, this.w, 0.001);
        const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
        const line = new THREE.Mesh(geometry, material);
        line.rotation.x = (Math.PI / 180) * 90;
        line.rotation.z = (Math.PI / 180) * 90;
        const positionY = this.$data.isRoofInside ? houseData.h / 2 : houseData.h / -2;
        line.position.y = positionY + this.h;
        line.position.x = this.position.x / NUMERATOR + this.w / 2 - houseData.l / 2;
        line.position.z = this.position.y / NUMERATOR + this.l / 2 - houseData.w / 2;
        line.castShadow = true;
        line.receiveShadow = true;
        this.g.add(line);
    }
}
//# sourceMappingURL=obstacle.js.map