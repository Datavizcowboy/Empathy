//--------------------------- SVG definition

var widthres = 980;
var heightres = 900;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

//--------------------------- Groups definition

legend = svgres.append("g")
frame = svgres.append("g")
frametext = svgres.append("g")

//--------------------------- Constant definition

var lineGenerator = d3.line()
    .curve(d3.curveCardinal);

var thejson = "../DATA/opportunities.json"

field1 = [];
field2 = [];

var list_scenarios = ["Clicks"]
var legend_size = 10
var legend_pitch = 865
var legend_radius = [4,2]
var label_size = 11

//--------------------------- Legend with the circle elements

for (k = 0; k < list_scenarios.length; k++) {

    legend.append("text")
        .attr("x", legend_pitch+10)
        .attr("y", 12 + k * 15)
        .text(list_scenarios[k])
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", legend_size)
        .attr("opacity", 1)
        .style("fill", "#666")

    legend.append("circle")
        .attr("cx", legend_pitch)
        .attr("cy", 8 + k * 15)
        .attr("r", legend_radius[k])
        .style("opacity", .8)
        .attr("fill", function (d) {
            if (k == 0) return "white";
            else return "#000";
        })
        .attr("stroke", "deepskyblue")
        .attr("stroke-width",6)
}

//--------------------------- Construction of the rectangles 

d3.json(thejson, function (json) {
    dajson = json.data
    dajson.map(function (d) {
        field1.push(d.query_count / 20);
        field2.push(d.click_count)
    })

    //--------------------------- Calculate the cumulative distance from the first element 

    const cumulativeSum = (sum => value => sum += value)(0);

    queries = field1.map(cumulativeSum)

    frame.selectAll("rect").data(json.data).enter()
        .append("rect")
        .attr("x", function (d, i) { return queries[i] - queries[0]; })
        .attr("y", function (d) { return 30; })
        .attr("height", function (d) { return 300; })
        .attr("width", function (d, i) { return field1[i]; })
        .style("opacity", function (d, i) { return 1; })
        .attr("fill", function (d, i) { return d3.rgb(0 - i * 10, 205 - i * 10, 255 - i * 10); })
        .attr("stroke", "white");

    frame.selectAll("text").data(json.data).enter()
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", function (d, i) { return queries[i] - queries[0]; })
        .attr("x", 0 - (340))
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text(function (d, i) { return d.terms; })
        .attr("font-family", "Gill Sans, serif")
        .attr("font-size", 12)
        .attr("opacity", 1)
        .attr("id", "theyaxis")
        .style("fill", "black");

    frametext.selectAll("text").data(json.data).enter()
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", function (d, i) { return 13 + queries[i] - queries[0]; })
        .attr("x", 0 - (340))
        .attr("dy", "1em")
        .style("text-anchor", "end")
        .text(function (d, i) { return d.click_count + " of " + d.query_count; })
        .attr("font-family", "Gill Sans, serif")
        .attr("font-size", 12)
        .attr("opacity", 1)
        .attr("id", "theyaxis")
        .style("fill", "#999");

    //--------------------------- Add a number of circles equal to the click count

    for (o = 0; o < queries.length; o++) {

        clicks = field2[o]

        for (k = 0; k < clicks; k++) {

            //--------------------------- Distribute the circles randomly within the rectangle

            randy = Math.random()
            randx = Math.random()

            frame
                .append("circle")
                .attr("cx", function (d, i) { return queries[o] - queries[0] + randx * field1[o]; })
                .attr("cy", 30 + randy * 300)
                .attr("r", 1)
                .style("opacity", 1)
                .attr("fill", function (d) { return "white"; })
                .attr("stroke", function (d) { return "none"; })
        }
    }
});