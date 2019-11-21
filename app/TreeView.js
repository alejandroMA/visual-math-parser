'use strict';

const d3 = require('d3');

function TreeView(containerNode) {
    let margin = { top: 20, right: 20, bottom: 20, left: 20 };
    let width = 800 - margin.right - margin.left;
    let height = 500 - margin.top - margin.bottom;

    let duration = 600;
    let radius = 15;

    let _tree = {};

    var zoom = d3.behavior
        .zoom()
        .scaleExtent([0.25, 1.5])
        .translate([width / 2, margin.top + 30])
        .on('zoom', zoomed);

    var diagonal = d3.svg.diagonal().projection(function(d) {
        return [d.x, d.y];
    });

    var treeLayout = d3.layout
        .tree()
        .size([width, height])
        .nodeSize([65, 65])
        .children(function(d) {
            if (!d.leftChild && !d.rightChild) return null;

            return [
                d.leftChild !== undefined ? d.leftChild : (d.leftChild = {}),
                d.rightChild !== undefined ? d.rightChild : (d.rightChild = {})
            ];
        });

    var svg = d3
        .select(containerNode)
        .append('svg')
        .attr('class', 'tree-view')
        .attr('width', width + margin.right + margin.left)
        .attr('height', height + margin.top + margin.bottom)
        .call(zoom)
        .append('g')
        .attr(
            'transform',
            'translate(' +
                (width + margin.right + margin.left) / 2 +
                ',' +
                (margin.top + radius * 2) +
                ')'
        );

    var node = svg.selectAll('g.node');
    var link = svg.selectAll('path.link');

    function update() {
        // Compute the new tree layout.
        var nodes = treeLayout.nodes(_tree);
        var links = treeLayout.links(nodes);

        // Normalize for fixed-depth.
        nodes.forEach(function(d) {
            // d.y = d.depth * ((height - 100) / Math.sqrt(nodes.length));
            d.y = d.depth * 80;
        });

        // Update the nodes…
        let usedDepths = [];
        node = node.data(nodes, function(d) {
            if (d.id !== undefined) {
                return d.id;
            }

            let id = Math.pow(2, d.depth) - 1;
            if (d.parent !== undefined) {
                let parentPositionInLevel = d.parent.id - ((id + 1) / 2 - 1);
                id = id + parentPositionInLevel * 2;
            }

            for (let i = id; i <= id * 2; i++) {
                if (usedDepths.indexOf(i) === -1) {
                    usedDepths.push(i);
                    return (d.id = i);
                }
            }

            return 10000000000;
        });
        // console.log(usedDepths);

        // Transition nodes to their new position.
        var nodeUpdate = node
            .transition()
            .delay(duration / 3)
            .duration(duration / 3)
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            })
            // .style('opacity', 1);
            .style('opacity', function(d) {
                return d.data !== undefined ? 1 : 0;
            });

        nodeUpdate.select('text').text(function(d) {
            if (isNaN(d.data)) {
                return d.data;
            } else {
                return Math.round(d.data * 100) / 100;
            }
        });

        // Enter any new nodes at the parent's previous position.
        var nodeEnter = node
            .enter()
            .append('g')
            .attr('class', 'node')
            .style('opacity', 0)
            .attr('transform', function(d) {
                if (d.parent === undefined) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                }
                return 'translate(' + d.parent.x + ',' + d.parent.y + ')';
            });

        nodeEnter.append('circle').attr('r', 30);

        nodeEnter
            .append('text')
            .attr('x', 0)
            .attr('y', 0)
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .text(function(d) {
                return d.data;
            });

        nodeEnter
            .transition()
            .delay(duration * (2 / 3))
            .duration(duration / 3)
            .attr('transform', function(d) {
                return 'translate(' + d.x + ',' + d.y + ')';
            })
            .style('opacity', function(d) {
                return d.data !== undefined ? 1 : 0;
            });

        // Transition exiting nodes to the parent's new position.
        node.exit()
            .transition()
            .duration(duration / 3)
            .attr('transform', function(d) {
                if (d.parent === undefined) {
                    return 'translate(' + d.x + ',' + d.y + ')';
                }
                return 'translate(' + d.parent.x + ',' + d.parent.y + ')';
            })
            .style('opacity', 0)
            .remove();

        // Update the links…
        link = link.data(links, function(d) {
            return d.source.id + '-' + d.target.id;
        });

        // Transition links to their new position.
        link.transition()
            .delay(duration * (1 / 3))
            .duration(duration / 3)
            // .style('opacity', 1)
            .style('opacity', function(d) {
                return d.target.data !== undefined ? 1 : 0;
            })
            .attr('d', diagonal);

        // Enter any new links at the parent's previous position.
        let linkEnter = link
            .enter()
            .insert('path', 'g')
            .attr('class', 'link')
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
            });

        linkEnter
            .transition()
            .delay(duration * (2 / 3))
            .duration(duration / 3)
            .style('opacity', function(d) {
                return d.target.data !== undefined ? 1 : 0;
            })
            .attr('d', diagonal);

        // Transition exiting nodes to the parent's new position.
        link.exit()
            .transition()
            .duration(duration / 3)
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
    }

    function zoomed() {
        svg.attr(
            'transform',
            'translate(' +
                d3.event.translate +
                ')' +
                'scale(' +
                d3.event.scale +
                ')'
        );
    }

    return {
        render(tree) {
            _tree = tree;

            update();
        },
        clear() {
            _tree = {};

            // node.data([]).exit().remove();
            // link.data([]).exit().remove();

            node.attr('opacity', 0);
            link.attr('opacity', 0);
        }
    };
}

module.exports = TreeView;
