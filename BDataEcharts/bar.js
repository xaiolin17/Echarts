var data = res.data;

            var seriesdatadydh = new Array();
            var seriesdatazwh = new Array();
            var seriesdatadxzh = new Array();
            var seriesdatadk = new Array();
            var xAxisdata = new Array();
            var legenddata = new Array();

            for (var item in data[0]) {
                legenddata.push(item)
            }

            legenddata.splice(0, 1)
            var A = legenddata[0];
            var B = legenddata[1];
            var C = legenddata[2];
            var D = legenddata[3];

            for (var i = 0; i < data.length; i++) {
                var temp = data[i];
                xAxisdata.push(temp.month);
                seriesdatadydh.push(temp[B]);
                seriesdatazwh.push(temp[A]);
                seriesdatadxzh.push(temp[C]);
                seriesdatadk.push(temp[D]);

            }


            var config = {
                title: "",
                legend: legenddata,
                subtext: "",
                type: "",

            }

            var option = {
                grid: {
                    x: 20,
                    y: 40
                },

                title: {
                    text: '',
                    textStyle: {
                        fontWeight: 'bolder',
                        fontSize: 13,
                    },
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

                    y: 0,
                    data: config.legend,
                    show: true,

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

                    data: xAxisdata,
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
                    name: '次',
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

                    },
                    minInterval: 1,

                },
                series: [
                    {
                        name: '党员大会',
                        type: 'bar',
                        data: seriesdatadydh,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#840228'
                                    },
                                    {
                                        offset: 1, color: '#CD5C5C'
                                    }],
                                    global: false
                                }
                            }
                        }
                    },
                    {
                        name: '支委会',
                        type: 'bar',
                        data: seriesdatazwh,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#f47920'
                                    },
                                    {
                                        offset: 1, color: '	#FFDEAD'
                                    }],
                                    global: false
                                }
                            }
                        }
                    },
                    {
                        name: '党小组会',
                        type: 'bar',
                        data: seriesdatadxzh,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#ffe600'
                                    },
                                    {
                                        offset: 1, color: '#F0E68C'
                                    }],
                                    global: false
                                }
                            }
                        }
                    },
                    {
                        name: '党课',
                        type: 'bar',
                        data: seriesdatadk,
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: '#ed1941'
                                    },
                                    {
                                        offset: 1, color: '#FF6347'
                                    }],
                                    global: false
                                }
                            }
                        }

                    },
                ],

            };
            chart.setOption(option, true);

            /**
              * 图表事件
              */
            chart.on('click', function (params) {

                var year = new Date().getFullYear();
                var month = params.name.replace('月', '')
                if (month.length < 2) { month = 0 + month }
                var queryTime = year + '-' + month;

                var param = {
                    topic: '',
                    activityType: params.seriesName,
                    orgName: '',
                    size: 10,
                    current: 1,
                    queryTime: queryTime,

                };
                sessionStorage.setItem("id125", JSON.stringify(param));

                window.location.hash = "#/perview?id=125&e=" + _e + "&time=" + Math.floor(Math.random());
            });