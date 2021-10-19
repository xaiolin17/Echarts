var data = res.data;
        var seriesdata = [new Array(), new Array(), new Array()];
        var xAxisdata = new Array()

        for (var i = 0; i < data.length; i++) {
            var temp = data[i];
            xAxisdata.push(temp["年份"]);
            seriesdata[0].push(temp["总投资额"]);
            seriesdata[1].push(temp["专项资金金额"]);
            seriesdata[2].push(temp["归属XXX投资额"]);

        }
        var option = {
            grid: {
                top: 50,

                bottom: 40,

                right: 0
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
                data: ['总投资额', '专项资金金额', 'XXX投资额'],
                show: true
            },
            dataZoom: [
                {
                    type: 'slider',
                    show: true,
                    xAxisIndex: [0],
                    start: 1,
                    end: 50
                },
                {
                    type: 'inside',
                    xAxisIndex: [0],
                    start: 1,
                    end: 50
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
                axisLabel: {
                    interval: 'auto',
                    rotate: 0,
                    margin: 43,
                    formatter: function (value) {

                        return value;
                    },

                }

            },
            series: [
                {
                    name: '总投资额',
                    type: 'line',
                    /** stack: '总量', 叠加属性*/
                    data: seriesdata[0],
                    color: '#ee6666',
                    smooth: true
                },
                {
                    name: '专项资金金额',
                    type: 'line',
                    /** stack: '总量', 叠加属性*/
                    data: seriesdata[1],
                    color: '#02cde6',
                    smooth: true
                },
                {
                    name: 'XXX投资额',
                    type: 'line',
                    /** stack: '总量', 叠加属性*/
                    data: seriesdata[2],
                    color: '#5470c6',
                    smooth: true
                }
            ]

        };
        chart.setOption(option);
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
                url: "http://xxxx/server/p/inv-ndtzetj-ct"
            };
            sessionStorage.setItem("id83", JSON.stringify(param));

            window.location.hash = "#/perview?id=83&e=" + _e + "&time=" + Math.floor(Math.random());
        });
