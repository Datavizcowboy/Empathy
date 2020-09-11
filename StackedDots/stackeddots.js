//--------------------------- SVG definition

var widthres = 1050;
var heightres = 800;

var svgres = d3.select("div.leftpolyresources-div")
    .append("svg")
    .attr("width", widthres)
    .attr("height", heightres)

//--------------------------- Groups definition

legend = svgres.append("g")

//--------------------------- Constant definition

var numpitch = 240
var numspace = 220
var list_scenarios = ["5 queries", "5 clicks"]
var legend_size = 10
var legend_pitch = 850

//--------------------------- Legend describing the meaning of each circle

for (k = 0; k < list_scenarios.length; k++) {

    legend.append("text")
        .attr("x", legend_pitch+10)
        .attr("y", 10 + k * 15)
        .text(list_scenarios[k])
        .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
        .attr("font-size", legend_size)
        .attr("opacity", 1)
        .style("fill", "#666")

    legend.append("circle")
        .attr("cx", legend_pitch)
        .attr("cy", 6 + k * 15)
        .attr("r", 3)
        .style("opacity", .8)
        .attr("fill", function (d) {
            if (k == 0) return "#bbb";
            return "red";
        })
        .attr("stroke", "none")
}

//--------------------------- Construction of the stacked dots

d3.json("../DATA/opportunities.json", function (error, data) {

    for (i = 0; i < data.data.length; i++) {

        //--------------------------- Distribution of each term in a 4x4 matrix

        var dots = svgres.append("g")
            .attr("transform", function (d) {
                reverse = 1
                if (i < 4) { factor = 0; shift = 0; }
                else if (i < 8) { factor = 4; shift = 1; }
                else if (i < 12) { factor = 8; shift = 0 }
                else if (i < 16) { factor = 12; shift = 1 }
                return "translate(" + (numpitch + 100 * shift + numspace * (i - factor)) + "," + ((120 * factor / 4) - reverse * 50) + ")rotate(45)";
            })
            .attr("id", function (d) { return ("cont" + data.data[i].terms); })

        //--------------------------- Calculate the distribution of dots: number, rows, columns, etc...

        var balls = data.data[i].query_count / 5
        var brack = 20
        var filas = balls / brack
        var enteros = Math.ceil(balls / brack) - 1
        var resto = (filas - enteros) * 20

        //--------------------------- Fully filled rows

        if (resto >= 0) {
            for (lev = 0; lev < enteros; lev++) {
                for (k = 1; k <= brack; k++) {

                    dots.append("circle")
                        .attr("cx", k * 6)
                        .attr("cy", 300 - lev * 6)
                        .attr("r", 2)
                        .attr("opacity", 1)
                        .attr("fill", "#ccc")
                }
            }

            //--------------------------- Partially filled rows

            for (r = 1; r <= resto; r++) {

                dots.append("circle")
                    .attr("cx", r * 6)
                    .attr("cy", 300 - (enteros) * 6)
                    .attr("r", 2)
                    .attr("opacity", 1)
                    .attr("fill", "#ccc")
            }
        }

        //--------------------------- Labels associated with each term. 

        dots
            .append("text")
            .attr("x", 5)
            .attr("y", 340)
            .text(function (d) { return data.data[i].terms; })
            .attr("font-family", "Gill Sans, Century Gothic, sans-serif")
            .attr("font-size", 12)
            .attr("opacity", 1)
            .style("fill", "black")

        dots.append("text")
            .attr("x", 125)
            .attr("y", 320)
            .text(function (d) { return data.data[i].query_count; })
            .attr("font-family", "Gill Sans, sans-serif")
            .attr("font-size", 12)
            .attr("text-anchor", "end")
            .style("fill", "#bbb")
            .transition()
            .tween("text", function (d) {
                var selection = d3.select(this);
                var start = d3.select(this).text();
                var end = 0;
                var interpolator = d3.interpolateNumber(end, start);
                return function (t) { selection.text(Math.round(interpolator(t))); };
            })
            .duration(8000);

        dots.append("text")
            .attr("x", 5)
            .attr("y", 320)
            .text(function (d) { return data.data[i].click_count; })
            .attr("font-family", "Gill Sans, sans-serif")
            .attr("font-size", 14)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
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

        dots
            .append("line")
            .attr("x1", 5)
            .attr("y1", 328)
            .attr("x2", 125)
            .attr("y2", 328)
            .attr("stroke-width", 1)
            .attr("id", "info1")
            .style("opacity", 1)
            .attr("stroke", "#999")
    }
});

//--------------------------- Construction of the stacked dots from click counts.

d3.json("../DATA/opportunities.json", function (error, data) {

    for (i = 0; i < data.data.length; i++) {

        var dots = svgres.append("g")
            .attr("transform", function () {
                reverse = 1
                if (i < 4) { factor = 0; shift = 0; }
                else if (i < 8) { factor = 4; shift = 1; }
                else if (i < 12) { factor = 8; shift = 0 }
                else if (i < 16) { factor = 12; shift = 1 }
                return "translate(" + (numpitch + 100 * shift + numspace * (i - factor)) + "," + ((120 * factor / 4) - reverse * 50) + ")rotate(45)";
            })
            .attr("id", function (d) { return ("cont" + data.data[i].terms); })

        var brack = 3
        var balls = data.data[i].click_count / 5
        var filas = balls / brack
        var enteros = Math.ceil(balls / brack) - 1
        var resto = (filas - enteros) * 3

        if (resto >= 0) {
            for (lev = 0; lev < enteros; lev++) {
                for (k = 1; k <= brack; k++) {

                    dots.append("circle")
                        .attr("cx", k * 6)
                        .attr("cy", 300 - lev * 6)
                        .attr("r", 2)
                        .attr("fill", "red")
                }
            }
            for (r = 1; r <= resto; r++) {

                dots.append("circle")
                    .attr("cx", r * 6)
                    .attr("cy", 300 - (enteros) * 6)
                    .attr("r", 2)
                    .attr("fill","red")
            }
        }
    }
});