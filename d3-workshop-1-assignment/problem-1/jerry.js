
function makeJerry(jerry){
    let width = 200, height = 200
    
    // Create an svg element in the DOM to hold Jerry 
    let svg = d3.select('#jerry')
                .append('svg')
                    .attr('width', width)
                    .attr('height', height)

    // Define width and height of a square representing a Jerry pixel
    // You may want to use these values in your code below
    let square_width  = width/17,
        square_height = height/17              

    jerry.forEach((row,i) => {
        svg.selectAll('row') // A new empty selection for the current row of Jerry. Note: This is valid even though there are no <row> elements in the HTML.
            /* TODO: 
                1. Bind the row array to this selection.
                2. Use enter() and append() to create a square for each of the 17 pixels in the row array
                3. Set the necessary attributes for the squares
                    Hint: These attributes should use square_width and/or square_height
                    Hint: The x and y coordinates should depend on the corresponding Jerry pixel's i and j values respectively.
                4. Style the squares
                    Hint: row is an array of rgb strings, which are valid values for the fill property in css.
                    */
            .data(row)
            .enter()
            .append('rect')
            .attr('width', square_width)
            .attr('height', square_height)
            .attr('x', (d, j) => j * square_width)
            .attr('y', i * square_height)
            .attr('fill', d => d);
    });
    
}

d3.json('data/jerry_codes.json').then(makeJerry)