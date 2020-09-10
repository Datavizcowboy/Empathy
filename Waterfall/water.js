//--------------------------- SVG definition

var widthres = 980;
var heightres = 1200;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

//--------------------------- Groups definition

legend = svgres.append("g")
falls = svgres.append("g")

//--------------------------- Constant definition

var lineGenerator = d3.line()
    .curve(d3.curveCardinal);

var list_scenarios = ["5 clicks"]
var legend_size = 10
var legend_pitch = 860

//--------------------------- Legend 

for (k = 0; k < list_scenarios.length; k++) {

    legend.append("text")
        .attr("x", legend_pitch + 10)
        .attr("y", 760 + k * 15)
        .text(list_scenarios[k])
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", legend_size)
        .attr("opacity", 1)
        .style("fill", "#333")

    legend.append("circle")
        .attr("cx", legend_pitch)
        .attr("cy", 756 + k * 15)
        .attr("r", 3)
        .style("opacity", .8)
        .attr("fill", function (d) {
            if (k == 0) return "white";
            return "#000";
        })
        .attr("stroke", "none")
}

//--------------------------- Labels of query and click counts

legend.append("text")
    .attr("x", legend_pitch)
    .attr("y", 420)
    .text("Query Count")
    .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
    .attr("font-size", 10)
    .attr("opacity", 1)
    .style("fill", "#333")

legend.append("text")
    .attr("x", legend_pitch)
    .attr("y", 795)
    .text("Clicks Count")
    .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
    .attr("font-size", 10)
    .attr("opacity", 1)
    .style("fill", "white")

//--------------------------- Construction of the paths

d3.json("../DATA/opportunities.json", function (error, data) {

    var items = data.data.length;

    for (var j = 0; j < items; j++) {

        randcat = Math.random()

        //--------------------------- Labels for each one of the terms

        falls
            .append("text")
            .attr("x", 110 + j * 50)
            .attr("y", 10 + 100 * randcat)
            .text(function (d) { return data.data[j].terms; })
            .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            .attr("opacity", 1)
            .style("fill", "#333")

        falls.append("text")
            .attr("x", 30 + j * 50)
            .attr("y", 415)
            .text(function (d) { return data.data[j].query_count; })
            .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "start")
            .style("fill", "#333")
            .transition()
            .tween("text", function (d) {
                var selection = d3.select(this);
                var start = d3.select(this).text();
                var end = 0;
                var interpolator = d3.interpolateNumber(end, start);
                return function (t) { selection.text(Math.round(interpolator(t))); };
            })
            .duration(8000);

        falls.append("text")
            .attr("x", 30 + j * 50)
            .attr("y", 795)
            .text(function (d) { return data.data[j].click_count; })
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("id", "where")
            .attr("text-anchor", "start")
            .style("fill", "#333")
            .transition()
            .tween("text", function (d) {
                var selection = d3.select(this);
                var start = d3.select(this).text();
                var end = 0;
                var interpolator = d3.interpolateNumber(end, start);
                return function (t) { selection.text(Math.round(interpolator(t))); };
            })
            .duration(8000);


        //--------------------------- Construction of paths and dots for the click count

        for (var i = 0; i < data.data[j].click_count / 5; i++) {

            var rand = Math.random()
            var rand2 = Math.random()
            var rand3 = Math.random()

            var points = [
                [120 + j * 50, 10 + 100 * randcat],
                [50 + j * 50 + 10 * rand + 20 * rand2, 120 + 100 * randcat],
                [30 + j * 50 + 30 * rand2, 300 + 100 * rand3],
                [30 + j * 50 + 30 * rand2, 520 + 250 * rand3]
            ];

            var pathData = lineGenerator(points);

            falls.append("path")
                .attr('d', pathData)
                .style("stroke-width", ".5px")
                .style("opacity", .5)
                .style('stroke', "#333");

            falls
                .append("circle")
                .attr("cx", 30 + j * 50 + 30 * rand2)
                .attr("cy", 520 + 250 * rand3)
                .attr("r", 2)
                .attr("opacity", 1)
                .attr("fill", "white")
                .attr("stroke", "none")
        }

        //--------------------------- Construction of paths and dots for the query count

        for (var i = 0; i < data.data[j].query_count / 5; i++) {

            var rand = Math.random()
            var rand2 = Math.random()
            var rand3 = Math.random()

            var points = [
                [120 + j * 50, 10 + 100 * randcat],
                [50 + j * 50 + 10 * rand + 20 * rand2, 120 + 100 * randcat],
                [30 + j * 50 + 30 * rand2, 300 + 100 * rand3]
            ];

            var pathData = lineGenerator(points);

            falls
                .append("path")
                .attr('d', pathData)
                .style("stroke-width", ".5px")
                .style("opacity", .3)
                .style('stroke', "#333");
        }
    }
})

//--------------------------- Dashed lines for reference

falls
    .append("line")
    .attr("x1", 0)
    .attr("y1", 780)
    .attr("x2", 950)
    .attr("y2", 780)
    .attr("stroke-width", .7)
    .attr("id", "info1")
    .style("opacity", 1)
    .style("stroke-dasharray", ("4"))
    .attr("stroke", "black")

falls
    .append("line")
    .attr("x1", 0)
    .attr("y1", 400)
    .attr("x2", 950)
    .attr("y2", 400)
    .attr("stroke-width", .7)
    .attr("id", "info1")
    .style("opacity", 1)
    .style("stroke-dasharray", ("4"))
    .attr("stroke", "black")
