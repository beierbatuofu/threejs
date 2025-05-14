import createScene from "./packages/lib.js";
import { mock } from "./data";

/**
 * @description: 创建场景对象
 */
const ctx = createScene(document.getElementById("canvas"));

mock().then((res) => {
  const { data } = res;
  //房屋
  const { houseIns, roofIns } = ctx.createHouse(data.stationInfo);

  //支架
  ctx.createSupport(houseIns, data.supportPointInfos);
  //组件
  roofIns.drawComp(data.moduleGroupList);
  //障碍物

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
