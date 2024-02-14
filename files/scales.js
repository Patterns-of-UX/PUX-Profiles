// Constants for layout
const scales_margin = { top: 40, right: 20, bottom: 10, left: 40 },
      scales_width = 150, // Width of each scale
      singleHeight = 47, // Height of a single scale including spacing
      scales_height = singleHeight * 10 + scales_margin.top + scales_margin.bottom, // Adjust based on the number of scales
      vertical_padding = 50; // Additional vertical spacing between scales

      const y_start=0;

      const scale_min=-1;
      const scale_max=1;

// Create SVG container
// const scales_svg = d3.select("#svg-container").append("svg")
//     .attr("width", scales_width + scales_margin.left + scales_margin.right)
//     .attr("height", scales_height);

// Updated setup for storing references and updating markers
const scales = []; // Store scale references


const scale_limits={
"CA1": 4,
"CA2": 12,
"CA3": 12,
"CA4": 12,
"IA1": 8,
"IA2": 8,
"IA3": 14,
"SA1": 10,
"SA2": 12,
"SA3": 14,
};

const xScales={};
// Function to draw a single scale and store its marker for updates
function drawScale(id) {
    const g = svg.append("g")
        .attr("transform", `translate(${scales_margin.left},${scales_margin.top + (singleHeight + vertical_padding) * id})`);
  
    // Define scale
    xScales[id] = d3.scaleLinear()
        // .domain([-scale_limits[activities[id].name], scale_limits[activities[id].name]])
        .domain([scale_min,scale_max])
        .range([0, scales_width]); // Make sure this is correct
  
    // Draw scale line
    g.append("g")
        .call(d3.axisBottom(xScales[id]).ticks(5)) // Use xScales[id] here
        .attr("transform", `translate(0,${singleHeight / 2})`);
  
    // Add marker and store reference
    const marker = g.append("line")
        .attr("x1", xScales[id](0)) // Use xScales[id](0) for initial position
        .attr("x2", xScales[id](0)) // Use xScales[id](0) for initial position
        .attr("y1", 0 + singleHeight / 4)
        .attr("y2", singleHeight / 2)
        .style("stroke", "red")
        .style("stroke-width", 2);
  
    scales[activities[id].name + "_scale"] = { marker, xScale: xScales[id] }; // Store reference to xScales[id]
  }
  
  // Draw scales for each activity
  activities.forEach((activity, index) => drawScale(index));
  


  function updateScale(id, value) {
    console.log("updating", id, value);
    let normalised_value=value/scale_limits[id];
    console.log("normalised", id, normalised_value);

    const scaleName = id + "_scale"; // Assuming id is the index and you want to use the name for lookup
    if (scales[scaleName]) {
        const { marker, xScale } = scales[scaleName];
    //    marker.attr("x1", xScale(value)).attr("x2", xScale(value));
        marker.attr("x1", xScale(normalised_value)).attr("x2", xScale(normalised_value));
    }
}


// Example usage
// updateScale("CA1", -5);
