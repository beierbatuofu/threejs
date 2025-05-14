/// <reference path="../node_modules/@types/three/src/Three.d.ts" />
import createScene from "./core/createScene";
import { mock } from "./data";

/**
 * @description: 创建场景对象
 */
const ctx = createScene(document.getElementById("canvas") as HTMLCanvasElement);
/**
 * shape 0--矩形、1--圆形
 * 0 烟囱 0,1
 * 1 太阳能 0,1
 * 2 水箱 0,1
 * 3 树 1     周围
 * 4 电线杆 1  周围
 * 5 炮台 0
 * 6 平屋顶 0  周围
 * 7 洞口 0,1
 * 8 女儿墙
 * 9 斜屋顶 0  周围
 * 10 电线 0   周围

 */
const aroundTypes = [3, 4, 6, 9, 10];
mock().then((res: any) => {
  const { data } = res;
  //房屋
  const { houseIns, roofIns } = ctx.createHouse(data.stationInfo);

  //支架
  ctx.createSupport(houseIns, data.supportPointInfos);

  //组件
  roofIns.drawComp(data.moduleGroupList);

  ctx.drawObstacle(data.obstacleList);

  {
    const longitude = data.stationInfo.longitude || 121.472579;
    const latitude = data.stationInfo.latitude || 31.231688;
    // 太阳轨迹
    const operation = ctx.createSun(longitude, latitude, houseIns.$data);
    //日期操作
    operation();
  }

  ctx.render();
});

//window窗口改变 事件
window.addEventListener("resize", () => {
  ctx.hanlder();
  ctx.render();
});
//控制器开始事件
ctx.control.addEventListener("start", () => {
  ctx.render();
});
//控制器改变事件
ctx.control.addEventListener("change", () => {
  ctx.render();
});
//控制器改变结束
ctx.control.addEventListener("end", () => {
  ctx.render();
});
