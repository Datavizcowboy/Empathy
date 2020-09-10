//--------------------------- SVG definition

var widthres = 980;
var heightres = 900;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

//--------------------------- Groups definition

legend = svgres.append("g")

//--------------------------- Constants definition

var lineGenerator = d3.line()
var radius = 4.3
var numpitch = 0
var numspace = 200
var list_scenarios = ["5 queries", "5 clicks"]
var legend_size = 10
var legend_radius = 3
var hives_text_size = 12

//--------------------------- Legend with the dots/hexagons

for (k = 0; k < list_scenarios.length; k++) {

    legend.append("text")
        .attr("x", 860)
        .attr("y", 130 + k * 15)
        .text(function (d) { return list_scenarios[k]; })
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", legend_size)
        .attr("opacity", 1)
        .style("fill", "#666")

    legend.append("circle")
        .attr("cx", 850)
        .attr("cy", 126 + k * 15)
        .attr("r", legend_radius)
        .style("opacity", .8)
        .attr("fill", function (d) {
            if (k == 0) return "#bbb";
            return "#000";
        })
        .attr("stroke", function (d) { return "none"; })
}

//--------------------------- Construction of beehives from the data

d3.json("../DATA/opportunities.json", function (error, data) {

    for (let ff = 0; ff < data.data.length; ff++) {

        //--------------------------- Position of groups in a 4x4 matrix

        var hives = svgres.append("g")
            .attr("transform", function (d) {
                reverse = 1
                if (ff < 4) { factor = 0; shift = 0; }
                else if (ff < 8) { factor = 4; shift = 1; }
                else if (ff < 12) { factor = 8; shift = 1.8 }
                else if (ff < 16) { factor = 12; shift = 2.6 }
                return "translate(" + (numpitch + 50 * shift + numspace * (ff - factor)) + "," + ((220 * shift) - reverse * 50) + ")";
            })

        //--------------------------- Label each hive with the category name

        hives
            .append("text")
            .attr("x", function (d, i) { return 30; })
            .attr("y", function (d) { return 170; })
            .text(function (d) { return (data.data[ff].terms); })
            .attr("font-family", "Gill Sans, sans-serif")
            .attr("font-size", hives_text_size)
            .style("fill", "black");


        items = data.data[ff].query_count / 4;
        side = Math.sqrt(items)
        counter = 0

        //--------------------------- Polygon definition of individual hexagons

        for (let cc = 0; cc < side; cc++) {

            var they = radius * Math.sqrt(0.75)
            let pitchx = 2 * radius
            let pitchy = they

            for (let dd = 0; dd < side; dd++) {

                rand = Math.random()
                rand2 = Math.random()

                let check = dd % 2

                //----------- Check to shift the entire row to fit within the hive

                if (check == 0) {
                    pitchx = 1.5 * radius
                    pitchy = 0
                }
                else {
                    pitchx = 3 * radius / 2
                    pitchy = they
                }

                //----------- Six vertex of the hexagon

                var verA = [30 + dd * pitchx, 180 + (2 * cc * they) + pitchy]
                var verB = [30 + dd * pitchx + radius / 2, 180 - they + (2 * cc * they) + pitchy]
                var verC = [30 + dd * pitchx + 3 * radius / 2, 180 - they + (2 * cc * they) + pitchy]

                var verD = [30 + dd * pitchx + 2 * radius, 180 + (2 * cc * they) + pitchy]
                var verF = [30 + dd * pitchx + radius / 2, 180 + they + (2 * cc * they) + pitchy]
                var verE = [30 + dd * pitchx + 3 * radius / 2, 180 + they + (2 * cc * they) + pitchy]

                var thepoints = [verA, verB, verC, verD, verE, verF, verA];
                var pathData = lineGenerator(thepoints);

                hives
                    .append("path")
                    .attr('d', pathData)
                    .style("stroke-width", ".25px")
                    .attr("opacity", 1)
                    .attr("id", "thehive_" + counter + "_" + ff)
                    .style("fill", d3.rgb(255 - rand2 * 10, 255 - rand2 * 10, 255 - rand2 * 10).toString())
                    .style("stroke", "gray");

                counter = counter + 1

            }
        }

        //----------- Highlight a number of cells in sync with the click count

        high = data.data[ff].click_count / 4;

        for (let rr = 0; rr < high; rr++) {
            pick = Math.floor(Math.random() * items) + 1
            d3.select("#thehive_" + pick + "_" + ff).style("fill", "#666")
        }
    }
})