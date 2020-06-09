
let items = {};
$.ajax({
	url: "data/piedata.json",
	async: false,
	dataType: 'json',
	success: function(data) {
        items = data;
	}
});

var myChart = 
Highcharts.chart('container', {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Police Killing Ratios by Race'
	},
	
	plotOptions: {
		pie: {
			showInLegend : true,
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		}
	},
    series: [{
        name: 'Deaths',
        colorByPoint: true,
        data: [{
            name: 'Black Deaths',
            y: parseFloat(items["Ratio of Black Lives Lost"]),
            selected : true
        }, {
            name: 'Hispanic Deaths',
            y: parseFloat(items["Ratio of Hispanic Lives Lost"]),
            selected : true
        },
        {
            name: 'Native American Deaths',
            y: parseFloat(items["Ratio of Native American Lives Lost"]),
            selected : true
        },
        {
            name: 'Asian Deaths',
            y: parseFloat(items["Ratio of Asian Lives Lost"]),
            selected : true
        },
        {
            name: 'Pacific Islander Deaths',
            y: parseFloat(items["Ratio of Pacific Islanders Lives Lost"]),
            selected : true
        }, 
        {
            name: 'White Deaths',
            y: parseFloat(items["Ratio of White Lives Lost"]),
            selected : true
        },
        {
            name: 'Unknown Deaths',
            y: parseFloat(items["Ratio of Unknown Race Lives Lost"]),
            selected : true
        },]
    }]
});



var myChart = 
Highcharts.chart('container2', {
	chart: {
		plotBackgroundColor: null,
		plotBorderWidth: null,
		plotShadow: false,
		type: 'pie'
	},
	title: {
		text: 'Population by Race in the US'
    },
    subtitle: {
        text: 'Source: US Census Data'
    },	
	plotOptions: {
		pie: {
			showInLegend : true,
			dataLabels: {
				enabled: true,
				format: '<b>{point.name}</b>: {point.percentage:.1f} %'
			}
		}
	},
    series: [{
        name: 'Population',
        colorByPoint: true,
        data: [{
            name: 'Black',
            y: 0.134,
            selected : true
        }, {
            name: 'Hispanic',
            y: 0.183,
            selected : true
        },
        {
            name: 'Native American',
            y: 0.013,
            selected : true
        },
        {
            name: 'Asian',
            y: 0.059,
            selected : true
        },
        {
            name: 'Pacific Islander',
            y: 0.002,
            selected : true
        }, 
        {
            name: 'White',
            y: 0.604,
            selected : true
        },
        ]
    }]
});
