
let items = {};
$.ajax({
	url: "data/bar.json",
	async: false,
	dataType: 'json',
	success: function(data) {
        items = data;
	}
});

Highcharts.chart('container', {

    chart: {
        type: 'column'
    },

    title: {
        text: 'Proportional Deaths and Population Grouped by Race'
    },

    xAxis: {
        categories: ['White', 'Black', 'Hispanic', 'Native Amer.', 'Asian', 'Pac. Islander']
    },

    yAxis: {
        min: 0,
        allowDecimals: true,
        title: {
            text: 'Proportion'
        }
    },

    tooltip: {
        formatter: function () {
            return '<b>' + this.x + '</b><br/>' +
                this.series.name + ': ' + this.y
        }
    },

    plotOptions: {
        column: {
            stacking: 'normal'
        }
    },

    series: [{
        name: 'Population Proportion',
        data: [ parseFloat(items["Population Proportion of Whites"]),
                parseFloat(items["Population Proportion of Blacks"]), 
                parseFloat(items["Population Proportion of Hispanics"]), 
                parseFloat(items["Population Proportion of Native Americans"]), 
                parseFloat(items["Population Proportion of Asians"]), 
                parseFloat(items["Population Proportion of Pacific Islanders"])
            ],
        stack: 'Population',
        color: '#ff0000'
    },{
        name: 'Deaths Proportions',
        data: [ parseFloat(items["Ratio of White Lives Lost"]),
                parseFloat(items["Ratio of Black Lives Lost"]), 
                parseFloat(items["Ratio of Hispanic Lives Lost"]), 
                parseFloat(items["Ratio of Native American Lives Lost"]), 
                parseFloat(items["Ratio of Asian Lives Lost"]), 
                parseFloat(items["Ratio of Pacific Islanders Lives Lost"])],
        stack: 'Deaths',
        color: '#000000'
    }]
});