import * as THREE from "three";
import { NUMERATOR } from "../config";
import { CSG } from "three-csg-ts";

abstract class Base {
  public g: Record<string, any>;
  private data: Record<string, any> = Object.create(null);
  public get $data() {
    return this.data;
  }

  protected w = 0;
  protected h = 0;
  protected l = 0;
  protected position: Record<"x" | "y", number> = Object.create(null);
  protected shape = 0;

  protected constructor(data: Record<string, any>) {
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

  protected get topIdx() {
    return this.shape == 1 ? 1 : 2;
  }
  protected createModel(houseData: Record<string, any>) {
    const handler = this.shape == 1 ? this.cylinder : this.createCube;
    const mesh = handler.call(this, houseData);

    return mesh;
  }

  protected createCube(houseData: Record<string, any>) {
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

  protected cylinder(houseData: Record<string, any>) {
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
  public static type = "default";
  public static label = "默认";
  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new DefType(data, houseData);
  }
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    this.createModel(houseData);
  }
}

export class Type8 extends Base {
  public static type = 8;
  public static label = "女儿墙";
  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type8(data, houseData);
  }
  private texture = new THREE.TextureLoader().load("textures/wall.jpg");
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);

    const mesh = this.createModel(houseData);
    this.texture.wrapS = THREE.RepeatWrapping;
    this.texture.wrapT = THREE.MirroredRepeatWrapping;
    this.l > this.w ? this.texture.repeat.set(this.l * 2, 2) : this.texture.repeat.set(2, this.w * 2);

    mesh.material.forEach((m: any, idx: number) => {
      if (idx == this.topIdx) {
        m.color = new THREE.Color("#150c01");
      } else {
        m.map = this.texture;
      }
    });
  }
}

export class Type0 extends Base {
  public static type = 0;
  public static label = "烟囱";

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type0(data, houseData);
  }
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createModel(houseData);
    const texture = new THREE.TextureLoader().load("textures/wall.jpg");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.MirroredRepeatWrapping;
    texture.repeat.set(this.h * 2, 2);
    mesh.material.forEach((m: any, idx: number) => {
      if (idx == this.topIdx) {
        m.color = new THREE.Color("#150c01");
      } else {
        m.map = texture;
      }
    });
  }
}

export class Type1 extends Base {
  public static type = 1;
  public static label = "太阳能";

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type1(data, houseData);
  }

  private createTop() {
    const r = 0.03;
    const h = Math.min(this.w, this.l);
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 32), new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.5 }));
    mesh.rotation.z = (Math.PI / 180) * 90;
    mesh.position.y = h / 2 + r;

    return mesh;
  }
  private createComponent(v: number) {
    const r = (Math.PI / 180) * v;
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(this.w, Math.abs(this.h / Math.cos(r))),
      new THREE.MeshStandardMaterial({
        color: 0x666666,
        metalness: 0.5,
        roughness: 0.5,
        alphaMap: new THREE.TextureLoader().load("textures/1.jpg"),
        transparent: true,
        side: THREE.DoubleSide,
      })
    );

    mesh.rotation.x = r;
    mesh.position.z = -1 * (v / Math.abs(v)) * Math.abs(Math.sin(r) * this.l);

    return mesh;
  }

  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createModel(houseData);
    const top = this.createTop();
    const body = this.createComponent(-25);
    const bottom = this.createComponent(10);

    mesh.material.forEach((m: any) => {
      m.transparent = true;
      m.opacity = 0;
      m.depthTest = false;
    });

    mesh.add(top, body, bottom);
  }
}

export class Type2 extends Base {
  public static type = 2;
  public static label = "水箱";

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type2(data, houseData);
  }
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createModel(houseData);

    mesh.material.forEach((m: any, idx: number) => {
      if (idx == this.topIdx) {
        m.color = new THREE.Color("#41768b");
      } else {
        m.color = new THREE.Color("#3b7389");
      }
    });
  }
}

export class Type3 extends Base {
  public static type = 3;
  public static label = "树";

  public static LEAF = {
    H: 0.15,
    S: 16,
  };

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type3(data, houseData);
  }

  private createLeaf() {
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
  private createMain(houseData: Record<string, any>) {
    const tree = new THREE.Mesh(new THREE.CylinderGeometry(this.w, this.l, this.h, 32), new THREE.MeshBasicMaterial());
    const positionY = this.$data.isRoofInside ? houseData.h / 2 + this.h / 2 : houseData.h / -2 + this.h / 2;

    tree.castShadow = true;
    tree.receiveShadow = true;

    tree.position.y = positionY;
    tree.position.x = this.position.x / NUMERATOR + this.w / 2 - houseData.l / 2;
    tree.position.z = this.position.y / NUMERATOR + this.l / 2 - houseData.w / 2;
    return tree;
  }

  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
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
  public static type = 4;
  public static label = "电线杆";

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type4(data, houseData);
  }

  private createPoles(n: number) {
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

  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createModel(houseData);
    mesh.add(this.createPoles(2));
  }
}

export class Type5 extends Base {
  public static type = 5;
  public static label = "炮台";

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type5(data, houseData);
  }
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createModel(houseData);
    const plane = new THREE.Mesh(
      new THREE.PlaneGeometry(0.08, Math.min(this.h, 0.12) * 0.9),
      new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load("textures/window.jpg") })
    );
    const position = this.w / 2 + 0.0001;
    const rotations = [0, (Math.PI / 180) * 90, (Math.PI / 180) * 90];
    const createWindow = () => plane.clone();
    const doorHeight = 0.15;

    const doorWidth = Math.min(this.h, 0.25) * 0.9;
    const door = new THREE.Mesh(new THREE.PlaneGeometry(doorHeight, doorWidth), new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, color: 0x000000 }));
    rotations.forEach((r: number, idx: number) => {
      const m = createWindow();
      const result = idx % 2 ? position : -1 * position;
      if (r == 0) {
        m.position.z = result;
      } else {
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
  public static type = 6;
  public static label = "邻居家平屋顶";

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type6(data, houseData);
  }
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createCube(houseData);
    mesh.material.forEach((m: any, idx: number) => {
      m.color = new THREE.Color("#eddac5");
    });
  }
}

export class Type7 extends Base {
  public static type = 7;
  public static label = "洞口";
  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type7(data, houseData);
  }
  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
    super(data);
    const mesh = this.createModel(houseData);
    mesh.material.forEach((m: any, idx: number) => {
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
  public static type = 9;
  public static label = "邻居家斜屋顶";

  public static roofHeight = 0.05;

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type9(data, houseData);
  }

  private createRoof() {
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

  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
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
  public static type = 10;
  public static label = "电线";

  public static roofHeight = 0.05;

  public static ins(data: Record<string, any>, houseData: Record<string, any>) {
    return new Type10(data, houseData);
  }

  protected constructor(data: Record<string, any>, houseData: Record<string, any>) {
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
