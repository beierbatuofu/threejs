import * as obstacle from "./obstacle";

import * as THREE from "three";
const map = (function register(o: Record<string, any>) {
  const m = Object.create(null);
  Object.values(o).map((t: Record<string, any>) => (m[t.type] = t.ins));
  return m;
})(obstacle);

export default function createObstacle(houseIns: Record<string, any>, group: any) {
  return (list: Record<string, any>[]) => {
    const obstacleGroup = new THREE.Group();
    list.forEach((item: Record<string, any>) => {
      let ins: (...args: any) => any | undefined = map[item.type];
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
