
        var widthres = 980;
        var heightres = 900;

        var svgres = d3.select("div.leftpolyresources-div")
            .append("svg")
            .attr("width", widthres)
            .attr("height", heightres)

        fmapres = svgres.append("g")
        reslegend = svgres.append("g")

        var list_scenarios = ["5 queries", "5 clicks"]

        for (k = 0; k < list_scenarios.length; k++) {

            reslegend.append("text")
                .attr("x", function (d) { return 860; })
                .attr("y", 10 + k * 15)
                .text(function (d) { return list_scenarios[k]; })
                .attr("font-family", "Gill Sans Light, Century Gothic, sans-serif")
                .attr("font-size", 10)
                .attr("font-weight", "lighter")
                .attr("opacity", 1)
                .style("fill", "#666")

            reslegend.append("circle")
                .attr("cx", function (d) { return 850; })
                .attr("cy", 6 + k * 15)
                .attr("r", 3)
                .style("opacity", .8)
                .attr("id", function (d) { return "isl" })
                .attr("fill", function (d) {
                    if (k == 0) return "#bbb";
                    else return "#000";
                })
                .attr("stroke", function (d) { return "none"; })
        }

        h = svgres.append("g")
            .attr("transform", function (d) {
                return "translate(" + (0) + "," + (0) + ")";
            })

        var lineGenerator = d3.line()
            .curve(d3.curveCardinal);

        var radius = 270


        d3.json("../DATA/opportunities.json", function (error, data) {

            for (let dd = 0; dd < data.data.length; dd++) {

                var items = data.data.length;

                var dotsback = h.append("g")

                for (let cc = 0; cc < data.data[dd].click_count; cc++) {

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
                .attr("font-size", 10)
                .attr("font-weight", "lighter")
                .attr("text-anchor", "middle")
                .attr("opacity", 1)
                .style("fill", "#666")
        })