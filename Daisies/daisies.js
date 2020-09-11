//--------------------------- SVG definition

var widthres = 980;
var heightres = 900;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

//--------------------------- Groups definition

legend = svgres.append("g")
h = svgres.append("g")
    .attr("transform", function (d) {
        return "translate(" + (200) + "," + (200) + ")";
    })

//--------------------------- Constants definition

var lineGenerator = d3.line()
    .curve(d3.curveCardinal);

var outerRadius = 200;

var thejson = "../DATA/opportunities.json"

field1 = [];
field2 = [];

var list_scenarios = ["40 queries", "40 clicks"]
var legend_size = 10
var legend_radius = 3
var legend_pitch = 450
var hives_text_size = 12

//--------------------------- Legend with the units

for (k = 0; k < list_scenarios.length; k++) {

    legend.append("text")
        .attr("x", legend_pitch+10)
        .attr("y", 30 + k * 15)
        .text(list_scenarios[k])
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", legend_size)
        .attr("opacity", 1)
        .style("fill", "#666")

    legend.append("circle")
        .attr("cx", legend_pitch)
        .attr("cy", 26 + k * 15)
        .attr("r", legend_radius)
        .style("opacity", .8)
        .attr("fill", function (d) {
            if (k == 0) return "gray";
            return "darkorange";
        })
        .attr("stroke", "none")
}

legend.append("text")
.attr("x", 460)
.attr("y", 10)
.text("Mom Jeans")
.attr("font-family", "Gill Sans, Century Gothic, sans-serif")
.attr("font-size", legend_size)
.attr("opacity", 1)
.style("fill", "#666")


//--------------- Two arrays to store the data and perform calculations
//--------------- on the number of elements to distribute on the circle

d3.json(thejson, function (json) {
    dajson = json.data
    dajson.map(function (d) {
        field1.push(d.query_count / 40);
        field2.push(d.click_count / 40)
    })

    itemsquery = field1[0]
    itemsclick = field2[0]

    var data = d3.range(itemsquery).map(function (i) {
        return {
            'x': i,
            'y': i
        };
    });

    var xcos = d3.scaleLinear()
        .domain([0, data.length])
        .range([Math.PI * 0, Math.PI * 2]);

    var ysin = d3.scaleLinear()
        .domain([0, data.length])
        .range([Math.PI * 0, Math.PI * 2]);

    //--------------- Create the groups along the circle perimeter

    for (var ii = 0; ii < itemsquery; ii++) {

        var dots = h
            .selectAll('g')
            .data(data)
            .enter()
            .append("g")
            .attr('transform', function (d, i) {
                var rx = Math.cos(xcos(i)) * outerRadius;
                var ry = Math.sin(ysin(i)) * outerRadius;
                return 'translate(' + rx + ', ' + ry + ')rotate(' + (xcos(i) * 180 / Math.PI + 90) + ')';
            })

        //--------------- Assign an interpolated polygon to each group

        var mypoints = [[20, 10], [40, 60], [20, 80], [0, 60], [20, 10]];
        var pathData = lineGenerator(mypoints);

        dots
            .append('path')
            .attr('d', pathData)
            .style('stroke-width', function (d) { return .2 })
            .attr("id", function (d, i) { return "flow" + i })
            .style("opacity", function (d) { return .3; })
            .style("fill", function (d) { return d3.rgb(100, 100, 100); })
    }

    //-------------- Highlight the click counts

    for (var m = 0; m < itemsclick; m++) {

        d3.select("#flow" + m)
            .style("opacity", function (d) { return .5; })
            .style("fill", function (d) { return "darkorange"; })
    }
})
