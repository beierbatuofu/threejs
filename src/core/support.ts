import * as THREE from "three";
import { NUMERATOR, EAVE } from "./config";

export default class Support {
  public group = new THREE.Group();

  constructor(private houseIns: HouseType, private data: Record<string, any>) {
    console.log(this.data);

    this.data.forEach((d: Record<string, any>) => {
      const mesh = this.createCylinder(d.coordinate.x / NUMERATOR, d.coordinate.y / NUMERATOR, d.height / NUMERATOR);
      this.group.add(mesh);
    });
  }

  public static ins(houseIns: HouseType, data: Record<string, any>) {
    return new Support(houseIns, data);
  }

  private createCylinder(x: number, z: number, height: number) {
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, height, 3), new THREE.MeshStandardMaterial({ color: 0x333333, roughness: 0.5, metalness: 0.5 }));
    cylinder.position.x = x - this.houseIns.$data.l / 2;
    cylinder.position.z = z - this.houseIns.$data.w / 2;

    cylinder.position.y = height / 2 + this.houseIns.$data.h / 2 + EAVE.H / 2;
    cylinder.castShadow = true;
    return cylinder;
  }
}
