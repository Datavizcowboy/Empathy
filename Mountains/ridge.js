//--------------------------- SVG definition

var widthres = 980;
var heightres = 900;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

//--------------------------- Group definition

mount = svgres.append("g")
mount2 = svgres.append("g")
mountlinequery = svgres.append("g")
mountlineclick = svgres.append("g")
mounttextquery = svgres.append("g")
mounttextquery2 = svgres.append("g")
mounttextclick = svgres.append("g")
mounttextclick2 = svgres.append("g")

//--------------------------- Constant definition

var lineGenerator = d3.line()
    .curve(d3.curveCardinal);

var label_size = 10

//--------------------------- Construction of the polygons

d3.json("../DATA/opportunities.json", function (error, data) {

    mount.selectAll('polygon').data(data.data).enter()
        .append('polygon')
        .attr("points", function (d, i) {
            var pitchbar = 1
            var a = -0 + (i) * 70 + "," + 420
            var b = -0 + (i) * 70 + (d.query_count * .05) + "," + (420 - (d.query_count * .1))
            var c = -0 + (i) * 70 + (d.query_count * .1) + "," + 420
            return (a + " " + b + " " + c);
        })
        .style("fill", function (d, i) { return d3.rgb(200 - i * 6, 200 - i * 6, 200 - i * 6); })
        .style("opacity", 1);

    mount2.selectAll('polygon').data(data.data).enter()
        .append('polygon')
        .attr("points", function (d, i) {
            var pitchbar = 1
            var a = -0 + (i) * 70 + "," + 420
            var b = -0 + (i) * 70 + (d.click_count * .5) + "," + (420 - (d.click_count * 1))
            var c = -0 + (i) * 70 + (d.click_count * 1) + "," + 420
            return (a + " " + b + " " + c);
        })
        .style("fill","#333")
        .style("opacity", .8);

    //--------------------------- Associate a line with each of the polygon tops

    mountlinequery.selectAll('line').data(data.data).enter()
        .append('line')
        .attr("x1", function (d, i) { return -0 + (i) * 70 + (d.query_count * .05); })
        .attr("y1", function (d) { return (412 - (d.query_count * .1)); })
        .attr("x2", function (d, i) { return -0 + (i) * 70 + (d.query_count * .05); })
        .attr("y2", function (d) { return (380 - (d.query_count * .1)); })
        .attr("stroke-width", .75)
        .style("opacity", 1)
        .attr("stroke", "#999");

    mountlineclick.selectAll('line').data(data.data).enter()
        .append('line')
        .attr("x1", function (d, i) { return -0 + (i) * 70 + (d.click_count * .5); })
        .attr("y1", function (d) { return (412 - (d.click_count * 1)); })
        .attr("x2", function (d, i) { return -0 + (i) * 70 + (d.click_count * .5); })
        .attr("y2", function (d) { return (395 - (d.click_count * 1)); })
        .attr("stroke-width", 1)
        .style("opacity", 1)
        .attr("stroke", "#333");

    //--------------------------- Associate term and value with each of the polygon

    mounttextquery.selectAll('text').data(data.data).enter()
        .append("text")
        .attr("x", function (d, i) { return -2 + (i) * 70 + (d.query_count * .05); })
        .attr("y", function (d) { return (367 - (d.query_count * .1)); })
        .text(function (d) { return (d.query_count); })
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", label_size)
        .style("fill", "black");

    mounttextquery2.selectAll('text').data(data.data).enter()
        .append("text")
        .attr("x", function (d, i) { return -2 + (i) * 70 + (d.query_count * .05); })
        .attr("y", function (d) { return (355 - (d.query_count * .1)); })
        .text(function (d, i) { return d.terms; })
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", label_size)
        .style("fill", "darkgoldenrod");

    mounttextclick.selectAll('text').data(data.data).enter()
        .append("text")
        .attr("x", function (d, i) { return -2 + (i) * 70 + (d.click_count * .5); })
        .attr("y", function (d) { return (390 - (d.click_count * 1)); })
        .text(function (d) { return (d.click_count); })
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", label_size)
        .style("fill", "black");

    mounttextclick2.selectAll('text').data(data.data).enter()
        .append("text")
        .attr("x", function (d, i) { return -2 + (i) * 70 + (d.click_count * .5); })
        .attr("y", function (d) { return (380 - (d.click_count * 1)); })
        .text(function (d, i) { return d.terms; })
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", label_size)
        .style("opacity", .8)
        .style("fill", "black");
});