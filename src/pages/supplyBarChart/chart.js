import React from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { miliSecondsToTime, timeToMiliSeconds } from "../../helpers";

const Chart = ({powerSources}) => {
  let data = [];
  // let categories = []

  console.log("Time1 ---->   ", +new Date());

  let mainData = {};
  for (let i = 0; i<powerSources.data.data.length; i++ ){
    if (i===0){
      const firstDate = powerSources.data.data[i].date;
      mainData[firstDate] = [powerSources.data.data[i]];
    }
    else{
      if(powerSources.data.data[i].date !== powerSources.data.data[i-1].date){
        const secondDate = powerSources.data.data[i].date;
        mainData[secondDate] = [powerSources.data.data[i]];
      }else{
        const thirdDate = powerSources.data.data[i].date;
        mainData[thirdDate].push(powerSources.data.data[i]);
      }
    }
    // !categories.includes(powerSources.data.data[i].date) && categories.push(powerSources.data.data[i].date);
  }

  const types = [
    { name: "Main", color: "#B798F5" },
    { name: "Solar", color: "#02E10C" },
    { name: "DG", color: "#403F3D" },
    { name: "Battery", color: "#FDE602" },
    { name: "Solar+Battery", color: "#86B0FF" },
    { name: "Battery+Solar", color: "#86B0FF" },
    { name: "Main+Solar", color: "#7243D0" },
    { name: "Main+Battery", color: "#32864B" },
    { name: "Main+Solar+Battery", color: "#8BC486" },
    { name: "DG+Battery", color: "#FF00FF" },
    { name: "DG+Solar+Battery", color: "#00FFFF" },
    { name: "DG+Battery+Solar", color: "#00FFFF" },
    { name: "Undetermined", color: "#BBE3FD" },
    { name: "", color: "#FFFFFF" },
  ];
  
  Object.keys(mainData).forEach((key, index) => {
    mainData[key].forEach((source) => {
      const beforeTime = timeToMiliSeconds(
        source["minute_window"].split(" ")[1].split("+")[0]
      );
      const typeItem = types.find(
        (item) => item.name === source.sourceTag
      );
      const duration = 300000;
      const afterTime = beforeTime + duration;
      data.push({
        name: typeItem.name,
        value: [
          index,
          beforeTime,
          afterTime,
          source["minute_window"].split("+")[0],
        ],
        itemStyle: {
          color: typeItem.color,
        },
      });
    });
  });
  // categories.forEach(function (category, index) {
  //   for (let i = 0; i<powerSources.data.data.length; i++) {
      // const beforeTime = timeToMiliSeconds(powerSources.data.data[i]["minute_window"].split(' ')[1].split('+')[0]);
      // if (category === powerSources.data.data[i].date) {
      //   const typeItem = types.find(
      //     (item) => item.name === powerSources.data.data[i].sourceTag
      //   );
      //   const duration = 300000;
      //   const afterTime = beforeTime + duration;
      //   data.push({
      //     name: typeItem.name,
      //     value: [index, beforeTime , afterTime, powerSources.data.data[i]["minute_window"].split('+')[0]],
      //     itemStyle: {
      //       color: typeItem.color,
      //     },
      //   });
      // }
  //   }
  // });
  console.log("Time2 ---->   ", +new Date());
  
  function renderItem(params, api) {
    const categoryIndex = api.value(0);
    const start = api.coord([api.value(1), categoryIndex]);
    const end = api.coord([api.value(2), categoryIndex]);
    const height = api.size([0, 1])[1] * 0.6;
    const rectShape = echarts.graphic.clipRectByRect(
      {
        x: start[0],
        y: start[1] - height / 2,
        width: end[0] - start[0],
        height: height,
      },
      {
        x: params.coordSys.x,
        y: params.coordSys.y,
        width: params.coordSys.width,
        height: params.coordSys.height,
      }
    );
    return (
      rectShape && {
        type: "rect",
        transition: ["shape"],
        shape: rectShape,
        style: {
          fill: api.visual('color')
        }
      }
    );
  }
  const option = {
    tooltip: {
      formatter: function (params) {
        return params.marker + params.name + ": " + params.value[3];
      },
    },
    title: {
      text: "Power Sources",
      left: "center",
    },
    dataZoom: [
      {
        type: "slider",
        filterMode: "weakFilter",
        showDataShadow: false,
        top: 400,
        labelFormatter: "",
      },
      {
        type: "inside",
        filterMode: "weakFilter",
      },
    ],
    grid: {
      height: 300,
    },
    xAxis: {
      scale: true,
      axisLabel: {
        formatter: function (val) {
          if(val<=timeToMiliSeconds("23:55:00")){
            return miliSecondsToTime(val);
          }
        },
      },
    },
    yAxis: {
      name: "Date",
      data: Object.keys(mainData),
    },
    series: [
      {
        type: "custom",
        renderItem: renderItem,
        itemStyle: {
          opacity: 0.8,
        },
        encode: {
          x: [1, 2],
          y: 0,
        },
        data: data,
      },
    ],
  };

  return <>
  <ReactECharts option={option} style={{ height: 500 }} />
  {console.log(powerSources.data.data)}
  </>
}

export default Chart;