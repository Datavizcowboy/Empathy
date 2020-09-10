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

//--------------------------- Constant definition

var lineGenerator = d3.line()
    .curve(d3.curveCardinal);
var radius = 270
var list_scenarios = ["5 queries", "5 clicks"]
var legend_size = 10
var legend_pitch = 700
var legend_radius = 3
var label_size = 10

//--------------------------- Legend with the circle elements

for (k = 0; k < list_scenarios.length; k++) {

    legend.append("text")
        .attr("x", legend_pitch+10)
        .attr("y", 10 + k * 15)
        .text(function (d) { return list_scenarios[k]; })
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", legend_size)
        .attr("opacity", 1)
        .style("fill", "#666")

    legend.append("circle")
        .attr("cx", legend_pitch)
        .attr("cy", 6 + k * 15)
        .attr("r", legend_radius)
        .style("opacity", .8)
        .attr("fill", function (d) {
            if (k == 0) return "#bbb";
            else return "#000";
        })
        .attr("stroke", function (d) { return "none"; })
}

//--------------------------- Construction of the constellation of click counts

d3.json("../DATA/opportunities.json", function (error, data) {

    for (let dd = 0; dd < data.data.length; dd++) {

        var items = data.data.length;

        //------------------- Locate the click circles and lines behind the big circles

        var dotsback = h.append("g")

        for (let cc = 0; cc < data.data[dd].click_count; cc++) {

            //--------------------------- Position of terms in the subcircles

            var miniradius = 40
            var miniitems = data.data[dd].click_count;
            var minithex = miniradius * Math.cos(2 * Math.PI * cc / miniitems);
            var minithey = miniradius * Math.sin(2 * Math.PI * cc / miniitems);

            dotsback
                .append("circle")
                .attr("cx", function (d) { return 320 + radius * Math.cos(2 * Math.PI * dd / items) + 0 + minithex; })
                .attr("cy", function (d) { return 320 + radius * Math.sin(2 * Math.PI * dd / items) + 0 + minithey; })
                .attr("r", function (d) { return 1; })
                .attr("opacity", 1)
                .attr("fill", function (d) { return "#333"; })
                .attr("stroke", function (d) { return "none"; })

            //--------------------------- Radial lines from the center to the clicks

            dotsback
                .append("line")
                .attr("x1", 320 + radius * Math.cos(2 * Math.PI * dd / items))
                .attr("y1", 320 + radius * Math.sin(2 * Math.PI * dd / items))
                .attr("x2", 320 + radius * Math.cos(2 * Math.PI * dd / items) + minithex)
                .attr("y2", 320 + radius * Math.sin(2 * Math.PI * dd / items) + minithey)
                .attr("stroke-width", .7)
                .attr("id", "info1")
                .style("opacity", 1)
                .attr("stroke", "#ddd")
        }
    }
})

//--------------------------- Construction of the constellation of query counts

d3.json("../DATA/opportunities.json", function (error, data) {

    var items = data.data.length;

    var dots = h.append("g")

    dots.selectAll("circle").data(data.data).enter()
        .append("circle")
        .attr("cx", function (d, i) { return 320 + radius * Math.cos(2 * Math.PI * i / items); })
        .attr("cy", function (d, i) { return 320 + radius * Math.sin(2 * Math.PI * i / items); })
        .attr("r", function (d, i) { return d.query_count * .01; })
        .attr("opacity", 1)
        .attr("fill", function (d) { return "#999"; })
        .attr("stroke", function (d) { return "none"; })

    dots.selectAll("text").data(data.data).enter()
        .append("text")
        .attr("x", function (d, i) { return 320 + radius * Math.cos(2 * Math.PI * i / items); })
        .attr("y", function (d, i) { return 55 + 320 + radius * Math.sin(2 * Math.PI * i / items); })
        .text(function (d) { return d.terms; })
        .attr("font-family", "Gill Sans Light, Century Gothic, sans-serif")
        .attr("font-size", label_size)
        .attr("font-weight", "lighter")
        .attr("text-anchor", "middle")
        .attr("opacity", 1)
        .style("fill", "#666")
})