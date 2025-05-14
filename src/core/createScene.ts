/// <reference path="../../node_modules/@types/three/src/Three.d.ts" />
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import CubeIns from "./house/cube";
import Roof from "./roof";
import Ground from "./ground";
import { FOV, NEAR, FAR, SCENE_BG, CAMERA_POSITION, HEMISPHERE_CONF } from "./config";
import Sun from "./sun";
import Operation from "./operation";
import createObstacle from "./obstacles/index";
import Support from "./support";

/**
 * @description: 创建场景
 * @param {HTMLCanvasElement} dom
 * @return { loadData,render,control} 数据加载，渲染器，控制器
 */
export default (dom: HTMLCanvasElement) => {
  const ctx: Record<string, any> = Object.create(null);
  const manager = new THREE.LoadingManager();

  if (!(dom instanceof HTMLElement) || dom.tagName.toLocaleLowerCase() != "canvas") {
    throw new Error("canvas is null");
  }

  //获取父级dom长宽
  const parentConf = ((obj: Record<string, any>) => {
    Object.defineProperty(obj, "width", {
      get() {
        return (dom.parentNode as HTMLBaseElement).offsetWidth || window.innerWidth;
      },
    });
    Object.defineProperty(obj, "height", {
      get() {
        return (dom.parentNode as HTMLBaseElement).offsetHeight || window.innerHeight;
      },
    });
    return obj;
  })(Object.create(null));

  //创建相机
  const camera = (() => {
    const _m = new THREE.PerspectiveCamera(FOV, parentConf.width / parentConf.height, NEAR, FAR);
    _m.position.set(CAMERA_POSITION.X, CAMERA_POSITION.Y, CAMERA_POSITION.Z);
    return _m;
  })();

  //创建场景
  const scene = (() => {
    const _m = new THREE.Scene();
    _m.background = new THREE.Color(SCENE_BG);
    return _m;
  })();

  //创建灯光
  const hemisphereLight = (function () {
    const _m = new THREE.HemisphereLight(HEMISPHERE_CONF.SC, HEMISPHERE_CONF.EC, HEMISPHERE_CONF.I);
    _m.position.set(0, 10, 0);
    return _m;
  })();

  //创建渲染器
  const renderer = (() => {
    const _m = new THREE.WebGLRenderer({ canvas: dom, antialias: true, logarithmicDepthBuffer: true });
    _m.setSize(parentConf.width, parentConf.height);
    _m.shadowMap.enabled = true;
    _m.shadowMap.type = THREE.PCFSoftShadowMap;
    return _m;
  })();

  //创建控制器
  const control = (ctx.control = (() => {
    const _m = new OrbitControls(camera, renderer.domElement);
    _m.enableDamping = true;
    //TODO
    _m.maxDistance = 15;
    _m.minDistance = 1;
    _m.maxPolarAngle = (Math.PI / 180) * 80;
    _m.minPolarAngle = (Math.PI / 180) * 10;
    _m.enablePan = false;
    return _m;
  })());

  scene.add(camera);
  scene.add(hemisphereLight);

  //渲染器方法
  function render() {
    renderer.render(scene, camera);
  }

  ctx.render = render;
  control.update();
  //窗口缩放方法
  ctx.hanlder = () => {
    //更新摄像头宽高比
    camera.aspect = parentConf.width / parentConf.height;
    //更新摄像机投影矩阵，任何参数改变以后必须调用
    camera.updateProjectionMatrix();
    //更新渲染器宽高
    renderer.setSize(parentConf.width, parentConf.height);
    //更新渲染器像素比
    renderer.setPixelRatio(window.devicePixelRatio);
  };

  const createGroup = (g: any) => {
    return function (...args: Record<"group", any>[]) {
      args.map((item: Record<"group", any>) => g.add(item.group));
      return g;
    };
  };
  const group: any = new THREE.Group();
  const addGroup = (ctx.addGroup = createGroup(group));

  //创建屋体
  ctx.createHouse = function createHouse(station: any) {
    //创建房屋形状
    const houseIns = CubeIns.ins(station, manager);
    //创建场地
    const groundIns = Ground.ins(houseIns.$data);
    //创建屋顶
    const roofIns = Roof.ins(houseIns.$data, manager);
    addGroup(houseIns, roofIns);

    ctx.drawObstacle = createObstacle(houseIns, group);
    scene.add(groundIns.group);
    return {
      houseIns,
      groundIns,
      roofIns,
    };
  };

  ctx.createSupport = function createSupport(houseIns: HouseType, data: Record<string, any>[]) {
    const supportIns = Support.ins(houseIns, data);
    addGroup(supportIns);
  };

  //创建太阳轨迹
  ctx.createSun = function createSun(longitude: number, latitude: number, houseIns$Data: Record<string, any>) {
    const sunIns = Sun.ins(longitude, latitude, houseIns$Data);
    addGroup();
    console.log(sunIns);
    scene.add(sunIns.group);

    //日期操作
    return (els?: Record<string, any>) => {
      const operationIns = Operation.ins(sunIns, els);
      sunIns.init(operationIns).then((now: Date) => {
        operationIns.setElement(now);
        render();
      });
      ctx.onDate = new Function();
      operationIns.events.onChange = ([evt, dateObject, key]: any[]) => {
        render();
        ctx.onDate(evt, dateObject, key);
      };
    };
  };

  scene.add(group);

  //TODO取消动画帧
  ctx.cancelAnimation = () => {
    cancelAnimationFrame(ctx.animationId);
    ctx.animationId = null;
  };

  manager.onLoad = function () {
    render();
  };

  // console.log((group.rotation.y = Math.PI / 2));
  return ctx;
};
