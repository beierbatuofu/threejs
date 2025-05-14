import * as THREE from "three";
import { NUMERATOR } from "../config";
export default class Tree {
    houseData;
    static ins(list, houseData) {
        return new Tree(list, houseData);
    }
    static LEAF = {
        R: 0.2,
        H: 0.4,
        S: 8,
    };
    defConf = {
        x: -3.4,
        y: 0,
        height: 15000,
    };
    group = new THREE.Group();
    createTree(conf) {
        const scale = 0.8;
        const len = Math.ceil(conf.height / NUMERATOR / (Tree.LEAF.H * scale));
        const list = [];
        const group = new THREE.Group();
        for (let i = 0; i < len - 1; i++) {
            const m = new THREE.Mesh(new THREE.ConeGeometry(Tree.LEAF.R * (((i + 1) / len) * 2 + 1), Tree.LEAF.H, Tree.LEAF.S), new THREE.MeshLambertMaterial({ color: 0x00721a }));
            m.position.y = -1 * i * Tree.LEAF.H * scale;
            m.castShadow = true;
            list.push(m);
        }
        const tree_height = Tree.LEAF.H * scale;
        const tree = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, tree_height, 6), new THREE.MeshBasicMaterial({ color: 0x6a4d00 }));
        const last_leaf = list[list.length - 1];
        tree.position.y = last_leaf.position.y - tree_height / 2;
        group.add(...list);
        group.add(tree);
        group.position.set(conf.x, this.houseData.h / -2 - tree.position.y + tree_height / 2, conf.y);
        return group;
    }
    constructor(list, houseData) {
        this.houseData = houseData;
        list.map((c) => {
            const conf = { ...this.defConf, ...c };
            const g = this.createTree(conf);
            this.group.add(g);
        });
    }
}
//# sourceMappingURL=tree.js.map