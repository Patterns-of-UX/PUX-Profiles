class Windrose {
  constructor(config) {
    this.degrees = config.degrees;
    this.values = config.values;
    this.values_list=Object.values(this.values);
    this.repulsion_force=config.repulsion_force;
    this.names = config.names; // Add names to the configuration
    this.windroseWidth = config.windrose_width;
    this.windroseHeight = config.windrose_height;
    this.referenceRadius = config.referenceRadius;
    this.targetDiv = config.target_div;
    // this.color = d3.scaleOrdinal()
    //     .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
    // this.color = d3.scaleOrdinal(d3.schemeCategory10);
    this.color = d3.scaleOrdinal()
    .range([
        "#1f77b4", // muted blue
        "#aec7e8", // light blue
        "#ff7f0e", // bright orange
        "#ffbb78", // light orange
        "#2ca02c", // forest green
        "#98df8a", // light green
        "#d62728", // brick red
        "#ff9896", // salmon
        "#9467bd", // muted purple
        "#c5b0d5"  // light purple
    ]);

    
    // Calculate the maximum value for scaling purposes
    // this.maxValue = Math.max(...this.values_list);
    this.maxValue=100;

    // Initialize SVG
    this.initSvg();
    
    // Draw the windrose
    this.drawSlices();
    if(this.targetDiv=="windrose-svg"){
      this.drawReferenceArcs();
    }

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
              .style("opacity", 0.2)
              .style("stroke", "#ffffff")
              .style("stroke-width", 3.5);

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
              const lineEndX = (this.referenceRadius*1.05) * Math.cos(angle - Math.PI / 2);
              const lineEndY = (this.referenceRadius*1.05) * Math.sin(angle - Math.PI / 2);
             

              if(this.targetDiv=="windrose-svg"){

                this.svg.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", lineEndX)
                .attr("y2", lineEndY)
                .style("stroke", "black")
                .style("stroke-width", 0.5)
                .style("stroke-dasharray", "3, 3");
              }else{
                this.svg.append("line")
                .attr("x1", 0)
                .attr("y1", 0)
                .attr("x2", lineEndX)
                .attr("y2", lineEndY)
                .style("stroke", "black")
                .style("stroke-width", 0.1)
                .style("stroke-dasharray", "3, 3");

              }
            
          };

          drawLine(startAngle);
          if (i === this.degrees.length - 1) {
              drawLine(endAngle);
          }
      });
  }

  //this.targetDiv
  
    drawNames() {
    let cumulativeDegrees = 0;
    this.degrees.forEach((degree, i) => {
        const midAngle = this.degreesToRadians(cumulativeDegrees + degree / 2);
        // const labelRadius = this.referenceRadius + 10; // Offset for labels outside the arcs
        let radius_multiplier=1.1;

        if(this.targetDiv=="pie-svg"){
          radius_multiplier=1.2;
        }
        const labelRadius = this.referenceRadius*radius_multiplier; // Adjusted for potential force simulation movement

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
            .attr("class", "pie-text")
            .attr("id",  findEntryByName(this.names[i]).id+"_pie_text")
            .style("font-family", "sans-serif")
            .style("font-size", "10px")
            .style("fill", "black");

        cumulativeDegrees += degree;
    });
}

//   drawNames() {
//     let cumulativeDegrees = 0;
//     const texts = []; // Array to store text element data for force simulation

//     this.degrees.forEach((degree, i) => {
//         const midAngle = this.degreesToRadians(cumulativeDegrees + degree / 4);//-Math.PI/8;
//         const labelRadius = this.referenceRadius*1.1; // Adjusted for potential force simulation movement
//         const x = labelRadius * Math.cos(midAngle - Math.PI / 2);
//         const y = labelRadius * Math.sin(midAngle - Math.PI / 2);
    


//         let result = activities_dict[this.names[i]];

//         const textData = {
//             x: x,
//             y: y,
//             name: this.names[i],
//             id: findEntryByName(this.names[i]).id + "_pie_text"
//         };
//         texts.push(textData);

//         cumulativeDegrees += degree;
//     });

//     // After collecting all texts, apply the force layout
//     this.applyForceLayout(texts);
// }

applyForceLayout(textData) {
  // let repulsion = this.repulsion_force;
  const center = { x: 0, y: 0 }; // Adjust if your center is different
  let minRadius = this.referenceRadius * 1.55; // Define minimum radius
  let maxRadius = this.referenceRadius * 1.9; // Define maximum radius

  let collider=3;
  let repulsion =3;

  if(this.targetDiv=="windrose-svg"){
    minRadius = this.referenceRadius * 1.2; // Define minimum radius
    maxRadius = this.referenceRadius * 1.4; // Define maximum radius
    collider=5;
    repulsion=3;
  
  }

  const simulation = d3.forceSimulation(textData)
      .force("charge", d3.forceManyBody().strength(repulsion)) // Slight repulsion to avoid overlap
      .force("center", d3.forceCenter(center.x, center.y)) // Centering force; adjust as needed
      .force("collision", d3.forceCollide().radius(collider)) // Prevents text elements from overlapping
      .on("tick", ticked)
      .alphaDecay(0.05) // Adjusts how quickly the simulation cools down
      .alpha(0.3); // Starting alpha, affects how simulation starts

  const svgTexts = this.svg.selectAll(".pie-text")
      .data(textData)
      .enter().append("text")
      .attr("class", "pie-text")
      .attr("id", d => d.id)
      .text(d => d.name)
      .style("text-anchor", "middle")
      .style("font-family", "sans-serif")
      .style("font-size", "10px")
      .style("fill", "black");

  // function ticked() {
  //   svgTexts.each(function(d) {
  //     const dx = d.x - center.x;
  //     const dy = d.y - center.y;
  //     const distance = Math.sqrt(dx * dx + dy * dy);
  //     if (distance) {
  //       const clampedDistance = Math.max(minRadius, Math.min(maxRadius, distance));
  //       const scale = clampedDistance / distance;
  //       d.x = center.x + dx * scale;
  //       d.y = center.y + dy * scale;
  //     }
  //   })
  //   .attr("x", d => d.x)
  //   .attr("y", d => d.y);
  // }

  function ticked() {
    svgTexts.each(function(d, i) {
      const dx = d.x - center.x;
      const dy = d.y - center.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance) {
        // Clamp radial distance
        const clampedDistance = Math.max(minRadius, Math.min(maxRadius, distance));
        const scale = clampedDistance / distance;
        let newX = center.x + dx * scale;
        let newY = center.y + dy * scale;
  
        // Attempt to maintain angular position
        const originalAngle = Math.atan2(textData[i].y - center.y, textData[i].x - center.x);
        const newAngle = Math.atan2(newY - center.y, newX - center.x);
        const angleDiff = originalAngle - newAngle;
  
        if (Math.abs(angleDiff) > Math.PI / 180) { // Adjust threshold as needed
          newX = center.x + Math.cos(originalAngle) * clampedDistance;
          newY = center.y + Math.sin(originalAngle) * clampedDistance;
        }
  
        d.x = newX;
        d.y = newY;
      }
    })
    .attr("x", d => d.x)
    .attr("y", d => d.y);
  }
  


}


// applyForceLayout(textData) {
//   const repulsion=this.repulsion_force;
//   const simulation = d3.forceSimulation(textData)
//       .force("charge", d3.forceManyBody().strength(7)) // Repel text elements slightly
//       .force("center", d3.forceCenter(0,0)) // Centering force
//       .force("collision", d3.forceCollide().radius(function(d) {
//           return repulsion; // Adjust as needed based on text size
//       }))
//       .on("tick", ticked);

//   const svgTexts = this.svg.selectAll(".pie-text")
//       .data(textData)
//       .enter().append("text")
//       .text(d => d.name)
//       .attr("class", "pie-text")
//       .attr("id", d => d.id)
//       .style("text-anchor", "middle")
//       .style("font-family", "sans-serif")
//       .style("font-size", "10px")
//       .style("fill", "black");

//   function ticked() {
//       svgTexts
//           .attr("x", d => d.x)
//           .attr("y", d => d.y);
//   }
// }



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


function findEntryByName(name) {
  // Iterate through the dictionary to find the entry with the specified name
  for (const key in PUX_COMPLETE) {
    if (PUX_COMPLETE.hasOwnProperty(key)) {
      const entry = PUX_COMPLETE[key];
      if (entry.name === name) {
        return entry;
      }
    }
  }
  return null; // Return null if no entry is found
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
  // degrees: [25, 79, 37, 15, 44, 79, 30, 13, 16, 22],
  degrees:new Array(namez.length).fill(36),
  values: valuez ,
  // names: ["Search", "Comparison", "Sense-making", "Incrementation", "Transcription", "Modification", "Exploratory design", "Illustrate a story", "Organise a discussion", "Persuade an audience"],
  // names: namez,
  names: namez.map(variable => PUX_COMPLETE[variable].name),
  windrose_width: 410,
  windrose_height: 300,
  referenceRadius: 100,
  repulsion_force:2,
  target_div: "windrose-svg" // ID of the div where the SVG should be appended
};

// Instantiate the Windrose with the provided configuration
let windrose_plot=new Windrose(windroseConfig);





// Assuming 'gridContainer' is already defined
const gridContainer = document.getElementById('data-grid');

// Create a container for the persona label and input
const personaContainer = document.createElement('div');
personaContainer.style.textAlign = 'center'; // Center the contents of the container
personaContainer.style.marginBottom = '20px'; // Add some space below the container

// Create a label for the "Persona" input
const personaLabel = document.createElement('label');
personaLabel.textContent = 'Persona: ';
personaLabel.style.marginRight = '10px'; // Add some space between the label and the input

// Create the input field for "Persona"
const personaInput = document.createElement('input');
personaInput.type = 'text';
personaInput.placeholder = 'Input your role';
personaInput.className = 'input-large'; // Use this class for styling or specify inline styles

// Append the label and input to the container
personaContainer.appendChild(personaLabel);
personaContainer.appendChild(personaInput);

// Insert the persona container before the grid container
gridContainer.parentNode.insertBefore(personaContainer, gridContainer);


const variables = namez; // Ensure 'namez' is an array of variable names
const inputValues = new Array(variables.length).fill(10); // Initialize input values with 0

// Initialize pieConfig with empty degrees array
let pieConfig = {
  degrees: new Array(variables.length).fill(36),
  values: new Array(variables.length).fill(100),
  names: variables.map(variable => PUX_COMPLETE[variable].name),
  windrose_width: 350,
  windrose_height: 250,
  referenceRadius: 50,
  repulsion_force:1,
  target_div: "pie-svg"
};

// Function to update or create a message about the sum of percentages
function updateSumMessage(sum) {
  let sumMessageDiv = document.getElementById('sum-message');
  const remainingPercentage = 100 - sum;

  // Ensure sumMessageDiv exists
  if (!sumMessageDiv) {
      sumMessageDiv = document.createElement('div');
      sumMessageDiv.id = 'sum-message';
      document.body.appendChild(sumMessageDiv);
  }

  // Update the message based on the sum
  if (sum > 100) {
      sumMessageDiv.textContent = `The total exceeds 100%. Please adjust the values to decrease the total by ${remainingPercentage * -1}%.`;
  } else if (sum < 100) {
      sumMessageDiv.textContent = `You have ${remainingPercentage}% left to allocate.`;
  } else { // sum is exactly 100
      sumMessageDiv.textContent = 'Perfect! The sum of all values is exactly 100%.';

      clearSvgElements('windrose-svg');
      windroseConfig.degrees = pieConfig.degrees;

     windrose_plot=new Windrose(windroseConfig);

  }
}



// Function to clear SVG elements in "pie-svg" div
function clearSvgElements(div_id) {
  const svgContainer = document.getElementById(div_id);
  while (svgContainer.firstChild) {
    svgContainer.removeChild(svgContainer.firstChild);
  }
}

let isFirstInput = true; // Flag to check if any input has been provided
variables.forEach((variable, index) => {
  const label = document.createElement('label');
  label.textContent = variable + " " + PUX_COMPLETE[variable].name;
  
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = '% of time spent';
  input.className = 'input-small';
  
  // Event listener to update degrees based on percentage input and check sum
  input.addEventListener('input', () => {
    if (isFirstInput) {
      // Reset degrees to 0 for all variables upon the first input
      pieConfig.degrees = variables.map(() => 0);
      isFirstInput = false; // Update flag so this block doesn't run again
    }

    const percentage = parseFloat(input.value) || 0; // Parse input value or default to 0
    pieConfig.degrees[index] = percentage * 3.6; // Update degree based on the input

    // Calculate sum of percentages
    const sum = pieConfig.degrees.reduce((acc, curr) => acc + curr / 3.6, 0);
    updateSumMessage(sum); // Update or create the sum message based on the new sum

    // Clear existing SVG elements and update Windrose chart
    clearSvgElements('pie-svg');
    new Windrose(pieConfig);

    // Gray out or restore color of the associated text element

const textElementClass = findEntryByName(pieConfig.names[index]).id+"_pie_text"; // Adapt if necessary



    console.log("changing text element", textElementClass);

    d3.selectAll("#" + textElementClass).each(function() {
      if (percentage === 0) {
        d3.select(this).style("fill", "red"); // Gray out text for empty input
      } else {
        d3.select(this).style("fill", "black"); // Restore text color for non-empty input
      }
    });

    checkAndHandleOverlaps();


  });
  
  gridContainer.appendChild(label);
  gridContainer.appendChild(input);
});


new Windrose(pieConfig);


// function checkAndHandleOverlaps() {
//   const textElements = document.querySelectorAll('.pie-text'); // Adjust selector as needed
//   const boundingBoxes = [];

//   // Initially set all text elements to black and fully opaque
//   textElements.forEach(text => {
//     text.style.fill = 'black'; // Default color
//     text.style.opacity = '1'; // Fully opaque
//   });

//   // Get bounding boxes for all text elements
//   textElements.forEach(text => {
//     boundingBoxes.push(text.getBBox());
//   });

//   // Function to check if two boxes overlap and return overlap percentage
//   const getOverlapPercentage = (box1, box2) => {
//     const xOverlap = Math.max(0, Math.min(box1.x + box1.width, box2.x + box2.width) - Math.max(box1.x, box2.x));
//     const yOverlap = Math.max(0, Math.min(box1.y + box1.height, box2.y + box2.height) - Math.max(box1.y, box2.y));
//     const overlapArea = xOverlap * yOverlap;
//     const smallestArea = Math.min(box1.width * box1.height, box2.width * box2.height);
//     return (overlapArea / smallestArea) * 100; // Percentage of the smallest box overlapped
//   };

//   // Significant overlap threshold (in percentage of the smaller text element's area)
//   const significantOverlapThreshold = 50; // Adjust based on your needs

//   // Compare each box against all others to check for significant overlap
//   for (let i = 0; i < boundingBoxes.length; i++) {
//     for (let j = i + 1; j < boundingBoxes.length; j++) {
//       const overlapPercentage = getOverlapPercentage(boundingBoxes[i], boundingBoxes[j]);
//       if (overlapPercentage > significantOverlapThreshold) {
//         // If there's significant overlap, adjust opacity based on the degree of overlap
//         const opacity = Math.max(0.2, 1 - (overlapPercentage / 100));
//         textElements[i].style.opacity = opacity.toString();
//         textElements[j].style.opacity = opacity.toString();
//       }
//     }
//   }
// }


function checkAndHandleOverlaps() {
  const textElements = document.querySelectorAll('.pie-text'); // Adjust selector as needed
  const boundingBoxes = [];

  // Get bounding boxes for all text elements
  textElements.forEach(text => {
    boundingBoxes.push(text.getBBox());
  });

  // Function to check if two boxes overlap and return overlap percentage
  const getOverlapPercentage = (box1, box2) => {
    const xOverlap = Math.max(0, Math.min(box1.x + box1.width, box2.x + box2.width) - Math.max(box1.x, box2.x));
    const yOverlap = Math.max(0, Math.min(box1.y + box1.height, box2.y + box2.height) - Math.max(box1.y, box2.y));
    const overlapArea = xOverlap * yOverlap;
    const smallestArea = Math.min(box1.width * box1.height, box2.width * box2.height);
    return (overlapArea / smallestArea) * 100; // Percentage of the smallest box overlapped
  };

  // Significant overlap threshold (in percentage of the smaller text element's area)
  const significantOverlapThreshold = 50; // Adjust based on your needs

  // Compare each box against all others to check for significant overlap
  for (let i = 0; i < boundingBoxes.length; i++) {
    for (let j = i + 1; j < boundingBoxes.length; j++) {
      const overlapPercentage = getOverlapPercentage(boundingBoxes[i], boundingBoxes[j]);
      if (overlapPercentage > significantOverlapThreshold) {
        // If there's significant overlap, change colors or apply styles
        textElements[i].style.fill = 'red'; // Example: mark significantly overlapping elements in red
        textElements[j].style.fill = 'red'; // Adjust as necessary
      } else {
        // If overlap is not significant, you can choose to explicitly set or reset styles
        // This block can be left empty if there's no need to reset styles for minor overlaps
      }
    }
  }
}



// Call this function after rendering your chart to check and handle overlaps
checkAndHandleOverlaps();






// Create the download button
const downloadButton = document.createElement('button');
downloadButton.textContent = 'Download Data';
downloadButton.onclick = function() {
    // Object to hold all metadata and pie chart values
    const dataToDownload = {
        persona: document.querySelector('input[placeholder="Input your role"]').value,
        variables: {}
    };

    // Assuming 'variables' is your array of variable names used to generate input fields
    variables.forEach(variable => {
        const input = document.querySelector(`input[data-variable="${variable}"]`); // Make sure you set this custom attribute when creating inputs
        dataToDownload.variables[variable] = input.value;
    });

    // Include pie chart values if necessary, adjust according to your needs
    // For example, adding pieConfig.degrees (make sure to update it with actual values upon input changes)
    dataToDownload.pieChartDegrees = pieConfig.degrees;

    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(dataToDownload, null, 2);

    // Trigger the download
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'metadata.json'; // Filename
    document.body.appendChild(a); // Required for Firefox
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url); // Clean up
};

// Add the download button to the DOM, for example, below the grid or at a suitable place in your UI
document.body.appendChild(downloadButton);


// Instantiate the Windrose with the initial configuration


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