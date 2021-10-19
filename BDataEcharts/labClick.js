// Tips:请严格按照Javascript语法进行编写
function onCreatedEventCallBack(currentComponentInstance, ...arg) {

  const _this = currentComponentInstance
  const _e = _this.$route.query.e

  var load = currentComponentInstance.$loading();

  http.get("http://xxxx/prod-api/user/getInfo",
    { headers: { 'Authorization': 'Bearer ' + _e, "content-type": "application/json" } })
    .then(res => {
      var data = res.data;
      var orgName = data.orgName

      var clicksj = document.getElementById('cLabel_d25cea44c2433fdd');
      var clickjh = document.getElementById('cLabel_88b658cfbbd0a426');

      switch (orgName) {
        case '中国农业生产资料集团公司':
          nemeShort = '中农公司'
          break
        case '中华棉花集团有限公司':
          nemeShort = '中棉公司'
          break
        case '中国再生资源开发有限公司':
          nemeShort = '中再生公司'
          break
        case '新合作商贸连锁集团有限公司':
          nemeShort = '新合作公司'
          break
        case '中国供销电子商务有限公司':
          nemeShort = '电商公司'
          break
        case '中国供销农产品批发市场控股有限公司':
          nemeShort = '农批公司'
          break
        case '中国供销冷链物流有限公司':
          nemeShort = '冷链公司'
          break
        case '中国供销惠农服务有限公司':
          nemeShort = '惠农公司'
          break
        case '中国供销粮油有限公司':
          nemeShort = '粮油公司'
          break
        case '供销集团财务有限公司':
          nemeShort = '财务公司'
          break
        case '新供销产业发展基金管理有限责任公司':
          nemeShort = '基金公司'
          break
        case '中再资源环境股份有限公司':
          nemeShort = '中再资源'
          break
      };

      clicksj.addEventListener('click', function () {
        var param = {
          company_name_short: nemeShort,
          company_name: orgName,
          project_status: '',
          implementation_company: '',
          project_name: '',
          project_province: '',
          project_city: '',
          current_page: 1,
          current_number: 10,
          titleName: '项目投资详情',
          url: 'http://xxxx/server/p/inv-tzjhwcqk-app-ct',
        };
        sessionStorage.setItem("id143", JSON.stringify(param));
        window.location.hash = "#/perview?id=143&e=" + _e + "&time=" + Math.floor(Math.random());
      })

      clickjh.addEventListener('click', function () {
        var param = {
          company_name_short: nemeShort,
          company_name: orgName,
          project_status: '',
          implementation_company: '',
          project_name: '',
          project_province: '',
          project_city: '',
          current_page: 1,
          current_number: 10,
          titleName: '项目投资详情',
          url: 'http://xxxx/server/p/inv-tzjhwcqk-app-ct',
        };
        sessionStorage.setItem("id143", JSON.stringify(param));
        window.location.hash = "#/perview?id=143&e=" + _e + "&time=" + Math.floor(Math.random());
      });

      http.post("http://xxxx/server/p/inv-tzjhwcqk-app", {
        company_name: orgName,
      }, { headers: { 'token': _e, "content-type": "application/json" } })
        .then(res => {
          var data = res.data;

          var yData = ['实际投资', '计划投资']
          var xData = new Array()
          xData.push(parseFloat(data[0].tzje_count.replace(',', '')))
          xData.push(parseFloat(data[0].jhtzje_count.replace(',', '')))

          window.Uidesigner.$refs["cLabel_d25cea44c2433fdd"].options.title = data[0].tzje_count;
          window.Uidesigner.$refs["cLabel_88b658cfbbd0a426"].options.title = data[0].jhtzje_count;

          var chart = window.Uidesigner.$refs["xaEchartsBar_9a91fdc834af5455"].echartsBase.echartInstance;
          var config = {
            text: "",
            legend: [""],
            subtext: "",
            type: "bar",

          }
          /**
            * 图表事件
            */
          chart.on('click', function (params) {

            var param = {
              company_name_short: nemeShort,
              company_name: orgName,
              project_status: '',
              implementation_company: '',
              project_name: '',
              project_province: '',
              project_city: '',
              current_page: 1,
              current_number: 10,
              titleName: '项目投资详情',
              url: 'xxxx/server/p/inv-tzjhwcqk-app-ct'
            };
            sessionStorage.setItem("id143", JSON.stringify(param));

            window.location.hash = "#/perview?id=143&e=" + _e + "&time=" + Math.floor(Math.random());
          });
          var option = {
            "title": {
              "text": config.text,
              "subtext": config.subtext,
            },
            "tooltip": {
              "trigger": "value",
              "axisPointer": {
                "type": "shadow"
              },
              formatter: '{b}: {c}家'
            },

            "legend": {
              "data": config.legend
            },
            "grid": {
              y: 10,
              "left": "3%",
              "right": "4%",

              "containLabel": "true"
            },

            "xAxis": {

              "type": "value",
              "boundaryGap": [
                0,
                0.01
              ],
              axisLabel: {
                showMaxLabel: false
              },
              axisTick: {
                show: false
              },
              axisLine: {
                show: false
              },
              splitLine: {    //网格线
                lineStyle: {
                  type: 'dashed'    //设置网格线类型 dotted：虚线   solid:实线
                },
              },
            },
            "yAxis": {
              name: '',
              "type": "category",
              "data": yData,
              axisTick: {
                show: false
              }
            },
            "series": [
              {
                "name": '万元',
                "type": config.type,
                "barWidth": 20,
                "showBackground": "true",
                "itemStyle": {

                },
                "data": xData,
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
                    color: function (params) {
                      var colorlist = ['#ffd400', '#00BFFF'];
                      return colorlist[params.dataIndex];
                    }


                  }
                }

              }
            ]
          };
          chart.setOption(option);
        }).finally(() => { load.close() })
    });
}
