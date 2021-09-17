var data = res.data;

    var config = {
      text: "",
      legend: [""],
      subtext: "",
      type: "bar",

    }

    const nameArr = ['工资', '保险费用', '福利费用', '工会费用', '培训费用'];
    const seriesdata = [];
    const ratiodata = [];


    for (var i = 0; i < data.length; i++) {
      seriesdata.push((data[i].labor_cost).replace('万', ''))
      ratiodata.push((data[i].ratio).replace('%', ''))
    }

    var option = {
      grid: {
        width: 300,
        x: 55,
        y: 20
      },

      "title": {
        "text": config.text,
        "subtext": config.subtext,
      },
      "tooltip": {
        "trigger": "item",
        "axisPointer": {
          "type": "shadow"
        },
        formatter: '{b}: {c}(万元)'
      },
      "legend": {
        "data": config.legend
      },

      "xAxis": {
        "type": "value",
        name: '万元',
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,

        },
        splitNumber: 4,

        "boundaryGap": [
          0,
          0.01
        ]
      },
      "yAxis": {
        "type": "category",
        "data": nameArr,
        axisTick: {
          show: false,
        },
      },
      "series": [
        {
          "name": config.legend[0],
          "type": config.type,
          "barWidth": 20,
          barMinHeight: 1,
          "showBackground": "true",
          "itemStyle": {

          },
          "data": seriesdata,
          "itemStyle": {
            "normal": {
              "label": {
                "show": "true",      //开启显示
                "position": "right", //在上方显示
                "textStyle": {     //数值样式
                  "color": "black",
                  "fontSize": "12"
                }
              },
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [{
                  offset: 0, color: '#83bff6'
                },
                {
                  offset: 0.5, color: '#188df0'
                },
                {
                  offset: 1, color: '#188df0'
                }],
                global: false
              }
            }
          }

        }
      ]
    };
    chart.setOption(option);

    /**
      * 图表事件
      */