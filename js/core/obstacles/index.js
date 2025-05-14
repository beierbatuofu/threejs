import * as obstacle from "./obstacle";
import * as THREE from "three";
const map = (function register(o) {
    const m = Object.create(null);
    Object.values(o).map((t) => (m[t.type] = t.ins));
    return m;
})(obstacle);
export default function createObstacle(houseIns, group) {
    return (list) => {
        const obstacleGroup = new THREE.Group();
        list.forEach((item) => {
            let ins = map[item.type];
            if (!ins) {
                //默认障碍物
                ins = map.default;
            }
            const instance = ins(item, houseIns.$data);
            obstacleGroup.add(instance.g);
        });
        group.add(obstacleGroup);
    };
}
//# sourceMappingURL=index.js.map