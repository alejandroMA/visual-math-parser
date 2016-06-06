'use strict';

const d3 = require('d3');

function treeView(svgNode) {
    let margin = { top: 20, right: 20, bottom: 20, left: 20 };
    let width = 800 - margin.right - margin.left;
    let height = 500 - margin.top - margin.bottom;

    var i = -10;
    let duration = 1000;
    let radius = 15;
    let rectW = 50;
    let rectH = 50;

    let _tree = {};


    var zoom = d3.behavior.zoom()
        .scaleExtent([-4, 2])
        .on('zoom', zoomed);

    zoom.translate([(width / 2), (margin.top + 30)]);

    var diagonal = d3.svg.diagonal()
    .projection(function(d) {
        // console.log(d);
        return [d.x, d.y];
    });

    var treeLayout = d3.layout.tree().size([height - 30, (margin.top + 30)]);
    treeLayout.nodeSize([65, 65]);

    var svg = d3.select('body').append('svg')
        .attr('class', 'tree-view')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .call(zoom)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) + ',' + (margin.top + 30) + ')');
    // var svg = d3.select(svgNode)
    //     .attr('width', width + margin.right + margin.left)
    //     .attr('height', height + margin.top + margin.bottom)
    //     .append('g')
    //     .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


    var node = svg.selectAll('g.node');
    var link = svg.selectAll('path.link');

    function update() {

        // _tree.parent = _tree;
        _tree.x_old = width / 2;
        _tree.y_old = 0;

        // Compute the new tree layout.
        var nodes = treeLayout.nodes(_tree);
        var links = treeLayout.links(nodes);

        nodes.forEach(function(d) {
            d.x_old = d.x;
            d.y_old = d.y;
        });

        // Normalize for fixed-depth.
        nodes.forEach(function(d) {
            d.y = d.depth * ((height - 100) / Math.sqrt(nodes.length));
            // d.y = d.depth * 120;
            // console.log(nodes.legth);
        });

        // Update the nodes…
        // svg.selectAll('g.node').remove();
        // var node = svg.selectAll('g.node').data(nodes);
        let usedDepths = [];
        let ds = [];
        node = node.data(nodes, function(d) {
            ds.push(d);
            if (d.id === undefined) {
                let id = Math.pow(2, d.depth) - 1;
                if (d.parent !== undefined) {
                    let parentPositionInLevel = d.parent.id - (((id + 1) / 2) - 1);
                    id = id + (parentPositionInLevel * 2);
                }

                console.log(d.depth + '-' + id);

                for (let i = id; i <= id * 2; i++) {
                    if (usedDepths.indexOf(i) === -1) {
                        usedDepths.push(i);
                        return d.id = i;
                    }
                }

                return 10000000000;
            }

            return d.id;
        });
        console.log(ds);
        console.log(usedDepths);

        // Transition nodes to their new position.
        // node.attr('transform', function(d) {
        //         return 'translate(' + (d.x) + ',' + (d.y) + ')';
        // });

        var nodeUpdate = node.transition()
            .delay(duration / 3)
            .duration(duration / 3)
            .attr('transform', function(d) {
                return 'translate(' + (d.x) + ',' + (d.y) + ')';
            })
            .style('opacity', 1);

        nodeUpdate.select('text').text(function(d) {
            return d.data;
        });


        // nodeUpdate.select('text')
        //     .style('fill-opacity', 1);

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .style('opacity', 0)
            // .attr('transform', function(d) {
            //     return 'translate(' + (d.x) + ',' + (d.y) + ')';
            // });
            .attr('transform', function(d) {
                if (d.parent === undefined) {
                    return 'translate(' + (width/2) + ',' + 0 + ')';
                }
                return 'translate(' + (d.parent.x) + ',' + (d.parent.y) + ')';
        });

        nodeEnter.append('circle')
            .attr('r', 30);

        nodeEnter.append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text(function(d) {
            return d.data;
        });
        
        nodeEnter.transition()
            .delay(duration * (2 / 3))
            .duration(duration / 3)
            .attr('transform', function(d) {
                return 'translate(' + (d.x) + ',' + (d.y) + ')';
            })
            .style('opacity', 1);


        // Transition exiting nodes to the parent's new position.
        var nodeExit = node.exit().transition()
            .duration(duration / 3)
            .attr('transform', function(d) {
                return 'translate(' + (d.parent.x) + ',' + (d.parent.y) + ')';
            })
            .style('opacity', 0)
            .remove();

        nodeExit.select('rect')
            .attr('width', rectW)
            .attr('height', rectH);
        // .attr('width', bbox.getBBox().width)'
        // .attr('height', bbox.getBBox().height);

        nodeExit.select('text');





        // Update the links…
        // svg.selectAll('path.link').remove();
        // var link = svg.selectAll('path.link').data(links);
        link = link.data(links, function(d) {
            return d.source.id + '-' + d.target.id;
        });

        // Transition links to their new position.
        link.transition()
            .delay(duration * (1 / 3))
            .duration(duration / 3)
            .style('opacity', 1)
            .attr('d', diagonal);

        // Enter any new links at the parent's previous position.
        let linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .style('opacity', 0)
            // .attr('d', diagonal)
            .attr('d', function(d) {
                var o = {
                    x: d.target.parent.x_old,
                    y: d.target.parent.y_old
                };
                return diagonal({
                    source: o,
                    target: o
                });
        });


        linkEnter.transition()
            .delay(duration * (2 / 3))
            .duration(duration / 3)
            .style('opacity', 1)
            .attr('d', diagonal);


        // Transition exiting nodes to the parent's new position.
        link.exit().transition()
            .duration(duration / 3)
            .attr('d', diagonal);

        link.exit().transition()
            // .delay(duration / 2)
            .duration(duration / 2)
            .style('opacity', 0)
            .attr('d', function(d) {
                var o = {
                    x: d.target.parent.x,
                    y: d.target.parent.y
                };
                return diagonal({
                    source: o,
                    target: o
                });
            })
            .remove();

        // Stash the old positions for transition.
        nodes.forEach(function(d) {
            d.x_old = d.x;
            d.y_old = d.y;
        });
    }

    function zoomed() {
        svg.attr('transform', 'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')');
    }

    return {
        render(tree) {
             _tree = tree;

            update();
            console.log(_tree);
        },
        clear() {

        }
    };
}

module.exports = treeView;
