import * as THREE from "three";
export default class Ground {
    group = new THREE.Group();
    houseData = Object.create(null);
    static ins(houseData) {
        return new Ground(houseData);
    }
    constructor(houseData) {
        this.houseData = houseData;
        this.group.add(this.createPlace());
    }
    createPlace() {
        const size = Math.max(this.houseData.w, this.houseData.l) * 10;
        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(size, size), new THREE.MeshStandardMaterial({ color: 0xbababa, side: THREE.DoubleSide }));
        mesh.rotation.x = -(Math.PI / 180) * 90;
        mesh.position.y = -this.houseData.h / 2 - 0.01;
        mesh.receiveShadow = true;
        return mesh;
    }
}
//# sourceMappingURL=ground.js.map