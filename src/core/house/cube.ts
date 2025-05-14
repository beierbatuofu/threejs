/// <reference path="../../../node_modules/@types/three/src/Three.d.ts" />
import * as THREE from "three";
import { NUMERATOR } from "../config";
import { EAVE } from "../config";
import { CSG } from "three-csg-ts";

export interface CubeData {
  roofType: number;
  roofHeight: number;
  roofTemplate: number;
  threeOptions: {
    cropRect: Record<string, any>[];
    originRect: {
      long: number;
      point: number[];
      width: number;
      descLine: string[];
    };
  };
}

export default class Cube implements HouseType {
  public group = new THREE.Group();
  public mesh = Object.create(null);

  public get $data() {
    return this.config;
  }

  private defColor = "#eddac5";
  private config = Object.create(null);

  protected constructor(data: CubeData, manager: any) {
    const { roofTemplate } = data;
    //创建房屋
    this.config = this.setConfig(data);
    this.mesh = this.createHouse(this.config.l, this.config.w);
    let mainEave = this.createEave(this.config.eave_l, this.config.eave_w);
    const houseTexture = new THREE.TextureLoader(manager).load("textures/house.jpg");

    houseTexture.wrapS = THREE.RepeatWrapping;
    houseTexture.wrapT = THREE.RepeatWrapping;

    houseTexture.repeat.set(this.$data.w * 2, this.$data.h / 0.2);
    if (roofTemplate != 0) {
      const { cropRect } = data.threeOptions;
      cropRect.forEach((d: Record<string, any>) => {
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
    this.mesh.material.map = houseTexture;

    {
      const { max } = new THREE.Box3().setFromObject(this.mesh);
      const eaveTexture = new THREE.TextureLoader(manager).load("textures/eave.jpg");
      mainEave.material.map = eaveTexture;
      mainEave.position.y = max.y;
      this.group.add(mainEave);
    }
    this.mesh.castShadow = true;
  }

  private createHouse(a: number, b: number) {
    return new THREE.Mesh(new THREE.BoxGeometry(a, this.config.h, b), new THREE.MeshBasicMaterial({ color: new THREE.Color(this.config.c) }));
  }

  private createEave(a: number, b: number) {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(a, this.config.eave_h, b), new THREE.MeshStandardMaterial({ depthTest: false, color: this.config.eave_c }));
    mesh.receiveShadow = true;
    return mesh;
  }

  private setConfig(data: CubeData) {
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

  public static ins(data: CubeData, manager: any) {
    return new Cube(data, manager);
  }
}
