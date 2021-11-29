// Tips:请严格按照Javascript语法进行编写
function onCreatedEventCallBack(currentComponentInstance, ...arg) {
    /**
     * 函数体内的单行注释会在保存的时候删除,如果需要加注释请使用多行注释
     * window.Uidesigner.$refs[组件ID] 可以访问页面上组件实例对象
     * 支持返回Promise对象
     * @param {Object} currentComponentInstance 默认第一参数是当前组件实例对象
     * @param {Array} arg 当前事件剩余参数
     */

    var setTop = sessionStorage.getItem("id98_top_sec");

    document.documentElement.scrollTop = setTop ? setTop : 0;

    var position = 0;
    setInterval(function () {
        position = document.documentElement.scrollTop;
        sessionStorage.setItem("id98_top", JSON.stringify(position));

    }, 1500)

    const _this = currentComponentInstance
    const _e = _this.$route.query.e

    function null2str(data) {
        if (typeof data != 'object' || data === null || data === 'null') {
            data = '';
            return data;
        } else {
            for (let x in data) {
                if (data[x] === null || data[x] === 'null') { // 如果是null 把直接内容转为 ''
                    data[x] = '';
                } else {
                    if (Array.isArray(data[x])) { // 是数组遍历数组 递归继续处理
                        data[x] = data[x].map(z => {
                            return null2str(z);
                        });
                    }
                    if (typeof (data[x]) === 'object') { // 是json 递归继续处理
                        data[x] = null2str(data[x])
                    }
                }
            }
            return data;
        }
    };
    var app = {
        "year": '',
        "month": '',
        tab: function () {
            var url = "http://221***/***/***/***Table?year="
                + this.year + "&month=" + this.month + '&business' + 0;
            http.get(url, { headers: { 'token': _e, "content-type": "application/json", "agent": "Nexus" } }
            ).then(res => {
                var data = res.data;
                var datas = new Array();

                for (var i = 0; i < data.length; i++) {
                    var temp = data[i];
                    if (temp.business == 0) {
                        datas = data[i]
                    }
                }
                null2str(datas);
                tableincome.setCurrentValue([datas]);
                tableprofits.setCurrentValue([datas]);
                tableprofit.setCurrentValue([datas]);
                tablebelong.setCurrentValue([datas]);

            })
        },

        chartzcfzldbfx: function (chartid) {

            http.post("http://221.***/***/***/executeQuery", {
                id: 84,
                params: "{\"KJN\":" + this.year + ",\"KJY\":" + this.month + "}"

            },
                { headers: { 'Authorization': 'Bearer ' + _e, "content-type": "application/json", "agent": "Nexus" } })
                .then(res => {
                    var chart = window.Uidesigner.$refs["xaEchartsBar_985d9e15dea7cd7b"]
                        .echartsBase.echartInstance;
                    var data = res.data;
                    /**
                     * 图表信息配置
                     * @param  title 标题，非必填
                     * @param  legend 图例，必填
                     * @param  subtext Y轴单位，非必填
                     * @param  type type=bar 表示柱状图，type=line 表示折线图
                     * @param  barColor 柱子或折线的颜色
                     */
                    var config = {
                        title: "",
                        legend: ['比率'],
                        subtext: "",
                        type: "bar",
                        /** barColor: "#00BFFF" */
                    }
                    /**
                     * 图表数据处理
                     * @param xAxisdata  X轴展示内容
                     * @param seriesdata 展示数据
                     */

                    var seriesdata = new Array();

                    for (var i = 0; i < data.length; i++) {
                        var temp = data[i];
                        seriesdata.push((temp.ratio).replace('%', ''));
                    }

                    var option = {

                        title: {
                            text: config.title,
                            subtext: config.subtext,

                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: ''
                        },
                        legend: {
                            data: config.legend,
                            show: false
                        },

                        xAxis: {
                            data: ['本期累计', '上年同期'],
                            triggerEvent: true,
                            axisTick: {
                                alignWithLabel: true
                            }
                        },

                        yAxis: {
                            name: '',
                            triggerEvent: true,
                            type: 'value',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                formatter: '{value}%'
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    width: 1,
                                    color: 'rgba(102,102,102,0.5)'
                                }
                            }
                        },
                        series: {

                            type: config.type,
                            data: seriesdata,
                            barWidth: 20,
                            itemStyle: {
                                normal: {

                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: 'black',
                                            fontSize: 15
                                        },
                                        formatter: '{c}%',
                                    },
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: 'red'
                                        }, {
                                            offset: 1, color: '#FF7F50'
                                        }],
                                        global: false

                                    }
                                }
                            }

                        }
                    };
                    chart.setOption(option, true);

                    /**
                      * 图表事件
                      */
                    chart.on('click', function (params) {

                        var param = {
                            id: 85,
                            year: app.year,
                            month: app.month,
                            params: "{\"KJN\":" + app.year + ",\"KJY\":" + app.month + "}"
                        };
                        sessionStorage.setItem("id100", JSON.stringify(param));

                        window.location.hash = "#/perview?id=100&e=" + _e + "&time=" + Math.floor(Math.random());
                    });

                })

        },

        chartljzbfx: function (chartid) {

            http.post("http://221.***/***/***/executeQuery", {
                "id": 86,
                "params": "{\"KJN\":" + this.year + ",\"KJY\":" + this.month + "}"

            },
                { headers: { 'Authorization': 'Bearer ' + _e, "content-type": "application/json" } })
                .then(res => {
                    var chart = window.Uidesigner.$refs["xaEchartsBar_4879ffb1356b4cd7"]
                        .echartsBase.echartInstance;
                    var data = res.data;
                    /**
                     * 图表信息配置
                     * @param  title 标题，非必填
                     * @param  legend 图例，必填
                     * @param  subtext Y轴单位，非必填
                     * @param  type type=bar 表示柱状图，type=line 表示折线图
                     * @param  barColor 柱子或折线的颜色
                     */
                    var config = {
                        title: "",
                        legend: ['比率'],
                        subtext: "",
                        type: "bar",
                        barColor: "#5470c6"
                    }


                    var seriesdata = new Array();

                    for (var i = 0; i < data.length; i++) {
                        var temp = data[i];
                        seriesdata.push((temp.ratio).replace('%', ''));

                    }


                    var option = {
                        /** grid: {
                            top: 45,
                            bottom: 60,
                            left: 30,
                            right: 0
                        }, */
                        title: {
                            text: config.title,
                            subtext: config.subtext
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter: ''
                        },
                        legend: {
                            data: config.legend,
                            show: false
                        },

                        xAxis: {
                            data: ['本期累计', '上年同期'],
                            triggerEvent: true,
                            axisTick: {
                                alignWithLabel: true
                            }
                        },

                        yAxis: {
                            name: '',
                            triggerEvent: true,
                            type: 'value',
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                formatter: '{value}%'
                            },
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                    width: 1,
                                    color: 'rgba(102,102,102,0.5)'
                                }
                            }
                        },
                        series: {

                            type: config.type,
                            data: seriesdata,
                            barWidth: 20,
                            itemStyle: {
                                normal: {

                                    label: {
                                        show: true,
                                        position: 'top',
                                        textStyle: {
                                            color: 'black',
                                            fontSize: 15
                                        },
                                        formatter: '{c}%',
                                    },
                                    color: {
                                        type: 'linear',
                                        x: 0,
                                        y: 0,
                                        x2: 0,
                                        y2: 1,
                                        colorStops: [{
                                            offset: 0, color: '#188df0'
                                        },
                                        {
                                            offset: 1, color: '#87CEFA'
                                        },
                                        ],
                                        global: false
                                    }
                                }
                            }

                        }
                    };
                    chart.setOption(option, true);

                    /**
                      * 图表事件
                      */
                    chart.on('click', function (params) {

                        var param = {
                            year: app.year,
                            month: app.month,
                            "id": 87,
                            "params": "{\"KJN\":" + app.year + ",\"KJY\":" + app.month + "}"
                        };
                        sessionStorage.setItem("id101", JSON.stringify(param));

                        window.location.hash = "#/perview?id=101&e=" + _e + "&time=" + Math.floor(Math.random());
                    });
                })

        },

        chartzjqk: function (chartid) {

            http.get("http://221.***/***/***/countBalanceGroupByMonth",
                { headers: { 'token': _e, "content-type": "application/json", "agent": "Nexus" } })
                .then(res => {

                    var chart = window.Uidesigner.$refs["xaEchartsBar_0d4043319f78ad3a"]
                        .echartsBase.echartInstance;
                    var data = res.data;

                    /**
                     * 图表信息配置
                     * @param  title 标题，非必填
                     * @param  legend 图例，必填
                     * @param  subtext Y轴单位，非必填
                     * @param  type type=bar 表示柱状图，type=line 表示折线图
                     * @param  barColor 柱子或折线的颜色
                     */
                    var config = {
                        title: "",
                        legend: ['资金', '贷款'],
                        subtext: "",
                        type: "",
                        /** barColor: "#00BFFF" */
                    }
                    /**
                     * 图表数据处理
                     * @param xAxisdata  X轴展示内容
                     * @param seriesdata 展示数据
                     */

                    var seriesdatacurrent_year = new Array();

                    var seriesdatalast_year = new Array();
                    var seriesdataKJY = new Array();


                    for (var i = 0; i < data.fund.length; i++) {
                        var temp = data.fund[i];

                        seriesdatalast_year.push(temp.balance);
                        seriesdataKJY.push(temp.month);

                    }

                    for (var i = 0; i < data.loan.length; i++) {
                        var temp = data.loan[i];

                        seriesdatacurrent_year.push(temp.yearCumulative);

                    }
                    var option = {

                        grid: {
                            x: 50,
                        },
                        title: {
                            text: '截至昨日资金余额:' + seriesdatalast_year[seriesdatalast_year.length - 1],
                            textStyle: {
                                fontWeight: 'bolder',
                                fontSize: 13,
                            },

                            subtext: '贷款余额：' + seriesdatacurrent_year[seriesdatacurrent_year.length - 1],
                            subtextStyle: {
                                fontWeight: 'bolder',
                                fontSize: 13,
                            },
                            textAlign: 'auto',

                        },

                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {

                                crossStyle: {
                                    color: '#999'
                                },

                            },

                        },
                        legend: {
                            x: 'right',
                            y: 20,
                            data: config.legend,
                            show: true
                        },

                        xAxis: {

                            data: seriesdataKJY,
                            triggerEvent: true,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },

                        yAxis: {
                            type: 'value',
                            name: '',
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                },
                                show: true
                            },
                            axisTick: true,
                            axisLabel: {
                                interval: 2,

                                margin: 2,
                                formatter: function (value) {

                                    return value;
                                },

                            }

                        },
                        series: [
                            {
                                name: '资金',
                                type: 'bar',
                                data: seriesdatalast_year,
                                barMaxWidth: 20,
                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,		//开启显示
                                            position: 'top',	//在上方显示
                                            textStyle: {	    //数值样式
                                                color: 'black',
                                                fontSize: 10
                                            }
                                        },
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#FFD700'
                                            }, {
                                                offset: 1, color: 'yellow'
                                            }],
                                            global: false
                                        }
                                    }
                                }
                            },
                            {
                                name: '贷款',
                                type: 'bar',
                                data: seriesdatacurrent_year,
                                barMaxWidth: 20,

                                itemStyle: {
                                    normal: {
                                        label: {
                                            show: true,		//开启显示
                                            position: 'top',	//在上方显示
                                            textStyle: {	    //数值样式
                                                color: 'black',
                                                fontSize: 10
                                            }
                                        },
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#188df0'
                                            },
                                            {
                                                offset: 1, color: '#87CEFA'
                                            },
                                            ],
                                            global: false
                                        }
                                    }
                                }
                            },

                        ],

                    };

                    chart.setOption(option, true);

                    /**
                      * 图表事件 TODO
                      */
                    chart.on('click', function (params) {
                        var month = params.name.replace('月', '')
                        if (month.length < 2)
                            month = 0 + month
                        if (params.seriesName == '贷款') {
                            var param = {
                                time: app.year + '-' + month,
                                openAccountUnitName: '',
                                status: '',
                                current: 1,
                                size: 10,

                            };
                            sessionStorage.setItem("id153", JSON.stringify(param));
                            window.location.hash = "#/perview?id=153&e=" + _e + "&time=" + Math.floor(Math.random());
                        }
                        else {
                            var param = {
                                time: app.year + '-' + month,
                                openAccountUnitName: '',
                                status: '',
                                current: 1,
                                size: 10,
                                url: "http://221.***/***/***/getBankAndBalanceDetails"
                            };
                            sessionStorage.setItem("id150", JSON.stringify(param));
                            window.location.hash = "#/perview?id=150&e=" + _e + "&time=" + Math.floor(Math.random());
                        }

                    });
                })

        },

        chartsxfyzl: function (chartid) {
            http.post("http://221.***/***/***/executeQuery", {
                id: 82,
                "params": "{\"KJN\":" + this.year + ",\"KJY\":" + this.month + "}"

            },
                { headers: { 'Authorization': 'Bearer ' + _e, "content-type": "application/json" } })
                .then(res => {

                    var chart = window.Uidesigner.$refs["xaEchartsBar_7e8b29951bfcd898"]
                        .echartsBase.echartInstance;
                    var data = res.data;

                    /**
                     * 图表信息配置
                     * @param  title 标题，非必填
                     * @param  legend 图例，必填
                     * @param  subtext Y轴单位，非必填
                     * @param  type type=bar 表示柱状图，type=line 表示折线图
                     * @param  barColor 柱子或折线的颜色
                     */
                    var config = {
                        title: "",
                        legend: ['三项费用', '上年同期', '三项费用率'],
                        subtext: "",
                        type: "",
                        /** barColor: "#00BFFF" */
                    }
                    /**
                     * 图表数据处理
                     * @param xAxisdata  X轴展示内容
                     * @param seriesdata 展示数据
                     */

                    var seriesdatacurrent_year = new Array();
                    var seriesdatalast_year = new Array();
                    var seriesdataKJY = new Array();
                    var seriesdataratio = new Array();
                    var xAxisdata = new Array();
                    var tip = new Array();

                    for (var i = 0; i < data.length; i++) {
                        var temp = data[i];
                        seriesdatacurrent_year.push(temp.current_year_cumulative.replace(',', ''));
                        seriesdatalast_year.push(temp.last_year_contemporaneous.replace(',', ''));
                        seriesdataKJY.push(temp.month + '月');
                        seriesdataratio.push((temp.current_period).replace('%', ''));

                    }

                    var option = {

                        grid: {
                            x: 50,
                        },
                        title: {
                            text: config.title,
                            subtext: config.subtext
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {

                                crossStyle: {
                                    color: '#999'
                                },

                            },

                        },
                        legend: {
                            x: 'right',
                            y: 20,
                            data: config.legend,
                            show: true
                        },
                        dataZoom: [
                            {
                                type: 'slider',
                                show: true,
                                xAxisIndex: [0],
                                start: 1,
                                end: 100
                            },
                            {
                                type: 'inside',
                                xAxisIndex: [0],
                                start: 1,
                                end: 100
                            },
                        ],
                        xAxis: {

                            data: seriesdataKJY,
                            triggerEvent: true,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },

                        yAxis: [
                            {
                                type: 'value',
                                name: '万元',
                                splitLine: {
                                    lineStyle: {
                                        type: 'dashed',
                                    },
                                    show: true
                                },
                                axisTick: true,
                                axisLabel: {
                                    interval: 1,

                                    margin: 2,
                                    formatter: function (value) {

                                        return value;
                                    },

                                }

                            },
                            {
                                type: 'value',
                                name: '',
                                interval: 20,
                                axisTick: {
                                    show: false,
                                },
                                splitLine: {
                                    show: false
                                },
                                axisLabel: {
                                    formatter: '{value}%'
                                }
                            }
                        ],
                        series: [
                            {
                                name: '三项费用',
                                type: 'bar',
                                data: seriesdatacurrent_year,
                                barMaxWidth: 20,
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#188df0'
                                            },
                                            {
                                                offset: 1, color: '#87CEFA'
                                            },
                                            ],
                                            global: false

                                        }
                                    }
                                }
                            },
                            {
                                name: '上年同期',
                                type: 'bar',
                                data: seriesdatalast_year,
                                barMaxWidth: 20,
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: '#FFD700'
                                            }, {
                                                offset: 1, color: 'yellow'
                                            }],
                                            global: false
                                        }
                                    }
                                }
                            },
                            {
                                name: '三项费用率',
                                type: 'line',
                                yAxisIndex: 1,
                                data: seriesdataratio,
                                color: ["#00ae9d"]
                            }
                        ],

                    };

                    chart.setOption(option, true);
                    /**
                      * 图表事件
                      */
                    chart.on('click', function (params) {

                        var paramname = (params.name).replace('月', '');
                        var param = {
                            year: app.year,
                            month: paramname,
                            id: 83,
                            "params": "{\"KJN\":" + app.year + ",\"KJY\":" + paramname + "}"
                        };
                        sessionStorage.setItem("id98", JSON.stringify(param));

                        window.location.hash = "#/perview?id=102&e=" + _e + "&time=" + Math.floor(Math.random());
                    });
                })


        },

        chartjzsyyhkhs: function (chartid) {
            http.get("http://221.***/***/***/***",
                { headers: { 'token': _e, "content-type": "application/json", "agent": "Nexus" } })
                .then(res => {

                    var chart = window.Uidesigner.$refs["xaEchartsLine_e6b07095cc75782f"]
                        .echartsBase.echartInstance;
                    var data = res.data.resultList;

                    /**
                     * 图表信息配置
                     * @param  title 标题，非必填
                     * @param  legend 图例，必填
                     * @param  subtext Y轴单位，非必填
                     * @param  type type=bar 表示柱状图，type=line 表示折线图
                     * @param  barColor 柱子或折线的颜色
                     */
                    var config = {
                        title: "",
                        legend: [''],
                        subtext: "",
                        type: "line",
                        barColor: "#00BFFF"
                    }
                    /**
                     * 图表数据处理
                     * @param xAxisdata  X轴展示内容
                     * @param seriesdata 展示数据
                     */


                    var seriesdatax = new Array();
                    var seriesdatatotalNum = new Array();


                    for (var i = 0; i < data.length; i++) {
                        var temp = data[i];

                        seriesdatax.push(temp.month);
                        seriesdatatotalNum.push(temp.totalNum);

                    }

                    var option = {

                        grid: {
                            x: 50,
                        },
                        title: {
                            text: config.title,
                            subtext: config.subtext
                        },
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {

                                crossStyle: {
                                    color: '#999'
                                },

                            },

                        },
                        legend: {
                            x: 'right',
                            y: 20,
                            data: config.legend,
                            show: true
                        },
                        dataZoom: [
                            {
                                type: 'slider',
                                show: true,
                                xAxisIndex: [0],
                                start: 1,
                                end: 100
                            },
                            {
                                type: 'inside',
                                xAxisIndex: [0],
                                start: 1,
                                end: 100
                            },
                        ],
                        xAxis: {

                            data: seriesdatax,
                            triggerEvent: true,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },

                        yAxis: {
                            type: 'value',
                            name: '户',
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                },
                                show: true
                            },
                            axisTick: true,
                            axisLabel: {
                                interval: 0,

                                margin: 2,
                                formatter: function (value) {

                                    return value;
                                },

                            }

                        },

                        series: {

                            type: config.type,
                            data: seriesdatatotalNum,
                            "barWidth": 20,
                            "itemStyle": {
                                "normal": {

                                    "label": {
                                        "show": "true",
                                        "position": "top",
                                        "textStyle": {
                                            "color": "black",
                                            "fontSize": "12"
                                        },
                                        formatter: '{c}',
                                    },
                                    "color": config.barColor
                                }
                            }

                        }


                    };

                    chart.setOption(option, true);

                    /**
                      * 图表事件 TODO
                      */
                    chart.on('click', function (params) {
                        var month = params.name.replace('月', '')
                        if (month.length < 2)
                            month = 0 + month
                        var param = {
                            time: app.year + '-' + month,
                            openAccountUnitName: '',
                            current: 1,
                            size: 10,
                            url: "http://221.122.74.207:8972/server/fund/getOpenBankDetails"
                        };
                        sessionStorage.setItem("id149", JSON.stringify(param));
                        window.location.hash = "#/perview?id=149&e=" + _e + "&time=" + Math.floor(Math.random());
                    });
                })

        },

        chartylnl: function (chartid) {
            http.post("http://***/***/***/***", {
                kjbm: '0002',
                hybm: '0000',
                month: this.month,
                year: this.year,

            }, { headers: { 'token': _e, "content-type": "application/json" } }
            ).then(res => {
                var chart = window.Uidesigner.$refs["xaEchartsRadar_c9689b7740c3abc9"]
                    .echartsBase.echartInstance;
                var data = res.data;
                var seriesdata = new Array();
                let max = 0;
                let min = 0;
                data.forEach(item => {
                    item.value = (item.value);
                    max = max >= item.value ? max : item.value
                    min = min <= item.value ? min : item.value
                    seriesdata.push({
                        name: item.index,
                        value: item.value.toFixed(4),
                    })
                })
                seriesdata.forEach(item => {
                    item.max = max,
                        item.min = min
                })

                var newArr = new Array();
                var i = -1;
                strname = '盈利能力';
                chart.setOption(app.gaugeOption(seriesdata, newArr, i, strname), true);

                chart.on('click', function (params) {
                    var param = {
                        year: app.year,
                        month: app.month,
                        hymc: "***再生",
                        kjbm: "0002",
                    };
                    sessionStorage.setItem("id119", JSON.stringify(param));
                    window.location.hash = "#/perview?id=119&e=" + _e + "&time=" + Math.floor(Math.random());
                });
            });

        },

        chartyynl: function (chartid) {
            http.post("http://221.***/***/***/***", {
                kjbm: '0002',
                hybm: '0000',
                month: this.month,
                year: this.year,

            }, { headers: { 'token': _e, "content-type": "application/json" } }
            ).then(res => {
                var chart = window.Uidesigner.$refs["xaEchartsRadar_78cdcd74cc7ed48e"]
                    .echartsBase.echartInstance;
                var data = res.data;
                var seriesdata = new Array();
                var newArr = new Array();
                let max = 0;
                let min = 0;
                data.forEach(item => {
                    item.value = (item.value);
                    max = max >= item.value ? max : item.value
                    min = min <= item.value ? min : item.value
                    seriesdata.push({
                        name: item.index,
                        value: item.value.toFixed(4),
                    })
                })
                seriesdata.forEach(item => {
                    item.max = max,
                        item.min = min
                })

                var i = -1;
                strname = '运营能力';
                chart.setOption(app.gaugeOption(seriesdata, newArr, i, strname), true);

                /**
                 * 图表事件
                */
                chart.on('click', function (params) {
                    var param = {
                        year: app.year,
                        month: app.month,
                        hymc: "中再生",
                        kjbm: "0002",
                    };
                    sessionStorage.setItem("id120", JSON.stringify(param));

                    window.location.hash = "#/perview?id=120&e=" + _e + "&time=" + Math.floor(Math.random());
                });
            });

        },

        chartcznl: function (chartid) {
            http.post("http://221.***/***/***/***", {
                kjbm: '0002',
                hybm: '0000',
                month: this.month,
                year: this.year,

            }, { headers: { 'token': _e, "content-type": "application/json" } }
            ).then(res => {
                var chart = window.Uidesigner.$refs["xaEchartsRadar_8287aacd58ebe3d2"]
                    .echartsBase.echartInstance;
                var data = res.data;

                var seriesdata = new Array();
                let max = 0;
                let min = 0;
                data.forEach(item => {
                    item.value = (item.value);
                    max = max >= item.value ? max : item.value
                    min = min <= item.value ? min : item.value
                    seriesdata.push({
                        name: item.index,
                        value: item.value.toFixed(4),
                    })
                })
                seriesdata.forEach(item => {
                    item.max = max,
                        item.min = min
                })
                var newArr = new Array();
                var i = -1;
                strname = '偿债能力';
                chart.setOption(app.gaugeOption(seriesdata, newArr, i, strname), true);

                chart.on('click', function (params) {
                    var param = {
                        year: app.year,
                        month: app.month,
                        hymc: "***再生",
                        kjbm: "0002",
                    };
                    sessionStorage.setItem("id121", JSON.stringify(param));

                    window.location.hash = "#/perview?id=121&e=" + _e + "&time=" + Math.floor(Math.random());
                });
            });
        },

        chartfznl: function (chartid) {
            http.post("http://221.***/***/***/***", {
                kjbm: '0002',
                hybm: '0000',
                month: this.month,
                year: this.year,

            }, { headers: { 'token': _e, "content-type": "application/json" } }
            ).then(res => {
                var chart = window.Uidesigner.$refs["xaEchartsRadar_10a556a9ef0991d3"]
                    .echartsBase.echartInstance;
                var data = res.data;

                var seriesdata = new Array();
                let max = 0;
                let min = 0;
                data.forEach(item => {
                    item.value = (item.value);
                    max = max >= item.value ? max : item.value
                    min = min <= item.value ? min : item.value
                    seriesdata.push({
                        name: item.index,
                        value: item.value.toFixed(4),
                    })
                })
                seriesdata.forEach(item => {
                    item.max = max,
                        item.min = min
                })
                var newArr = new Array();
                var i = -1;
                strname = '发展能力';
                chart.setOption(app.gaugeOption(seriesdata, newArr, i, strname), true);
                chart.on('click', function (params) {
                    var param = {
                        year: app.year,
                        month: app.month,
                        hymc: "***再生",
                        kjbm: "0002",
                    };
                    sessionStorage.setItem("id122", JSON.stringify(param));
                    window.location.hash = "#/perview?id=122&e=" + _e + "&time=" + Math.floor(Math.random());
                });
            });
        },
        gaugeOption: function (seriesdata, newArr, i, strname) {
            var option = {
                color: ['#ffff00'],
                tooltip: {
                    confine: true,
                    trigger: 'item',
                    backgroundColor: 'rgba(50,50,50,0.8)',
                    textStyle: {
                        color: 'rgba(255,255,255,.8)'
                    },
                    formatter: function (params) {
                        let str = strname + '<br />'
                        seriesdata.forEach(item => {
                            str += item.name + '：' + item.value + '%' + '<br />';
                        })
                        return str
                    }

                },
                calculable: true,
                radar: {
                    radius: 90,
                    splitNumber: 4,
                    indicator: seriesdata,
                    nameGap: 20,
                    splitArea: {
                        areaStyle: {
                            opacity: 0.8,
                            color: ['rgba(0, 255, 255, 0.4)',
                                'rgba(0, 255, 255, 0.3)',
                                'rgba(0, 255, 255, 0.2)',
                                'rgba(0, 255, 255, 0.1)'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.8)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.8)'
                        }
                    },
                    name: {
                        textStyle: {
                            color: '#000000',
                            fontSize: 13,
                            fontWeight: 'bolder'
                        },
                        rich: {
                            a: {
                            },
                            b: {
                                align: 'center',
                            }
                        },
                        formatter: function (params) {

                            var data = option.series[0].data;
                            i++;
                            newArr = data[0].value

                            return `{a|${params}}\n{b|${newArr[i]}%}`
                        },
                    },

                },
                lineStyle: {
                    color: 'yellow',
                    width: 1,
                },
                series: [{
                    name: strname,
                    type: 'radar',
                    data: [{
                        value: seriesdata.map((el, i) => {
                            return el.value
                        }),
                        color: 'rgba(255,228,52,0.5)',
                        areaStyle: {
                            normal: {
                                color: 'rgba(255, 255, 0, 0.3)'
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    color: 'rgba(30,159,255,1)',
                                    fontWeight: 800,

                                },
                            }

                        }

                    }]
                }]

            };
            return option;
        }
    };

    var tableincome = window.Uidesigner.$refs["xaTable_673ddc1a1b9fad40"];
    var tableprofits = window.Uidesigner.$refs["xaTable_1a2cde89ddca9d88"];
    var tableprofit = window.Uidesigner.$refs["xaTable_b9b56ea4f77b6e86"];
    var tablebelong = window.Uidesigner.$refs["xaTable_6cd20c771e95d0a9"];

    var param = sessionStorage.getItem("id98_date");
    param = JSON.parse(param);

    if (param == undefined || param == null) {
        var url = "http://221*********/***/***/get***"
        http.get(url, { headers: { 'token': _e, "content-type": "application/json", "agent": "Nexus" } }
        ).then(res => {
            var data = res.data;
            param = {
                "year": data.split('-')[0],
                "month": data.split('-')[1],
            }

            sessionStorage.setItem("id98_date", JSON.stringify(param));
            window.Uidesigner.$refs["xaDatePicker_9f48aeb08a769a01"]
                .setCurrentValue(param.year + "-" + param.month);
            app.year = param.year;
            app.month = param.month;
            app.tab();
            app.chartzcfzldbfx();
            app.chartljzbfx();
            app.chartzjqk();
            app.chartsxfyzl();
            app.chartjzsyyhkhs();
        })
    } else {
        var date = window.Uidesigner.$refs["xaDatePicker_9f48aeb08a769a01"]
            .setCurrentValue(param.year + "-" + param.month);
        app.year = param.year;
        app.month = param.month;
        app.tab();

        app.chartzcfzldbfx();
        app.chartljzbfx();
        app.chartzjqk();
        app.chartsxfyzl();
        app.chartjzsyyhkhs();
    }
}