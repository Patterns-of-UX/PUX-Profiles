class Windrose {
  constructor(config) {
    this.degrees = config.degrees;
    this.values = config.values;
    this.values_list=Object.values(this.values);

    this.names = config.names; // Add names to the configuration
    this.windroseWidth = config.windrose_width;
    this.windroseHeight = config.windrose_height;
    this.referenceRadius = config.referenceRadius;
    this.targetDiv = config.target_div;
    this.color = d3.scaleOrdinal()
        .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    
    // Calculate the maximum value for scaling purposes
    // this.maxValue = Math.max(...this.values_list);
    this.maxValue=100;

    // Initialize SVG
    this.initSvg();
    
    // Draw the windrose
    this.drawSlices();
    this.drawReferenceArcs();
    this.drawRadialLines();
    this.drawNames(); // Method to draw names
}

  initSvg() {
    this.svg = d3.select(`#${this.targetDiv}`).append("svg")
        .attr("width", this.windroseWidth)
        .attr("height", this.windroseHeight)
        .append("g")
        .attr("transform", `translate(${this.windroseWidth / 2},${this.windroseHeight / 2})`);
}

degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

  drawSlices() {
    let cumulativeDegrees = 0;
    const radiusScale = d3.scaleLinear()
        .domain([0, this.maxValue])
        .range([0, this.referenceRadius]); // Scale values to fit within the reference radius
    
    this.degrees.forEach((degree, i) => {
        const startAngle = this.degreesToRadians(cumulativeDegrees);
        const endAngle = startAngle + this.degreesToRadians(degree);
        cumulativeDegrees += degree;
        
        const outerRadius = radiusScale(this.values_list[i]); // Use scaled value

        const arc = d3.arc()
            .innerRadius(0)
            .outerRadius(outerRadius)
            .startAngle(startAngle)
            .endAngle(endAngle);

        this.svg.append("path")
            .attr("d", arc)
            .style("fill", this.color(i))
            .style("stroke", "#ffffff")
            .style("stroke-width", 1);
    });
}

  drawReferenceArcs() {
      let tempReferenceRadius = this.referenceRadius;
      for (let i = 0; i < 20; i++) {
          const referenceArc = d3.arc()
              .innerRadius(tempReferenceRadius - 4)
              .outerRadius(tempReferenceRadius)
              .startAngle(0)
              .endAngle(2 * Math.PI);

          this.svg.append("path")
              .attr("d", referenceArc)
              .style("fill", "#6495ED")
              .style("opacity", 0.25)
              .style("stroke", "#ffffff")
              .style("stroke-width", 3);

          tempReferenceRadius -= 5;
      }
  }

  drawRadialLines() {
      let cumulativeDegrees = 0;
      this.degrees.forEach((degree, i) => {
          const startAngle = this.degreesToRadians(cumulativeDegrees);
          const endAngle = this.degreesToRadians(cumulativeDegrees + degree);
          cumulativeDegrees += degree;

          const drawLine = (angle) => {
              const lineEndX = (this.referenceRadius + 20) * Math.cos(angle - Math.PI / 2);
              const lineEndY = (this.referenceRadius + 20) * Math.sin(angle - Math.PI / 2);

              this.svg.append("line")
                  .attr("x1", 0)
                  .attr("y1", 0)
                  .attr("x2", lineEndX)
                  .attr("y2", lineEndY)
                  .style("stroke", "black")
                  .style("stroke-width", 1)
                  .style("stroke-dasharray", "3, 3");
          };

          drawLine(startAngle);
          if (i === this.degrees.length - 1) {
              drawLine(endAngle);
          }
      });
  }


  drawNames() {
    let cumulativeDegrees = 0;
    this.degrees.forEach((degree, i) => {
        const midAngle = this.degreesToRadians(cumulativeDegrees + degree / 2);
        const labelRadius = this.referenceRadius + 10; // Offset for labels outside the arcs
        const x = labelRadius * Math.cos(midAngle - Math.PI / 2);
        const y = labelRadius * Math.sin(midAngle - Math.PI / 2);

// console.log(activities[this.names[i]]);

// let result = findElementByKey(activities, 'id', this.names[i]);
let result=activities_dict[this.names[i]];
console.log(result);

        this.svg.append("text")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ".35em")
            .style("text-anchor", midAngle > Math.PI || midAngle < 0 ? "end" : "start")
            // .text(activities.find(obj => obj[id] === this.names[i]))
            // .text(result)
            .text(this.names[i])
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("fill", "black");

        cumulativeDegrees += degree;
    });
}

updateValuesAndRedraw(newValues) {
  console.log("old values", this.values);
  // Update values
  Object.keys(newValues).forEach((key, i) => {
    if (this.values[key] !== undefined) {
      this.values[key] = newValues[key];
    }
  });
  this.values_list=Object.values(this.values);

  console.log("new values", this.values);

  // Update maxValue for scaling
  // this.maxValue = Math.max(...Object.values(this.values_list));

  // Clear existing SVG content
  d3.select(`#${this.targetDiv}`).select("svg").remove();

  // Re-initialize and draw
  this.initSvg();
  // this.draw();

  // Draw the windrose
  this.drawSlices();
  this.drawReferenceArcs();
  this.drawRadialLines();
  this.drawNames(); // Method to draw names
}


}
// Function to find element based on keys
// function findElementByKey(list, key, value) {
//   return list.find(obj => obj[key] === value);
// }
function findElementByKey(list, key, value) {
  return list.find(obj => obj[key] == value);
}


const namez=["IA1",
"IA2",
"IA3",
"CA1",
"CA2",
"CA3",
"CA4",
"SA1",
"SA2",
"SA3"];

// const valuez={
// "IA1":10,
// "IA2":70,
// "IA3":15,
// "CA1":5,
// "CA2":100,
// "CA3":50,
// "CA4":45,
// "SA1":25,
// "SA2":67,
// "SA3":95};

const valuez={
"IA1":50,
"IA2":50,
"IA3":50,
"CA1":50,
"CA2":50,
"CA3":50,
"CA4":50,
"SA1":50,
"SA2":50,
"SA3":50};

// Configuration object based on your provided setup
const windroseConfig = {
  degrees: [25, 79, 37, 15, 44, 79, 30, 13, 16, 22],
  values: valuez ,
  // names: ["Search", "Comparison", "Sense-making", "Incrementation", "Transcription", "Modification", "Exploratory design", "Illustrate a story", "Organise a discussion", "Persuade an audience"],
  names: namez,
  windrose_width: 300,
  windrose_height: 300,
  referenceRadius: 100,
  target_div: "windrose-svg" // ID of the div where the SVG should be appended
};
// Configuration object based on your provided setup
const pieConfig = {
  degrees: [25, 79, 37, 15, 44, 79, 30, 13, 16, 22],
  values: [100, 100, 100, 100, 100, 100, 100, 100, 100,100],
  // names: ["Search", "Comparison", "Sense-making", "Incrementation", "Transcription", "Modification", "Exploratory design", "Illustrate a story", "Organise a discussion", "Persuade an audience"],
  names:[],
  windrose_width: 300,
  windrose_height: 300,
  referenceRadius: 80,
  target_div: "pie-svg" // ID of the div where the SVG should be appended
};

// Instantiate the Windrose with the provided configuration
new Windrose(pieConfig);
// Instantiate the Windrose with the provided configuration
let windrose_plot=new Windrose(windroseConfig);



// var degrees = [90, 10, 5, 3, 2, 180, 70]; // Degrees of each slice
// var values = [60, 100, 70, 20, 52, 10, 20]; // Values to determine the outer radius of each slice
// var names = ["one", "two", "three", "four", "five", "six", "seven"]; // Category names

// var names = [
//   "Search",
//   "Comparison",
//   "Sense-making",
//   "Incrementation",
//   "Transcription",
//   "Modification",
//   "Exploratory design",
//   "Illustrate a story",
//   "Organise a discussion",
//   "Persuade an audience"
// ];

// // Updated degrees array to match the new total of categories
// // This is an example; adjust the degrees as needed for your visualization
// var degrees = [25, 79, 37, 15, 44, 79, 30, 13, 16, 22];


// // Updated values array for outer radius adjustments
// // This is an example; adjust the values based on your preference for slice prominence
// var values = [10, 70, 15, 5, 100, 50, 45, 25, 67, 95];


// var windrose_width = 400;
// var windrose_height = 400;
// var baseRadius = 0; // Base radius for the slices
// var referenceRadius = 100; // Starting radius for the reference arcs

// // var color = d3.scale.ordinal()
// //   .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
// var color = d3.scaleOrdinal()
//   .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);


// var windrose_svg = d3.select("#windrose-svg").append("svg")
//   .attr("width", windrose_width)
//   .attr("height", windrose_height)
//   .append("g")
//   .attr("transform", "translate(" + windrose_width / 2 + "," + windrose_height / 2 + ")");




// // Function to convert degrees to radians
// function degrees_to_radians(degrees) {
//   return degrees * (Math.PI / 180);
// }

// // Draw the variable slices
// var cumulativeDegrees = 0;
// degrees.forEach(function(degree, i) {
//   var startAngle = degrees_to_radians(cumulativeDegrees);
//   var endAngle = startAngle + degrees_to_radians(degree);
//   cumulativeDegrees += degree;
  
//   var outerRadius = baseRadius + values[i]; // Calculate dynamic outer radius

//   var arc = d3.arc()
//     .innerRadius(0) // Start from the center
//     .outerRadius(outerRadius)
//     .startAngle(startAngle)
//     .endAngle(endAngle);


//   windrose_svg.append("path")
//     .attr("d", arc)
//     .style("fill", color(i))
//     .style("stroke", "#ffffff")
//     .style("stroke-width", 1);
// });

// // Draw the blue reference arcs
// var tempReferenceRadius = referenceRadius;
// for (var i = 0; i < 20; i++) {
//   var referenceArc = d3.arc()
//   .innerRadius(tempReferenceRadius - 4)
//   .outerRadius(tempReferenceRadius)
//   .startAngle(0)
//   .endAngle(2 * Math.PI); // Full circle


//   windrose_svg.append("path")
//     .attr("d", referenceArc)
//     .style("fill", "#6495ED")
//     .style("opacity", 0.25)
//     .style("stroke", "#ffffff")
//     .style("stroke-width", 3);

//   tempReferenceRadius -= 5; // Decrease for the next arc
// }

// // Calculate the start angle of each slice in radians for the radial lines
// var cumulativeDegreesForLines = 0;
// degrees.forEach(function(degree, i) {
//   var startAngle = degrees_to_radians(cumulativeDegreesForLines); // Start angle of the current slice
//   var endAngle = degrees_to_radians(cumulativeDegreesForLines + degree); // End angle of the current slice
//   cumulativeDegreesForLines += degree; // Prepare for the next slice by updating cumulative degrees

//   // Function to draw a line from the pie center to the outermost reference arc
//   function drawLine(angle) {
//     var lineEndX = (referenceRadius + 20) * Math.cos(angle - Math.PI / 2); // Adjusted to reach beyond the last arc
//     var lineEndY = (referenceRadius + 20) * Math.sin(angle - Math.PI / 2);

//     windrose_svg.append("line")
//       .attr("x1", 0)
//       .attr("y1", 0)
//       .attr("x2", lineEndX)
//       .attr("y2", lineEndY)
//       .style("stroke", "black")
//       .style("stroke-width", 1)
//       .style("stroke-dasharray", "3, 3"); // Makes the line dashed
//   }

//   // Draw lines at the start and end of each slice
//   drawLine(startAngle);
//   if (i === degrees.length - 1) { // Also draw a line at the very end of the last slice
//     drawLine(endAngle);
//   }

//   // Calculate the position for the category name
//   var midAngle = startAngle + (endAngle - startAngle) / 2; // Midpoint angle of the slice
//   var labelRadius = referenceRadius + 25; // Position
//   // Position the label slightly beyond the last reference arc
//   var labelX = labelRadius * Math.cos(midAngle - Math.PI / 2);
//   var labelY = labelRadius * Math.sin(midAngle - Math.PI / 2);

//   // Add category names at the midpoint of each slice edge, adjusting for text alignment
//   windrose_svg.append("text")
//     .attr("x", labelX)
//     .attr("y", labelY)
//     .attr("dy", ".35em") // Center text vertically
//     .style("text-anchor", midAngle > Math.PI || midAngle < 0 ? "end" : "start") // Adjust text anchor based on angle
//     .text(names[i])
//     .style("font-family", "sans-serif")
//     .style("font-size", "10px")
//     .style("fill", "black");
// });

// //https://jsfiddle.net/g9Lh310p/