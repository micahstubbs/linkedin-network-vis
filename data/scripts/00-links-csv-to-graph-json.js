var fs = require('fs');
var d3 = require('d3');
var _ = require('lodash');
var jsonfile = require('jsonfile');

var inputFile = '../input/links-labels.csv';
var data = d3.csv.parse(fs.readFileSync(inputFile, 'utf-8'));

var graph = {};
graph.links = [];
graph.nodes = [];

var nodesByLabel = {};
var currentId = 0;
var currentNode;

data.forEach(function (link) {
	if (typeof nodesByLabel[link.source] === 'undefined') {
		currentNode = {
			label: link.source,
			id: graph.nodes.length
		};
		nodesByLabel[link.source] = currentNode;
		graph.nodes.push(currentNode);
	}

	if (typeof nodesByLabel[link.target] === 'undefined') {
		currentNode = {
			label: link.target,
			id: graph.nodes.length
		};
		nodesByLabel[link.target] = currentNode;
		graph.nodes.push(currentNode);		
	}

	graph.links.push({
		sourceLabel: link.source,
		targetLabel: link.target,
		source: nodesByLabel[link.source].id,
		target: nodesByLabel[link.target].id,
	})
})

console.log('graph.links.length', graph.links.length);
console.log('graph.nodes.length', graph.nodes.length);

var outputData = graph;
var outputFile = '../output/graph.json';
jsonfile.spaces = 2;

jsonfile.writeFile(outputFile, outputData, function (err) {
	console.error(err);
})
