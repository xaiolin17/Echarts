var data = res.data;

            var seriesdata = new Array();
            var seriesdataw = new Array();
            var seriesdatam = new Array();
            var sexdata = new Array();


            for (var item in data[0]) {
                sexdata.push(item)
            }
            sexdata.splice(2, 1)

            var A = sexdata[0];
            var B = sexdata[1];

            for (var i = 0; i < data.length; i++) {
                var temp = data[i];

                seriesdataw.push(temp[B]);
                seriesdatam.push(temp[A]);
            }

            var c = seriesdatam.concat(seriesdataw);

            let max = Math.max.apply(null, c);
            let min = 0;

            data.forEach(item => {
                seriesdata.push({
                    name: item.desc,
                })
            })

            seriesdata.forEach(item => {
                item.max = max,
                    item.min = min
            })


            var option = {

                tooltip: {
                    confine: true,
                },
                calculable: true,
                color: ['#00BFFF', 'rgba(255,192,203,0.9)'],
                legend: {
                    left: 'right',
                    data: ['男性', '女性']
                },

                radar: {
                    radius: 90,
                    splitNumber: 6,
                    indicator: seriesdata,
                    nameGap: 30,
                    splitArea: {
                        areaStyle: {
                            opacity: 0.8,
                            color: ['rgba(0, 255, 255, 0.6)',
                                'rgba(0, 255, 255, 0.5)',
                                'rgba(0, 255, 255, 0.4)',
                                'rgba(0, 255, 255, 0.3)',
                                'rgba(0, 255, 255, 0.2)',
                                'rgba(0, 255, 255, 0.1)'],
                            shadowColor: 'rgba(0, 0, 0, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.9)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(211, 253, 250, 0.7)'
                        }
                    },
                    name: {
                        textStyle: {
                            color: '#000000',
                            fontSize: 13,
                            fontWeight: 'bolder'
                        },
                    },

                },
                lineStyle: {

                },
                series: [{

                    type: 'radar',
                    data: [
                        {
                            value: seriesdatam,
                            name: '男性',

                            areaStyle: {
                                color: 'rgba(30,144,255, 0.3)'
                            }
                        },
                        {
                            value: seriesdataw,
                            name: '女性',

                            areaStyle: {
                                color: 'rgba(255,192,203, 0.9)'
                            }
                        }
                    ]
                }]

            };
            chart.setOption(option);

            chart.on('click', function (params) {
                var param = {
                    start: '',
                    end: '',
                    memberName: '',
                    memberType: '',
                    partyBranchName: '',
                    education: '',
                    gender: params.name,
                    size: 10,
                    current: 1,
                    titleName: params.name + '**详情'
                };

                sessionStorage.setItem("id126", JSON.stringify(param));
                window.location.hash = "#/perview?id=126&e=" + _e + "&time=" + Math.floor(Math.random());
            });
