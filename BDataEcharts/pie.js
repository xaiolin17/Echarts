var option = {
                tooltip: {
                    trigger: 'item',

                    formatter: '{b}:{c}人'
                },
                legend: {
                    show: true,
                    formatter: function (name) {
                        var data = option.series[0].data;
                        var total = 0;
                        var tarValue;
                        for (var i = 0; i < data.length; i++) {
                            total += data[i].value;
                            if (data[i].name == name) {
                                tarValue = data[i].value;
                            }
                        }
                        var v = tarValue;
                        var p = Math.round(((tarValue / total) * 10000) / 100);
                        return `${name} ${v}人 (${p}%)`;
                    },

                },
                series: [
                    {
                        name: '',
                        type: 'pie',
                        color: ['red', '#FFA500'],
                        center: ['50%', '50%'],
                        radius: ['40%', '60%'],
                        minAngle: 5,
                        avoidLabelOverlap: true,

                        emphasis: {
                            label: {
                                show: true,
                                fontSize: '15',
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: true
                        },
                        label: {
                            formatter: '{b}: {c}人',
                            rich: {

                            }
                        },
                        itemStyle: {
                            normal: {
                                shadowColor: '#ECF5FF',
                                shadowBlur: 20,
                                shadowOffsetX: -2,
                                shadowOffsetY: 2
                            }
                        },
                        data: seriesdata
                    }
                ]
            };
            chart.setOption(option);
            chart.on('click', function (params) {
                var param = {
                    start: '',
                    end: '',
                    memberName: '',
                    memberType: params.name,
                    partyBranchName: '',
                    education: '',
                    gender: '',
                    size: 10,
                    current: 1,
                    titleName: params.name + '详情'
                };
                sessionStorage.setItem("id126", JSON.stringify(param));
                window.location.hash = "#/perview?id=126&e=" + _e + "&time=" + Math.floor(Math.random());
            });