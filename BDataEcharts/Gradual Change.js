// Tips:请严格按照Javascript语法进行编写
function onCreatedEventCallBack(currentComponentInstance, ...arg) {
    /**
     * 函数体内的单行注释会在保存的时候删除,如果需要加注释请使用多行注释
     * window.Uidesigner.$refs[组件ID] 可以访问页面上组件实例对象
     * 支持返回Promise对象
     * @param {Object} currentComponentInstance 默认第一参数是当前组件实例对象
     * @param {Array} arg 当前事件剩余参数
     */
    /**
     * 存一份this指针
     */
    const _this = currentComponentInstance
    /**
     * 获取e这个参数
     */
    const _e = _this.$route.query.e

    http.get("XXXXXXXX/prod-api/user/getInfo",
        { headers: { 'Authorization': 'Bearer ' + _e, "content-type": "application/json" } })
        .then(res => {
            var data = res.data;
            var orgName = data.orgName
            http.post("XXXXXXXX", {
                company_name: orgName,
            }, { headers: { 'token': _e, "content-type": "application/json" } })
                .then(res => {
                    var chart = window.Uidesigner.$refs["xaEchartsLine_e20b675d7af4bdd0"]
                        .echartsBase.echartInstance;

                    var data = res.data;
                    var seriesdata = [new Array(), new Array(), new Array()];
                    var xAxisdata = new Array()

                    for (var i = 0; i < data.length; i++) {
                        var temp = data[i];
                        xAxisdata.push(temp["年份"]);
                        seriesdata[0].push(temp["总投资额"]);
                        seriesdata[1].push(temp["专项资金金额"]);
                        seriesdata[2].push(temp["归属xx投资额"]);

                    }
                    var option = {
                        grid: {
                            x: 60
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
                            y: 0,
                            data: ['总投资额', 'xx投资额'],
                            show: true
                        },
                        dataZoom: [
                            {
                                type: 'slider',
                                show: true,
                                xAxisIndex: [0],
                                start: 50,
                                end: 100
                            },
                            {
                                type: 'inside',
                                xAxisIndex: [0],
                                start: 50,
                                end: 100
                            },
                        ],
                        xAxis: {

                            data: xAxisdata,
                            triggerEvent: true,
                            axisTick: {
                                alignWithLabel: true
                            },
                            axisLabel: {
                                x: -10,
                                formatter: '{value}'
                            }
                        },

                        yAxis: {

                            type: 'value',
                            name: '万元',
                            splitLine: {
                                lineStyle: {
                                    type: 'dashed',
                                },
                                show: true
                            },
                            axisTick: true,



                        },
                        series: [
                            {
                                name: '总投资额',
                                type: 'line',
                                /** stack: '总量', 叠加属性*/
                                data: seriesdata[0],
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'linear',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: 'rgba(0, 221, 255)'
                                            }, {
                                                offset: 1, color: 'rgba(77, 119, 255)'
                                            }],

                                            global: false
                                        }
                                    }
                                },
                                smooth: true,
                                markPoint: {
                                    symbol: 'circle',
                                    symbolSize: 1,
                                    symbolOffset: [0, -10],
                                    data: [
                                        {
                                            name: '区间最大值',
                                            type: 'max'
                                        }
                                    ]
                                },
                            },

                            {
                                name: 'xx投资额',
                                type: 'line',

                                data: seriesdata[2],
                                itemStyle: {
                                    normal: {
                                        color: {
                                            type: 'pin',
                                            x: 0,
                                            y: 0,
                                            x2: 0,
                                            y2: 1,
                                            colorStops: [{
                                                offset: 0, color: 'rgba(255, 191, 0)'
                                            }, {
                                                offset: 1, color: 'rgba(224, 62, 76)'
                                            }],

                                            global: false
                                        }
                                    }
                                },
                                smooth: true,
                                markPoint: {
                                    symbol: 'circle',
                                    symbolSize: 1,
                                    symbolOffset: [0, -10],
                                    data: [
                                        {
                                            name: '区间最大值',
                                            type: 'max'
                                        }
                                    ]
                                },
                            }
                        ]

                    };
                    chart.setOption(option);

                    switch (orgName) {
                        case '中国xxx公司':
                            nameShort = 'xx公司'
                            break
                        case '中华xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case '中国xxxx有限公司':
                            nameShort = xx生公司'
                            break
                        case 'xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case '中国xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case '中国xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case 'xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case 'xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case 'xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case 'xx有限公司':
                            nameShort = 'xx公司'
                            break
                        case 'xx有限责任公司':
                            nameShort = 'xx公司'
                            break
                        case 'xx有限公司':
                            nameShort = 'xx资源'
                            break
                    };
                    /**
                     * 图表事件
                     */
                    chart.on('click', function (params) {

                        var param = {
                            ND: params.name,
                            XMDW: "",
                            XMMC: "",
                            current_number: 10,
                            current_page: 1,

                            company_name_short: nameShort,
                            company_name: '中国xx有限公司',

                            implementation_company: "",
                            project_city: "",
                            project_name: "",
                            project_province: "",
                            project_status: "",

                            url: "XXXXXXXXXX"
                        };
                        sessionStorage.setItem("id144", JSON.stringify(param));

                        window.location.hash = "#/perview?id=144&e=" + _e + "&time=" + Math.floor(Math.random());
                    });
                });
        });
}