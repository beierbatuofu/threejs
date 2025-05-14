import * as THREE from "three";
import { NUMERATOR, EAVE } from "./config";

export interface dataModulesType {
  column: number;
  coordinates: Record<"m" | "valid" | "x" | "y" | "z", any>[];
  length: number;
  width: number;
  direction: number;
  height: number;
  tiltAngle: number;
  position: 0 | 1 | 2 | 3;
}

export interface ComponentDataType {
  defaultHeight: number;
  groupCol: number;
  groupRow: number;
  liftHeight: number;
  modules: dataModulesType[];
  rowCount: number;
  tiltAngle: number;
  withHorizonta: number;
}

/**
 * @description: 组件底板 ,重写支架support.ts
 */
class Support {
  public group = new THREE.Group();

  private board = Object.create(null);
  private cylinder = Object.create(null);
  private compData = Object.create(null);
  private houseData = Object.create(null);
  private compIns = Object.create(null);
  public static ins(compIns: Component, houseData: Record<string, any>) {
    return new Support(compIns, houseData);
  }

  protected constructor(compIns: Component, houseData: Record<string, any>) {
    this.compData = compIns.$data;
    this.compIns = compIns;
    this.houseData = houseData;
    this.board = this.createBoard();
    //  this.cylinder = this.createCylinder();
    this.group.add(this.board);

    // this.group.add(this.cylinder);
  }
  public static BORAD_H = 0.01;

  private createBoard() {
    const h = Support.BORAD_H;

    const mesh = new THREE.Mesh(new THREE.BoxGeometry(this.compData.w, h, this.compData.l), new THREE.MeshBasicMaterial({ color: 0xdddddd }));
    mesh.position.x = this.compData.x;

    mesh.position.y = this.compData.y + this.houseData.h / 2 + this.houseData.eave_h - h - 0.005;
    mesh.position.z = this.compData.z - Math.cos((Math.PI / 180) * (90 - this.compData.tiltAngle)) * (h + 0.01);

    this.compIns.setRotation(mesh);
    return mesh;
  }

  public static CYLINER = {
    H: 0.01,
    W: 0.01,
  };

  private createCylinder() {
    const _height = this.compData.height + (Math.sin((Math.PI / 180) * this.compData.tiltAngle) * this.compData.l) / 2;
    const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(Support.CYLINER.W, Support.CYLINER.H, _height, 3), new THREE.MeshStandardMaterial({ color: 0xcccccc, roughness: 0.5, metalness: 0.5 }));
    cylinder.position.x = this.compData.x;
    cylinder.position.z = this.compData.z;
    cylinder.position.y = this.houseData.h / 2 + _height / 2 + EAVE.H / 2;
    cylinder.castShadow = true;
    return cylinder;
  }
}
//0北 1南 2西 3东
class Component {
  public static H = 0.02;
  public static ins(data: dataModulesType, manager: any) {
    return new Component(data, manager);
  }
  public mesh = Object.create(null);

  private data = Object.create(null);
  protected constructor(data: dataModulesType, manager: any) {
    this.data = this.setSizeData(data);
    const texture = new THREE.TextureLoader(manager).load("textures/component.png");
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(this.data.w, this.data.h, this.data.l), new THREE.MeshStandardMaterial({ map: texture, metalness: 0.7, roughness: 0.7 }));

    const conf = this.setConf(data, mesh);

    mesh.position.x = conf.x;
    mesh.position.y = conf.y;
    mesh.position.z = conf.z;

    mesh.castShadow = true;
    mesh.receiveShadow = true;

    this.setRotation(mesh);

    mesh.userData["ins"] = this;
    this.mesh = mesh;
  }

  protected setRotation(mesh: Record<string, any>) {
    let { position } = this.data;
    switch (position) {
      case 0:
        mesh.rotation.x = -1 * (Math.PI / 180) * this.data.tiltAngle;
        break;
      case 1:
        mesh.rotation.x = (Math.PI / 180) * this.data.tiltAngle;
        break;
      case 2:
        mesh.rotation.z = (Math.PI / 180) * this.data.tiltAngle;
        break;
      case 3:
        mesh.rotation.z = -1 * (Math.PI / 180) * this.data.tiltAngle;
        break;
      default:
        mesh.rotation.x = (Math.PI / 180) * this.data.tiltAngle;
        break;
    }
  }

  private setConf(data: dataModulesType, mesh: Record<string, any>) {
    const position0 = data.coordinates[0];

    const posOx = position0.x / NUMERATOR;
    const posOy = position0.y / NUMERATOR;
    let y1 = this.$data.height + (Math.sin((Math.PI / 180) * data.tiltAngle) * data.width) / 2 / NUMERATOR;
    let y2 = this.$data.height + (Math.sin((Math.PI / 180) * data.tiltAngle) * data.length) / 2 / NUMERATOR;

    (data.position == 2 || data.position == 3) && ([y1, y2] = [y2, y1]);

    const conf =
      data.direction == 1
        ? {
            x: posOx - (this.$data.l - this.$data.w) / 2,
            z: posOy + (this.$data.l - this.$data.w) / 2,
            y: y1,

            direction: data.direction,
          }
        : {
            x: posOx,
            z: posOy,
            y: y2,

            direction: data.direction,
          };

    this.data = Object.assign(this.data, conf);
    return conf;
  }

  private setSizeData(data: dataModulesType) {
    const params = data.direction != 1 ? { l: data.length, w: data.width } : { w: data.length, l: data.width };
    return {
      l: params.l / NUMERATOR,
      w: params.w / NUMERATOR,
      h: Component.H,
      height: data.height / NUMERATOR,
      tiltAngle: data.tiltAngle,
      position: data.position,
    };
  }

  public get $data() {
    return this.data;
  }
}

export default class Roof {
  public group = new THREE.Group();
  private houseData = Object.create(null);
  private manager = Object.create(null);

  protected constructor(houseData: Record<string, any>, manager: any) {
    this.houseData = houseData;
    this.manager = manager;
  }

  public drawComp(list: ComponentDataType[]) {
    const setOrigin = this.createOrigin(this.houseData, list[0].modules[0]);
    const compGroup = new THREE.Group();
    const supportGroup = new THREE.Group();
    setOrigin(compGroup);
    setOrigin(supportGroup, { y: 0 });

    list.forEach((item: ComponentDataType, index: number) => {
      const { modules } = item;

      modules.forEach((ite: dataModulesType, idx: number) => {
        const compIns = Component.ins({ ...ite, tiltAngle: item.tiltAngle }, this.manager);
        const supportIns = Support.ins(compIns, this.houseData);
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

  private createOrigin(houseData: Record<string, any>, firstCompData: Record<string, any>) {
    const _x = (-1 * houseData.l) / 2 + firstCompData.width / NUMERATOR / 2;
    const _z = (-1 * houseData.w) / 2 + firstCompData.length / NUMERATOR / 2;
    const _y = houseData.h / 2 + houseData.eave_h;

    return function (object: any, position?: any) {
      let x = position?.x ?? _x;
      let y = position?.y ?? _y;
      let z = position?.z ?? _z;

      object.applyMatrix4(new THREE.Matrix4().makeTranslation(x, y, z));
    };
  }

  public static ins(houseData: Record<string, any>, manager: any) {
    return new Roof(houseData, manager);
  }
}
