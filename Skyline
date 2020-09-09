   var widthres = 980;
        var heightres = 900;

        var svgres = d3.select("div.leftpolyresources-div")
            .append("svg")
            .attr("width", widthres)
            .attr("height", heightres)

        fmapres = svgres.append("g")
        reslegend = svgres.append("g")

        var lineGenerator = d3.line()
            .curve(d3.curveCardinal);

        var radius = 220
        var items = 16;
        var thepitch = 15
        var vpitch = 30
        var thelim = 29

        var thejson = "./opportunities.json"

        field1 = [];
        field2 = [];

        h = svgres.append("g")
        h2 = svgres.append("g")


        d3.json(thejson, function (json) {
            console.log(json.data)
            dajson = json.data
            dajson.map(function (d) {
                field1.push(d.query_count / 20);
                field2.push(d.click_count)
            })

            const cumulativeSum = (sum => value => sum += value)(0);

            newfield = field1.map(cumulativeSum)

            h.selectAll("rect").data(json.data).enter()
                .append("rect")
                .attr("x", function (d, i) { return newfield[i] - newfield[0]; })
                .attr("y", function (d) { return 30; })
                .attr("height", function (d) { return 300; })
                .attr("width", function (d, i) { return field1[i]; })
                .style("opacity", function (d, i) { return 1; })
                .attr("fill", function (d, i) { return d3.rgb(155 - i * 10, 155 - i * 10, 155 - i * 10); })
                .attr("stroke", "white");

            h.selectAll("text").data(json.data).enter()
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", function (d, i) { return newfield[i] - newfield[0]; })
                .attr("x", 0 - (340))
                .attr("dy", "1em")
                .style("text-anchor", "end")
                .text(function (d, i) { return d.terms; })
                .attr("font-family", "Gill Sans, serif")
                .attr("font-size", 12)
                .attr("opacity", 1)
                .attr("id", "theyaxis")
                .style("fill", "black");

            h2.selectAll("text").data(json.data).enter()
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", function (d, i) { return 13 + newfield[i] - newfield[0]; })
                .attr("x", 0 - (340))
                .attr("dy", "1em")
                .style("text-anchor", "end")
                .text(function (d, i) { return d.click_count + " of " + d.query_count; })
                .attr("font-family", "Gill Sans, serif")
                .attr("font-size", 12)
                .attr("opacity", 1)
                .attr("id", "theyaxis")
                .style("fill", "#999");

            for (o = 0; o < newfield.length; o++) {

                thenum = field2[o]

                for (k = 0; k < thenum; k++) {

                    randy = Math.random()
                    randx = Math.random()

                    h
                        .append("circle")
                        .attr("cx", function (d, i) { return newfield[o] - newfield[0] + randx * field1[o]; })
                        .attr("cy", 30 + randy * 300)
                        .attr("r", 1)
                        .style("opacity", 1)
                        .attr("id", function (d) { return "isl" })
                        .attr("fill", function (d) { return "white"; })
                        .attr("stroke", function (d) { return "none"; })
                }
            }
        });
