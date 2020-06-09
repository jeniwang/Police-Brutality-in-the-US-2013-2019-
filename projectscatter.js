let items = {};
$.ajax({
	url: "data/scatter.json",
	async: false,
	dataType: 'json',
	success: function(data) {
        items = data;
	}
});


$(function () {
    var chart;
    $(document).ready(function() {
        chart = new Highcharts.Chart({
            chart: {
                renderTo: 'container',
                type: 'scatter',
                zoomType: 'xy'
            },
            title: {
                text: 'Ratio of Blacks Killed By Police vs Violent Crime Rate By Police Dept'
            },
            subtitle: {
                text: 'Data Source: Mapping Police Violence'
            },
            xAxis: {
                title: {
                    enabled: true,
                    text: 'Police Dept'
                },
                categories: items["PD"]
                
            },
            yAxis: {
                max: 130, 
                title: {
                    text: 'Ratio'
                }
            },
            tooltip: {
                formatter: function() {
                        return ''+
                        this.x +' PD, '+ this.y +' %';
                }
            },
            legend: {
                layout: 'vertical',
                align: 'left',
                verticalAlign: 'top',
                x: 100,
                y: 40,
                floating: true,
                backgroundColor: Highcharts.defaultOptions.chart.backgroundColor,
                borderWidth: 1},
            plotOptions: {
                scatter: {
                    marker: {
                        radius: 5,
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                }
            },
            series: [{
                name: 'Black Deaths by Police',
                color: 'rgb(223, 83, 83)',
                data: items["Ratio of BLL"]
    
            }, {
                name: 'Violent Crimes',
                color: 'rgb(0, 0, 0)',
                data: items["Violent Crime Rate"]
            }]
        });
    });
    
});