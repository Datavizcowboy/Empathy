

        var widthres = 980;
        var heightres = 900;

        var svgres = d3.select("div.leftpolyresources-div")
            .append("svg")
            .attr("width", widthres)
            .attr("height", heightres)

        fmapres = svgres.append("g")
        reslegend = svgres.append("g")

        h = svgres.append("g")
            .attr("transform", function (d) {
                return "translate(" + (200) + "," + (200) + ")";
            })

        var lineGenerator = d3.line()
            .curve(d3.curveCardinal);

        var radius = 220
        // var items = 16;

        var thejson = "../DATA/opportunities.json"

        field1 = [];
        field2 = [];

        d3.json(thejson, function (json) {
            console.log(json.data)
            dajson = json.data
            dajson.map(function (d) {
                field1.push(d.query_count / 40);
                field2.push(d.click_count / 40)
            })

            items = field1[0]
            itemsclick = field2[0]

            var data = d3.range(items).map(function (i) {
                return {
                    'x': i,
                    'y': i
                };
            });

            var xcos = d3.scaleLinear()
                .domain([0, data.length])
                .range([Math.PI * 0, Math.PI * 2]);

            var xcos1 = d3.scaleLinear()
                .domain([0, data.length])
                .range([0, Math.PI]);

            var ysin = d3.scaleLinear()
                .domain([0, data.length])
                .range([Math.PI * 0, Math.PI * 2]);

            var innerRadius = 100;
            var outerRadius = 200;

            for (var ii = 0; ii < items; ii++) {

                var rand2 = Math.random()

                var thex = radius * Math.cos(2 * Math.PI * ii / items);
                var they = radius * Math.sin(2 * Math.PI * ii / items);

                var dotsback = h.append("g")
                    .attr("transform", function (d) {
                        return "translate(" + (300 + thex) + "," + (250 + they) + ")rotate(45)";
                    })

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

                var maxnum = Math.ceil(Math.random() * 10)
                var mypoints = [[20, 10], [40, 60], [20, 80], [0, 60], [20, 10]];
                var pathData = lineGenerator(mypoints);

                dots
                    .append('path')
                    .attr('d', pathData)
                    .style('stroke-width', function (d) { return 1 })
                    .style('stroke', function (d) { return "none" })
                    .attr("id", function (d, i) { return "flow" + i })
                    .style("opacity", function (d) { return .3; })
                    .style("fill", function (d) { return d3.rgb(100, 100, 100); })
            }

            for (var m = 0; m < itemsclick + 1; m++) {
                console.log(m)

                d3.select("#flow" + m)
                    .style("opacity", function (d) { return .3; })
                    .style("fill", function (d) { return "darkorange"; })
            }
        })
