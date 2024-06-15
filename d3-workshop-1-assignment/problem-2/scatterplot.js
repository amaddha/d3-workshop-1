const container_id = 'scatterplot'; 
const width = 600, height = 400;
const margin = {
    top: 50,
    bottom: 50,
    left: 100,
    right: 50
}

const title_x_position = margin.left + (width - (margin.left + margin.right)) / 2;
const title_y_position = margin.top;

const x_axis_x_position = margin.left + (width - (margin.left + margin.right)) / 2;
const x_axis_y_position = height - margin.bottom /3;

const y_axis_x_position = margin.left / 3;
const y_axis_y_position = margin.top + (height - (margin.top + margin.bottom)) / 2;

const xScale = d3.scaleLinear().domain([-1e8, 1.8e9]).range([0, width - (margin.left + margin.right)]);
const yScale = d3.scaleLinear().domain([-1e8, 1.2e9]).range([height - (margin.top + margin.bottom), 0]);

const abbreviateNumber = function(num) {
    if (num / 1e9 >= 1)
        return '$' + (num / 1e9) + 'B';
    else if (num / 1e6 >= 1)
        return '$' + (num / 1e6) + 'M';
    else
        return '$' + num;
}

function drawXAxis(svg) {
    svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(' + margin.left + ',' + (height - margin.bottom) + ')')
        .call(d3.axisBottom(xScale).tickFormat(abbreviateNumber));
}

function drawYAxis(svg) {
    svg.append('g')
        .attr('class', 'y axis')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
        .call(d3.axisLeft(yScale).tickFormat(abbreviateNumber));
}

function drawDots(svg, data) {
    const dotGroup = svg.append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

    dotGroup.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.Income))
        .attr('cy', d => yScale(d.Revenue))
        .attr('r', 5);

    dotGroup.selectAll('.dot')
        .style('fill', '#4682B4')
        .style('stroke', '#fff');
}

function filterMuseums(data) {
    return data.filter(d => d['Museum Type'] === 'NATURAL HISTORY MUSEUM');
}

function drawScatterPlot(data) {
    let svg = d3.select('#' + container_id)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    drawXAxis(svg);
    drawYAxis(svg);
    drawDots(svg, data);

    svg.append('text')
        .attr('class', 'title')
        .attr('x', title_x_position)
        .attr('y', title_y_position)
        .text('Museum Income vs Revenue');

    svg.append('text')
        .attr('class', 'axis-label')
        .attr('x', x_axis_x_position)
        .attr('y', x_axis_y_position)
        .text('Income');

    svg.append('text')
        .attr('class', 'axis-label')
        .attr('x', y_axis_x_position)
        .attr('y', y_axis_y_position)
        .attr('transform', `rotate(-90, ${y_axis_x_position}, ${y_axis_y_position})`)
        .text('Revenue');
}

function main() {
    d3.csv('data/museums_edited.csv').then(data => {
        const filteredData = filterMuseums(data);

        filteredData.forEach(d => {
            d.Income = +d.Income;
            d.Revenue = +d.Revenue;
        });

        xScale.domain(d3.extent(filteredData, d => d.Income)).nice();
        yScale.domain(d3.extent(filteredData, d => d.Revenue)).nice();

        drawScatterPlot(filteredData);
    });
}

main();
