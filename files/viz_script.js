// Create a set of unique children and a map of activities with children
// const uniqueChildren = Array.from(new Set(activities.flatMap((d) => d.imports)));
const uniqueChildren = exp_list.map(item => item.name);

const activitiesWithChildren = activities;

// Set dimensions
const width = 1150;
const height = 700;
const height_svg=700;//set for the first main viz
const padding=20;

const STROKE_COLOR_ON = "green";
const STROKE_COLOR_OFF = "#555";

const STROKE_WIDTH_ON = 5;
const STROKE_WIDTH_OFF = 1;

const FORWARD_LINK_COLOR = "green";
const BACKWARD_LINK_COLOR = "red";

const OPACITY_ON = 1;
const OPACITY_OFF = 0.2;

const EXP_ID_TXT=270; // location of the experience id locs

const START_POSITIVE_X = 380; // x pos for positive experiences
const START_NEGATIVE_X = 700; // x pos for negative experiences
const START_Y = 511.5; // Y pos for negative and positive experiences

// Y pos for CIRCLE rows
const Y_EXPERIENCES=400;
const Y_ACTIVITIES=250;

// ------ICON PARAMETERS------//
const CIRCLE_RADIUS=15;
const CIRCLE_RADIUS_PX = CIRCLE_RADIUS+"px";

const SIZE_MULTIPLIER=  2; // how much larger should a circle get after hover
const ICON_MULTIPLIER=SIZE_MULTIPLIER*0.9; // how much larger should an icon get after hover

const TRANSITION_TIME = 300; // icon transition growth time 

const ICON_HEIGHT=CIRCLE_RADIUS*ICON_MULTIPLIER;
const ICON_WIDTH=CIRCLE_RADIUS*ICON_MULTIPLIER;

const VIZ_MODE=0;


const yChild = Y_ACTIVITIES-9;
const yParent = Y_EXPERIENCES+8;
const strokeWidth = 1;

const svg = d3
  .select("#svg-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

let experiences_html = "";

// Create a color map for your list
let colorMap = {};

pux_list.forEach(function (element, index) {
  colorMap[element] = colorScale(index);
});

// Scale for positioning children and parents
const xScale = d3
  .scalePoint()
  .domain(uniqueChildren)
  .range([padding, width - padding])
  .padding(0.5);

const yScale = d3
  .scalePoint()
  .domain(activitiesWithChildren.map((d) => d.name))
  .range([padding, width - padding])
  .padding(0.5);

// Line generator for curvy lines
const line = d3.line().curve(d3.curveBasis);
const controlPointFactor = 0.9; // Adjust this factor to control the sharpness

// Draw lines connecting ACTIVITIES and EXPERIENCES
activities.forEach((activity) => {
  activity.imports.forEach((child) => {
    const points = [
      [yScale(activity.name), Y_EXPERIENCES],
      [
        interpolate(yScale(activity.name), xScale(child), controlPointFactor),
        (Y_EXPERIENCES + Y_ACTIVITIES) / 2,
      ],
      [xScale(child), Y_ACTIVITIES],
    ];

    // console.log("PRINTING", activity.name, child);
    svg
      .append("path")
      .attr("d", line(points))
      .attr("class", "activities_path")
      .attr("id", activity.name + "-" + child)
      .attr("fill", "none")
      .attr("stroke", STROKE_COLOR_OFF)
      .attr("stroke-opacity", OPACITY_OFF);
  });
});

const experience_links = [];

// generate links between experiences
//can be expand to make use of linkType variable
exp_list.forEach((d) => {
  ['link_positive', 'link_negative'].forEach((linkType) => {
    d[linkType].forEach((linkObj) => {

      const targetName = Object.keys(linkObj)[0];
      const strength = linkObj[targetName];
      const pos_y = calculatePosY(d, width, height_svg);

      experience_links.push({
        source_id: d.name,
        target_id: targetName,
        source: Math.round(xScale(d.name),1),
        target: Math.round(xScale(targetName),1),
        color: "darkgray",
        strength: strength,
        viz_mode: VIZ_MODE,
        yNewCoord: pos_y

      });
    });
  });
});

// Draw arc-shaped links for EXPERIENCES
svg
  .append("g")
  .selectAll("path")
  .data(experience_links)
  .enter()
  .append("path")
  .attr("class", "experiences_path")
  .attr("id", (d) => `${d.source_id}-${d.target_id}`)
  .attr("d", getPathString)
  .attr("fill", "none")
  .attr("stroke", (d) => d.color)
  .attr("stroke-width", strokeWidth)
  .attr("stroke-opacity", OPACITY_OFF);

// Draw nodes for activities (parents)
svg
  .append("g")
  .selectAll("text.activities")
  .data(activitiesWithChildren)
  .enter()
  .append("circle")
  .attr("id", (d) => `activity_circle-${d.name}`)
  .attr("class", "activity_circle")
  .attr("cx", (d) => yScale(d.name))
  .attr("cy", yParent)
  .attr("r", CIRCLE_RADIUS/1.5 +"px")
  .attr("fill", "white")
  .attr("stroke", (d) => colorMap[d.name.slice(0, 2)])
  .style("stroke-width",3);

  // Draw text labels for activities
svg
  .append("g")
  .selectAll("text.activities")
  .data(activitiesWithChildren)
  .enter()
  .append("text")
  .attr("class", "activities_txt")
  .style("pointer-events", "none")
  .attr("x", (d) => yScale(d.name))
  .attr("y", Y_EXPERIENCES+42)
  .attr("text-anchor", "middle")
  .style("font-size", "8px") // Original font size
  .style("fill", "darkgray") // Original color
  .text((d) => d.name)
  .attr("id", (d) => `activity-${d.name}`);

  svg
  .append("g")
  .selectAll("text.activities")
  .data(activitiesWithChildren)
  .enter()
  .append("text")
  .attr("class", "activities_txt")
  .style("pointer-events", "none")
  .attr("x", (d) => yScale(d.name))
  .attr("y", Y_EXPERIENCES+33)
  .attr("text-anchor", "middle")
  .text((d) => d.id)
  .attr("id", (d) => `activity-${d.name}`);

// =========== ACTIVITY CIRCLES (BOTTOM) =========== //

d3.selectAll(".activity_circle")
  .on("mouseover", function (event, d) {

    clean_activities_paths(); //targets activity paths only (optional)

    // sets innerhtml for headers and text on the right
    set_html_text(d,'activity');

    // show lists of ACTIVITIES in bottom left
    activity_bullets(d);

    // show lists of EXPERIENCES in bottom left
    //animates activity-experience paths
    experience_bullets(d);

  })
  .on("mouseout", function (event, d) {

    // clean_activities_paths(); //targets activity paths only (optional)
    fade_activities_paths(5000);

    clear_html_text();
    clear_bullets();

     //remove vertical text over circles
     d3.selectAll(".experience_names").remove();

  });
// =========== ACTIVITY CIRCLES END =========== //


// =========== EXPERIENCE CIRCLES (TOP) =========== //

// Draw circles for unique children.child-group
svg
  .append("g")
  .selectAll("circle.children")
  .data(uniqueChildren)
  .enter()
  .append("circle")
  .attr("id", (d) => `experiences_circle-${d}`)
  .attr("class", "experience_circle")
  .attr("cx", (d) => xScale(d))
  .attr("cy", Y_ACTIVITIES-2)
  .attr("r", CIRCLE_RADIUS_PX)
  .style("fill", (d) => colorMap[d.slice(0, 2)]);

svg
  .append("g")
  .selectAll("image.children")
  .data(uniqueChildren)
  .enter()
  .append("image")
  .attr("pointer-events", "none")
  .attr("id", (d) => `experiences_icon-${d}`)
  .attr("class", "experience_icon")
  // .attr("xlink:href", (d) => "./icons/" + d.slice(0, 2) + "/" + d + ".png") //OR SVG
  .attr("xlink:href", (d) => "./files/icons/vector/" + d + ".svg") //OR SVG
  .attr("x", (d) => parseInt(xScale(d)) - ICON_WIDTH / 2)
  .attr("y", 248 - ICON_HEIGHT / 2)
  .attr("width", ICON_WIDTH)
  .attr("height", ICON_HEIGHT);

// Draw text labels for unique children
svg
  .append("g")
  .attr("id", (d) => `experiences_txt-${d}`)
  .selectAll("text.children")
  .data(uniqueChildren)
  .enter()
  .append("text")
  .attr("class", "experiences_txt")
  .style("pointer-events", "none")
  .style("font-size", "8px") // Original font size
  .style("fill", "darkgray") // Original color
  .attr("x", (d) => xScale(d))
  .attr("y", EXP_ID_TXT)
  .attr("text-anchor", "middle")
  .text((d) => d)
  .attr("id", (d) => `experience-${d}`);

  let topLayer = d3.select("#topLayer");  // Create or select a top layer group
  if (topLayer.empty()) {
    topLayer = d3.select("svg").append("g").attr("id", "topLayer");
  }  //required so that icons do not overlap on z index

  var isClicked = false; // Flag to track click state

 


// Optional: Code to reset the flag and re-enable mouseout, if needed
function resetClick() {
  isClicked = false;
  // ... any additional reset code ...
}

d3.selectAll(".experience_circle")
  .on("mouseover", function (event, d) {

    clean_activities_paths();

    clear_bullets();

    set_html_text(d, 'experience');
   
    combined_bullets(d, find_experience_parents(d));  //bottom left bullets
   
    clean_experience_paths(); //set all experience paths gray

    //highlight relevant icons
    d3.selectAll(".experience_circle").style("opacity", OPACITY_OFF);
    d3.select(this).style("opacity", OPACITY_ON);

    //draws animated paths, adds vertical text, and shows bullet points
    experience_sentiments_bullets(d); // bullets for positive and negative experience correlations
  
    icon_zoom(d);

    show_tooltip(d);

  })
  .on("mouseout", function (event, d) {
    if (isClicked) {console.log("clicked no mouseout");return;} // If clicked, disable mouseout behavior

    clear_bullets();

    clear_html_text();
   
    // clean_experience_paths();  //targets experience paths and circles
    fade_experience_paths(5000)
    // clean_activities_paths(); //targets activity paths only (optional)
    fade_activities_paths(5000);

    icon_dezoom(d);

    d3.select("#tooltip").remove();

    //remove vertical text over circles
    d3.selectAll(".experience_names").remove();

  });

// =========== EXPERIENCE CIRCLES END =========== //

add_strength_scale();

add_text_aid();

load_animation();


// Assuming this is the selection for your experience and activity circles
d3.selectAll(".experience_circle, .activity_circle")
  .on("click", function(event, d) {
    
      // isClicked = true; // Set flag to true on click
      // console.log("toggle clicked", isClicked);
  
       // Get attributes of the clicked circle
       const cx = d3.select(this).attr("cx");
       const cy = d3.select(this).attr("cy");
       // const r = d3.select(this).attr("r");
       const r ="12px"
      //  console.log('click', d, this)
       //d can be in different form type for activity and  experience
       let identifier = typeof d === 'string' ? d : d["name"] ? d["name"] : null;
       const fill = colorMap[identifier.substring(0, 2)];
   
       // Draw this circle on the new SVG, passing the identifier
       drawCircleOnNewSVG(cx, cy, r, fill, identifier);
    // add_history_entry(d);
  });

  function add_history_entry(d){



  }
// Function to handle new SVG creation and drawing circles
let lastCircleX = 10; // Track the x-coordinate of the last drawn circle
const circleSpacing = 30; // Spacing between circles

function drawCircleOnNewSVG(cx, cy, r, strokeColor, identifier) {

  let clear_offset=50;
  // Create new SVG if it doesn't exist
  let newSVG = d3.select("#new-svg-container svg");
  if (newSVG.empty()) {
    newSVG = d3.select("#new-svg-container").append("svg")
      .attr("width", 800) // Set appropriate width
      .attr("height", 60); // Set appropriate height

       // Draw text under the circle
  newSVG.append("text")
  .attr("x", -5)
  .attr("y", 10+clear_offset) // Position the text below the circle
  .attr("text-anchor", "middle") // Center the text under the circle
  .text("History")
  .style("font-size", "14px") // Adjust font size as needed
  .style("fill", "black")
  .attr("transform", "rotate(-90, 15, 10)"); // Rotate 90 degrees around (15, 10)


  // Draw the rectangle
var rect = newSVG.append("rect")
.attr("x", 5)
.attr("y", 12) // Adjust y-coordinate as needed
.attr("width", 42)   // width of the rectangle
.attr("height", 40)  // height of the rectangle
.attr("stroke", "red")
.attr("fill", "lightblue"); // fill color of the rectangle

// Add hover (mouseover) and mouseout event listeners
rect.on("mouseover", function() {
d3.select(this)
  .attr("stroke-width", 3) // Increase stroke width
  .attr("fill", "green");  // Change fill color on hover
})
.on("mouseout", function() {
d3.select(this)
  .attr("stroke-width", 1) // Reset stroke width
  .attr("fill", "lightblue"); // Reset fill color
});

// Add click event listener
rect.on("click", function() {
location.reload(); // Reloads the current page
});
 // Draw text under the circle
 newSVG.append("text")
 .style("pointer-events", "none")
 .attr("x", 25)
 .attr("y", 36) 
 .attr("text-anchor", "middle") // Center the text under the circle
 .text("CLEAR")
 .style("font-size", "12px") // Adjust font size as needed
 .style("fill", "black")
//  .attr("transform", "rotate(-90, 15, 10)"); // Rotate 90 degrees around (15, 10)
  ; // Set the text color
  }

  // Calculate new circle position
  lastCircleX += circleSpacing;
  
  console.log("identifier", identifier);
  // Determine fill color based on identifier
  // let fillColor = (identifier.substring(0, 2) === 'IA' || identifier.substring(0, 2) === 'SA' || identifier.substring(0, 2) === 'CA') ? 'white' : strokeColor;
  let fillColor;
  let circle_id;
  let circle_class;

  // class="experience_circle"
// id=experiences_circle-CE1
// class=activity_circle
// 

  // Check if identifier starts with IA, SA, or CA
  if (['IA', 'SA', 'CA'].includes(identifier.substring(0, 2))) {
      fillColor = 'white';
      // Set additional modifications if needed
      circle_class="activity_circle";
      circle_id="activity_circle-"+identifier;
      // Additional logic for 'IA', 'SA', 'CA' cases
      // ...
  } else {
      fillColor = strokeColor;
      circle_class="experience_circle";
      circle_id="experiences_circle-"+identifier;
  }
  // Draw the circle
  newSVG.append("circle")
    // .attr("class", circle_class)
    // .attr("id", circle_id)
    .attr("cx", lastCircleX+clear_offset)
    .attr("cy", 30) // Adjust y-coordinate as needed
    .attr("r", r)
    .attr("stroke", strokeColor)
    .attr("stroke-width", 4)
    .style("fill", fillColor);

  // Draw text under the circle
  newSVG.append("text")
    .attr("x", lastCircleX-8+clear_offset)
    .attr("y", 30 + parseInt(r) + 12) // Position the text below the circle
    // .attr("text-anchor", "middle") // Center the text under the circle
    .text(identifier)
    .style("font-size", "10px") // Adjust font size as needed
    .style("fill", "black"); // Set the text color

  // // Optional: Draw line to previous circle if it's not the first one
  // if (lastCircleX > circleSpacing) {
  //   newSVG.append("line")
  //     .attr("x1", lastCircleX - circleSpacing)
  //     .attr("y1", 100)
  //     .attr("x2", lastCircleX)
  //     .attr("y2", 100)
  //     .attr("stroke", "black")
  //     .attr("stroke-width", 2);
  // }
}
 

// class="experience_circle"
// id=experiences_circle-CE1
// class=activity_circle
// activity_circle-CA4