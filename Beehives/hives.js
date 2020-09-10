
var widthres = 980;
var heightres = 900;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

fmapres = svgres.append("g")
reslegend = svgres.append("g")


htext = svgres.append("g")

var lineGenerator = d3.line()

var radius = 4.3
var items = 20;

var rows = 6
var columns = 12

var list_random2 = [1, 2, 3, 5, 6, 8]
var list_random = [2, 6, 8, 9, 11, 12]

var numpitch = 0
var numspace = 200

var list_scenarios = ["5 queries", "5 clicks"]

for (k = 0; k < list_scenarios.length; k++) {

    reslegend.append("text")
        .attr("x", function (d) { return 860; })
        .attr("y", 130 + k * 15)
        .text(function (d) { return list_scenarios[k]; })
        .attr("font-family", "Gill Sans Light, Century Gothic, sans-serif")
        .attr("font-size", 10)
        .attr("font-weight", "lighter")
        .attr("opacity", 1)
        .style("fill", "#666")

    reslegend.append("circle")
        .attr("cx", function (d) { return 850; })
        .attr("cy", 126 + k * 15)
        .attr("r", 3)
        .style("opacity", .8)
        .attr("id", function (d) { return "isl" })
        .attr("fill", function (d) {
            if (k == 0) return "#bbb";
            return "#000";
        })
        .attr("stroke", function (d) { return "none"; })
}


d3.json("../DATA/opportunities.json", function (error, data) {



    for (let ff = 0; ff < data.data.length; ff++) {

        var h = svgres.append("g")
            .attr("transform", function (d) {
                reverse = 1
                if (ff < 4) { factor = 0; shift = 0; }
                else if (ff < 8) { factor = 4; shift = 1; }
                else if (ff < 12) { factor = 8; shift = 1.8 }
                else if (ff < 16) { factor = 12; shift = 2.6 }
                return "translate(" + (numpitch + 50 * shift + numspace * (ff - factor)) + "," + ((220 * shift) - reverse * 50) + ")";
            })

        h
            // .selectAll('text').data(data.data).enter()
            .append("text")
            .attr("x", function (d, i) { return 30; })
            .attr("y", function (d) { return 170; })
            .text(function (d) { return (data.data[ff].terms); })
            .attr("font-family", "Gill Sans, sans-serif")
            .attr("font-size", 12)
            .style("fill", "black");


        items = data.data[ff].query_count / 4;

        side = Math.sqrt(items)
        counter = 0

        for (let cc = 0; cc < side; cc++) {

            var they = radius * Math.sqrt(0.75)
            let pitchx = 2 * radius
            let pitchy = they

            for (let dd = 0; dd < side; dd++) {

                rand = Math.random()
                rand2 = Math.random()

                let check = dd % 2

                if (check == 0) {
                    pitchx = 1.5 * radius
                    pitchy = 0
                }
                else {
                    pitchx = 3 * radius / 2
                    pitchy = they
                }

                var verA = [30 + dd * pitchx, 180 + (2 * cc * they) + pitchy]
                var verB = [30 + dd * pitchx + radius / 2, 180 - they + (2 * cc * they) + pitchy]
                var verC = [30 + dd * pitchx + 3 * radius / 2, 180 - they + (2 * cc * they) + pitchy]

                var verD = [30 + dd * pitchx + 2 * radius, 180 + (2 * cc * they) + pitchy]
                var verF = [30 + dd * pitchx + radius / 2, 180 + they + (2 * cc * they) + pitchy]
                var verE = [30 + dd * pitchx + 3 * radius / 2, 180 + they + (2 * cc * they) + pitchy]

                var thepoints = [verA, verB, verC, verD, verE, verF, verA];
                var pathData = lineGenerator(thepoints);

                h
                    .append("path")
                    //    .style("class", "pathline")
                    .attr('d', pathData)
                    .style("stroke-width", ".25px")
                    .attr("opacity", 1)
                    .attr("id", "murky" + counter + "_" + ff)
                    .style("fill", d3.rgb(255 - rand2 * 10, 255 - rand2 * 10, 255 - rand2 * 10).toString())
                    // .style("fill", "none")
                    .style("stroke", "gray");

                counter = counter + 1

                // for (let pp = 0; pp < thepoints.length; pp++) {

                //     h
                //         .append("circle")
                //         .attr("cx", function (d) { return thepoints[pp][0]; })
                //         .attr("cy", function (d) { return thepoints[pp][1]; })
                //         .attr("r", function (d) { return 0; })
                //         .attr("opacity", 1)
                //         .attr("fill", function (d) { return "black"; })
                //         .attr("stroke", function (d) { return "black"; })
                //         .style("stroke-dasharray", ("1"))
                // }
            }
        }

        high = data.data[ff].click_count / 4;

        for (let rr = 0; rr < high; rr++) {
            frame =
                pick = Math.floor(Math.random() * items) + 1
            d3.select("#murky" + pick + "_" + ff).style("fill", "#666")
        }
    }
})