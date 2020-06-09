
// New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
    center: null, // Can't be array by default anymore
    clip: true, // For map navigation
    states: {
        hover: {
            halo: {
                size: 5
            }
        }
    },
    linkedMap: null, //id of linked map
    dataLabels: {
        enabled: false
    }
}, {
    render: function () {
        var series = this,
            chart = series.chart,
            linkedSeries = chart.get(series.options.linkedMap);
        Highcharts.seriesTypes.pie.prototype.render.apply(series, arguments);
        if (series.group && linkedSeries.is('map')) {
            series.group.add(linkedSeries.group);
        }
    },
    getCenter: function () {
        var options = this.options,
            chart = this.chart,
            slicingRoom = 2 * (options.slicedOffset || 0);
        if (!options.center) {
            options.center = [null, null]; // Do the default here instead
        }
        // Handle lat/lon support
        if (options.center.lat !== undefined) {
            var point = chart.fromLatLonToPoint(options.center);
            options.center = [
                chart.xAxis[0].toPixels(point.x, true) - chart.plotLeft,
                chart.yAxis[0].toPixels(point.y, true) - chart.plotTop
            ];
        }
        // Handle dynamic size
        if (options.sizeFormatter) {
            options.size = options.sizeFormatter.call(this);
        }
        // Call parent function
        var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
        // Must correct for slicing room to get exact pixel pos
        result[0] -= slicingRoom;
        result[1] -= slicingRoom;
        return result;
    },
    translate: function (p) {
        this.options.center = this.userOptions.center;
        this.center = this.getCenter();
        return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
    }
});


var data = [["Alabama", 52.0, 0.0, 0.0, 1.0, 0.0, 73.0, 12.0, 138.0, 0], 
    ["Alaska", 5.0, 1.0, 12.0, 0.0, 0.0, 15.0, 8.0, 41.0, 0], 
    ["Arizona", 31.0, 114.0, 14.0, 0.0, 0.0, 141.0, 43.0, 343.0, 0], 
    ["Arkansas", 28.0, 3.0, 0.0, 1.0, 0.0, 59.0, 12.0, 103.0, 0], 
    ["California", 186.0, 489.0, 7.0, 44.0, 9.0, 333.0, 118.0, 1186.0, 0], 
    ["Colorado", 21.0, 67.0, 5.0, 4.0, 0.0, 97.0, 33.0, 227.0, 0], 
    ["Connecticut", 7.0, 6.0, 0.0, 1.0, 0.0, 19.0, 3.0, 36.0, 0], 
    ["Delaware", 9.0, 0.0, 0.0, 0.0, 0.0, 8.0, 3.0, 20.0, 0], 
    ["District of Columbia", 23.0, 0.0, 0.0, 0.0, 0.0, 1.0, 2.0, 26.0, 0],
    ["Florida", 169.0, 76.0, 0.0, 6.0, 0.0, 242.0, 47.0, 540.0, 0], 
    ["Georgia", 98.0, 13.0, 0.0, 3.0, 0.0, 109.0, 42.0, 265.0, 0], 
    ["Hawaii", 1.0, 4.0, 0.0, 2.0, 22.0, 5.0, 3.0, 37.0, 0], 
    ["Idaho", 1.0, 6.0, 2.0, 0.0, 0.0, 36.0, 3.0, 48.0, 0], 
    ["Illinois", 96.0, 21.0, 0.0, 1.0, 0.0, 49.0, 14.0, 181.0, 0], 
    ["Indiana", 40.0, 6.0, 0.0, 0.0, 0.0, 70.0, 8.0, 124.0, 0], 
    ["Iowa", 6.0, 2.0, 0.0, 0.0, 0.0, 33.0, 4.0, 45.0, 0], 
    ["Kansas", 11.0, 8.0, 0.0, 0.0, 0.0, 49.0, 7.0, 75.0, 0], 
    ["Kentucky", 19.0, 3.0, 1.0, 1.0, 0.0, 86.0, 12.0, 122.0, 0], 
    ["Louisiana", 80.0, 5.0, 0.0, 4.0, 0.0, 49.0, 10.0, 148.0, 0], 
    ["Maine", 1.0, 0.0, 0.0, 0.0, 0.0, 27.0, 3.0, 31.0, 0], 
    ["Maryland", 80.0, 6.0, 0.0, 0.0, 0.0, 32.0, 10.0, 128.0, 0], 
    ["Massachusetts", 15.0, 10.0, 0.0, 1.0, 0.0, 26.0, 4.0, 56.0, 0], 
    ["Michigan", 42.0, 4.0, 0.0, 2.0, 1.0, 56.0, 18.0, 123.0, 0], 
    ["Minnesota", 17.0, 4.0, 5.0, 7.0, 0.0, 50.0, 1.0, 84.0, 0], 
    ["Mississippi", 41.0, 1.0, 1.0, 1.0, 0.0, 51.0, 13.0, 108.0, 0], 
    ["Missouri", 74.0, 5.0, 0.0, 0.0, 2.0, 93.0, 23.0, 197.0, 0], 
    ["Montana", 0.0, 1.0, 5.0, 0.0, 0.0, 28.0, 6.0, 40.0, 0], 
    ["Nebraska", 8.0, 3.0, 2.0, 0.0, 0.0, 22.0, 1.0, 36.0, 0], 
    ["Nevada", 21.0, 30.0, 2.0, 2.0, 0.0, 57.0, 9.0, 121.0, 0], 
    ["New Hampshire", 0.0, 1.0, 0.0, 0.0, 0.0, 16.0, 0.0, 17.0, 0], 
    ["New Jersey", 51.0, 14.0, 0.0, 1.0, 0.0, 26.0, 11.0, 103.0, 0], 
    ["New Mexico", 4.0, 78.0, 6.0, 1.0, 0.0, 41.0, 12.0, 142.0, 0], 
    ["New York", 71.0, 18.0, 0.0, 1.0, 0.0, 53.0, 12.0, 155.0, 0], 
    ["North Carolina", 77.0, 9.0, 1.0, 1.0, 1.0, 104.0, 11.0, 204.0, 0], 
    ["North Dakota", 0.0, 0.0, 4.0, 0.0, 0.0, 7.0, 0.0, 11.0, 0], 
    ["Ohio", 80.0, 2.0, 0.0, 4.0, 0.0, 116.0, 13.0, 215.0, 0], 
    ["Oklahoma", 51.0, 18.0, 12.0, 2.0, 1.0, 123.0, 7.0, 214.0, 0], 
    ["Oregon", 9.0, 9.0, 0.0, 0.0, 0.0, 87.0, 8.0, 113.0, 0], 
    ["Pennsylvania", 58.0, 10.0, 1.0, 1.0, 0.0, 78.0, 23.0, 171.0, 0], 
    ["Rhode Island", 3.0, 1.0, 0.0, 0.0, 0.0, 2.0, 0.0, 6.0, 0], 
    ["South Carolina", 38.0, 2.0, 0.0, 2.0, 0.0, 67.0, 11.0, 120.0, 0], 
    ["South Dakota", 0.0, 1.0, 9.0, 1.0, 0.0, 11.0, 3.0, 25.0, 0], 
    ["Tennessee", 41.0, 5.0, 0.0, 2.0, 0.0, 116.0, 15.0, 179.0, 0], 
    ["Texas", 157.0, 219.0, 1.0, 10.0, 0.0, 258.0, 74.0, 719.0, 0], 
    ["Utah", 8.0, 13.0, 2.0, 0.0, 2.0, 55.0, 2.0, 82.0, 0], 
    ["Vermont", 0.0, 1.0, 1.0, 0.0, 0.0, 9.0, 1.0, 12.0, 0], 
    ["Virginia", 52.0, 7.0, 0.0, 1.0, 0.0, 51.0, 13.0, 124.0, 0], 
    ["Washington", 25.0, 29.0, 12.0, 5.0, 4.0, 116.0, 27.0, 218.0, 0], 
    ["West Virginia", 10.0, 0.0, 0.0, 1.0, 0.0, 51.0, 12.0, 74.0, 0], 
    ["Wisconsin", 27.0, 8.0, 5.0, 4.0, 0.0, 63.0, 4.0, 111.0, 0],
    ["Wyoming", 0.0, 2.0, 2.0, 0.0, 0.0, 12.0, 3.0, 19.0, 0]
    ],
    maxVotes = 0,
    blkColor = 'rgba(220,71,71)',
    hispColor = 'rgba(74,131,240)',
    natColor = 'rgba(255,192,203)',
    asColor = 'rgba(90,200,90)';
    piColor = 'rgba(255,175,70)';
    whiColor = 'rgba(255,192,30)';
    unColor = 'rgba(74,100,240)'


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function (row) {
    maxVotes = Math.max(maxVotes, row[8])+30;
});

// Build the chart
var chart = Highcharts.mapChart('container', {
    title: {
        text: 'USA Killings By State'
    },

    chart: {
        animation: false // Disable animation, especially for zooming
    },

    colorAxis: {
        dataClasses: [{
            from: -1,
            to: 0,
            color: hispColor,
            name: 'Hispanic'
        }, {
            from: 0,
            to: 1,
            color: blkColor,
            name: 'Black'
        }, {
            from: 2,
            to: 3,
            name: 'Native American',
            color: natColor
        }, {
            from: 3,
            to: 4,
            name: 'Asian',
            color: asColor
        },
        {
            from: 4,
            to: 5,
            name: 'Pacific Islander',
            color: piColor
        },
        {
            from: 5,
            to: 6,
            name: 'White',
            color: whiColor
        },
        {
            from: 6,
            to: 7,
            name: 'Unknown',
            color: unColor
        }]
    },

    mapNavigation: {
        enabled: true
    },
    // Limit zoom range
    yAxis: {
        minRange: 2300
    },

    tooltip: {
        useHTML: true
    },

    // Default options for the pies
    plotOptions: {
        mappie: {
            borderColor: 'rgba(255,255,255,0.4)',
            borderWidth: 1,
            tooltip: {
                headerFormat: ''
            }
        }
    },
    //paci white unknown
    series: [{
        mapData: Highcharts.maps['countries/us/us-all'],
        data: data,
        name: 'States',
        borderColor: '#FFF',
        showInLegend: false,
        joinBy: ['name', 'id'],
        keys: ['id', 'black', 'hispanic', 'native', 'asian',
            'pacific', 'white', 'unknown', 'sumVotes', 'values'],
        tooltip: {
            headerFormat: '',
            pointFormatter: function () {
                var hoverVotes = this.hoverVotes; // Used by pie only
                return '<b>' + this.id + ' deaths</b><br/>' +
                    Highcharts.map([
                        ['Black', this.black, blkColor],
                        ['Hispanic', this.hispanic, hispColor],
                        ['Native American', this.native, natColor],
                        ['Asian', this.asian, asColor],
                        ['Pacific Islanders', this.pacific, piColor],
                        ['White', this.white, whiColor],
                        ['Unknown', this.unknown, unColor]
                    ].sort(function (a, b) {
                        return b[1] - a[1]; // Sort tooltip by most votes
                    }), function (line) {
                        return '<span style="color:' + line[2] +
                            // Colorized bullet
                            '">\u25CF</span> ' +
                            // Party and votes
                            (line[0] === hoverVotes ? '<b>' : '') +
                            line[0] + ': ' +
                            Highcharts.numberFormat(line[1], 0) +
                            (line[0] === hoverVotes ? '</b>' : '') + 
                            '<br/>';
                    }).join('') +
                    '<hr/>Total: ' + Highcharts.numberFormat(this.sumVotes, 0);
            }
        }
    }, {
        name: 'Separators',
        id: 'us-all',
        type: 'mapline',
        data: Highcharts.geojson(Highcharts.maps['countries/us/us-all'], 'mapline'),
        color: '#707070',
        showInLegend: false,
        enableMouseTracking: false
    }, {
        name: 'Connectors',
        type: 'mapline',
        color: 'rgba(130, 130, 130, 0.5)',
        zIndex: 5,
        showInLegend: false,
        enableMouseTracking: false
    }]
});

// When clicking legend items, also toggle connectors and pies
Highcharts.each(chart.legend.allItems, function (item) {
    var old = item.setVisible;
    item.setVisible = function () {
        var legendItem = this;
        old.call(legendItem);
        Highcharts.each(chart.series[0].points, function (point) {
            if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
                // Find this state's pie and set visibility
                Highcharts.find(chart.series, function (item) {
                    return item.name === point.id;
                }).setVisible(legendItem.visible, false);
                // Do the same for the connector point if it exists
                var connector = Highcharts.find(chart.series[2].points, function (item) {
                    return item.name === point.id;
                });
                if (connector) {
                    connector.setVisible(legendItem.visible, false);
                }
            }
        });
        chart.redraw();
    };
});

// Add the pies after chart load, optionally with offset and connectors
Highcharts.each(chart.series[0].points, function (state) {
    if (!state.id) {
        return; // Skip points with no data, if any
    }

    var pieOffset = state.pieOffset || {},
        centerLat = parseFloat(state.properties.latitude),
        centerLon = parseFloat(state.properties.longitude);

    // Add the pie for this state
    chart.addSeries({
        type: 'mappie',
        name: state.id,
        linkedMap: 'us-all',
        zIndex: 6, // Keep pies above connector lines
        sizeFormatter: function () {
            var yAxis = this.chart.yAxis[0],
                zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
                    (yAxis.max - yAxis.min);
            return Math.max(
                this.chart.chartWidth / 45 * zoomFactor, // Min size
                this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
            );
        },
        tooltip: {
            // Use the state tooltip for the pies as well
            pointFormatter: function () {
                return state.series.tooltipOptions.pointFormatter.call({
                    id: state.id,
                    hoverVotes: this.name,
                    black: state.black,
                    hispanic: state.hispanic,
                    native: state.native,
                    asian: state.asian,
                    pacific: state.pacific,
                    white:state.white
                });
            }
        },
        data: [{
            name: 'Black',
            y: state.black,
            color: blkColor
        }, {
            name: 'Hispanic',
            y: state.hispanic,
            color: hispColor
        }, {
            name: 'Native American',
            y: state.native,
            color: natColor
        }, {
            name: 'Asian',
            y: state.asian,
            color: asColor
        },
        {
            name: 'Pacific Islander',
            y: state.pacific,
            color: piColor
        },
        {
            name: 'White',
            y: state.white,
            color: whiColor
        },
        {
            name: 'Unknown',
            y: state.unknown,
            color: unColor
        }
        ],
        center: {
            lat: centerLat + (pieOffset.lat || 0),
            lon: centerLon + (pieOffset.lon || 0)
        }
    }, false);

    // Draw connector to state center if the pie has been offset
    if (pieOffset.drawConnector !== false) {
        var centerPoint = chart.fromLatLonToPoint({
                lat: centerLat,
                lon: centerLon
            }),
            offsetPoint = chart.fromLatLonToPoint({
                lat: centerLat + (pieOffset.lat || 0),
                lon: centerLon + (pieOffset.lon || 0)
            });
        chart.series[2].addPoint({
            name: state.id,
            path: 'M' + offsetPoint.x + ' ' + offsetPoint.y +
                'L' + centerPoint.x + ' ' + centerPoint.y
        }, false);
    }
});
// Only redraw once all pies and connectors have been added
chart.redraw();

