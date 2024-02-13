
// Function to interpolate between two numbers
function interpolate(a, b, t) {
    return a + (b - a) * t;
  }
  
function findNameByImport(importValue) {
    let list_of_matches = [];
    // Loop through the activities array
    for (const item of activities) {
      // Check if the importValue exists in the "imports" property of the current object
      if (item.imports.includes(importValue)) {
        // If found, return the "name" property of the current object
        list_of_matches.push(item.name);
      }
    }
    // If not found, return null or an appropriate value
    return list_of_matches;
  }

  // Function to calculate posY based on VIZ_MODE
function calculatePosY(d, width, height) {
    let pos_y;
    switch(VIZ_MODE) {
      case 0:
        pos_y = Y_ACTIVITIES+50;
        break;
      // case 1:
      //   pos_y = -0.001 * Math.pow(xScale(d) - width / 2, 2) + height / 2.4;
      //   break;
      // case 2:
      //   pos_y = height - Math.sqrt(350 * 350 + Math.pow(xScale(d) - width / 2, 2));
      //   break;
      // case 3:
      //   pos_y = 700 - (7 * Math.cosh(0.01 * (xScale(d) - width / 2)) + 400);
      //   break;
      // default:
      //   pos_y = Y_ACTIVITIES - 2;
      //   break;
    }
    return pos_y;
  }



// Modify getPathString
function getPathString(d) {
    const path = d3.path();
    let curveHeight;
  
    
    switch(d.viz_mode) {
      case 0:
     curveHeight =
      yChild -
      180 * Math.pow(Math.abs(d.strength) + 0.6, 2) +
      Math.random() * 20;    

    // curveHeight =
    // yChild -
    // 550 *Math.abs(d.strength) +
    // Math.random() * 25;   
        break;
      // case 1:
      //   curveHeight = -0.001 * Math.pow(d.source - width/2, 2) + height/2.4;
      //   break;
      // case 2:
      //   curveHeight = height - Math.sqrt(350 * 350 + Math.pow(d.source - width/2, 2));
      //   break;
      // case 3:
      //   curveHeight = 700 - (7 * Math.cosh(0.01 * (d.source - width/2)) + 400);
      //   break;
      // default:
      //   curveHeight = yChild - 1000 * Math.pow(Math.abs(d.strength) - 0.45, 1) + Math.random() * 25;   
        
        // break;
    }
  
    path.moveTo(d.source, d.yNewCoord);
    path.quadraticCurveTo(d.source, curveHeight, d.target, d.yNewCoord);
    return path.toString();
  }
  
  // // Helper function for generating path string
  // function getPathString(d) {
  //   const path = d3.path();
  //   const curveHeight =
  //     yChild -
  //     1000 * Math.pow(Math.abs(d.strength) - 0.45, 1) +
  //     Math.random() * 25;
  //   path.moveTo(d.source, yChild);
  //   path.quadraticCurveTo(d.source, curveHeight, d.target, yChild);
  //   return path.toString();
  // }
  
  function updateText(selector, data, startX) {
    d3.select(selector)
      .attr("text-anchor", "start")
      .selectAll("tspan")
      .remove()
      .data(data)
      .enter()
      .append("tspan")
      .attr("x", startX)
      .attr("dy", (d, i) => (i == 0 ? 0 : 15))
      .text((d) => d);
  }
  
  function appendCircles(svg, textArray, startCy, colorMap) {
    textArray.slice(0, -1).forEach((text, i) => {
      svg
        .append("g")
        .attr("class", "temp-circle")
        .append("circle")
        .attr("cx", 116.5)
        .attr("cy", startCy + i * 15)
        .attr("r", "5px")
        .style("fill", colorMap[text.slice(1, 3)]);
    });
  }

  function updateTextAndCircles(id, data, startX, startY) {
    d3.select("#" + id)
      .attr("text-anchor", "start")
      .selectAll("tspan")
      .remove()
      .data(data)
      .enter()
      .append("tspan")
      .attr("x", startX)
      .attr("dy", (d, i) => (i === 0 ? 0 : 15))
      .text((d) => d);

    for (let i = 0; i <= data.length - 1; i++) {
      const cy = startY + i * 15;
      const fill = colorMap[data[i].slice(2, 4)];

      svg
        .append("g")
        .attr("class", "temp-circle")
        .append("circle")
        .attr("cx", startX - 7)
        .attr("cy", cy)
        .attr("r", "5px")
        .style("fill", fill);
    }
  }

  function addText(x, y, style, text, id) {
    const textElement = svg.append("text").attr("x", x).attr("y", y).text(text);
    if (style) textElement.style(style);
    if (id) textElement.attr("id", id);
  }

//------------------------------------------//
//------------BOTTOM LEFT BULLETS-----------//
//-----------------------------------------//

//bottom left ACTIVITIES
  function activity_bullets(d){

    // write the ACTIVITY name and id
    d3.select("#activity_txt").text(`(${d.name}) ${d.id}`);

     // draw ACTIVITY temp-circles for the list
     svg
     .append("g")
     .attr("class", "temp-circle")
     .append("circle")
     .attr("cx", 116.5)
     .attr("cy", 497)
     .attr("r", "5px")
     .style("fill", colorMap[d.name.slice(0, 2)]);
  }

  //bottom left EXPERIENCES
 function experience_bullets(d){

    const source = d.name;
    const targets = d.imports;

    let exp_bullet_list = "";

    // draw paths from ACTIVITY to EXPERIENCE
    targets.forEach((target) => {
      const foundObject = exp_list.find((item) => item.name === target);
      exp_bullet_list += `(${target}) ${foundObject.id}\n`;
      d3.select(`#${source}-${target}`)
        .style("stroke", colorMap[source.slice(0, 2)])
        .style("stroke-width", STROKE_WIDTH_ON)
        .style("fill", "none")
        .style("stroke-opacity", OPACITY_ON);

      // show_experience_names(target);
    });

    // const split_text = exp_bullet_list.split("\n");
    // split_text.pop(); // Remove the last empty string

    // // draw EXPERIENCE temp-circles for the list
    // split_text.forEach((text, i) => {
    //   svg
    //     .append("g")
    //     .attr("class", "temp-circle")
    //     .append("circle")
    //     .attr("cx", 116.5)
    //     .attr("cy", 547 + i * 15)
    //     .attr("r", "5px")
    //     .style("fill", colorMap[text.slice(1, 3)]);
    // });

    // // write down entries in the EXPERIENCE list
    // d3.select("#experience_txt")
    //   .attr("text-anchor", "start")
    //   .selectAll("tspan")
    //   .remove()
    //   .data(split_text)
    //   .enter()
    //   .append("tspan")
    //   .attr("x", 125)
    //   .attr("dy", (d, i) => (i === 0 ? 0 : 15))
    //   .text((d) => d);
}

//both activites and experiences (bottom left)
function combined_bullets(d,parent_list){
    const foundObject = exp_list.find((item) => item.name === d);
    const newExperience = `(${d})  ${foundObject.id} \n`;
    const split_experiences = newExperience.split("\n");

    let split_activities = parent_list.split("\n");

    updateText("#activity_txt", split_activities,125);
    updateText("#experience_txt", split_experiences,125);
    appendCircles(svg, split_activities, 497, colorMap);
    appendCircles(svg, split_experiences, 547, colorMap);

    d3.select("#experience_txt")
      .text(" (" + d + ")  " + foundObject.id + " \n");

}
//------------------------------------------//
//----------BOTTOM LEFT BULLETS END---------//
//------------------------------------------//

function set_html_text(d, mode='experience'){

    //account for different data formatting for activities
    d=mode=='activity'?d.name:d;

    document.getElementById("pux_header_id").innerHTML=pux_list_definitions[d.slice(0, 2)]+" "+ PUX_COMPLETE[d].id[2];
    document.getElementById("pux_header_id").style.color = colorMap[d.slice(0, 2)];

    document.getElementById("pux_header_name").innerHTML=": "+PUX_COMPLETE[d].name;

    document.getElementById("short_paragraph").innerHTML=PUX_COMPLETE[d].short_description;
    document.getElementById("long_paragraph").innerHTML=PUX_COMPLETE[d].long_description;

    document.getElementById("action_name").innerHTML=PUX_COMPLETE[d].name;
    document.getElementById("action_name").style.color = colorMap[d.slice(0, 2)];
}

function clear_html_text(){
    document.getElementById("pux_header_id").innerHTML="";
    document.getElementById("pux_header_name").innerHTML="";

    document.getElementById("short_paragraph").innerHTML="";
    document.getElementById("long_paragraph").innerHTML="";

    document.getElementById("action_name").innerHTML="";

}

// clear d3 text and icons after mouseout on ACTIVITY circles
function clear_bullets(){
    d3.selectAll(".temp-circle").remove();
    d3.select("#activity_txt").text("");
    d3.select("#experience_txt").text("");

    // d3.selectAll(".activities_path")
    //   .style("fill", "none")
    //   .style("stroke", STROKE_COLOR_OFF)
    //   .style("stroke-width", STROKE_WIDTH_OFF)
    //   .style("stroke-opacity", OPACITY_OFF);

      d3.select("#positive_experience").text("");
      d3.select("#negative_experience").text("");
}

function find_experience_parents(d){

    let parent_text = "";
    let parents_all = findNameByImport(d);

    // console.log("PARENT LIST", parents_all,"FROM",d)
    parents_all.forEach((entry) => {
      const found_parent = activities.find((item) => item.name === entry);
    //   console.log("FOUND PARENT", found_parent)
      parent_text += `(${entry})  ${found_parent.id} \n`;
      d3.select(`#${entry}-${d}`)
        .style("stroke", colorMap[entry.slice(0, 2)])
        .style("stroke-width", STROKE_WIDTH_ON)
        .style("stroke-opacity", OPACITY_ON);
    });

    return parent_text
}

function experience_sentiments_bullets(d){
    console.log(d)
    let positive_experience = "";
    let negative_experience = "";
    let split_positive=[];
    let split_negative=[];
    
    //first degree is extracted from the original paragraph for the experience
    const first_degree = experience_links.filter(obj => obj.source_id === d); 
    //second degree is where the experience is referenced in other paragraphs
    const second_degree = experience_links.filter(obj => obj.target_id === d); 

    console.log("1st degree", first_degree);
    console.log("2nd degree", second_degree);

    first_degree.forEach((element) => {

        let state=parseFloat(element.strength)>0?"positive":"negative";
        let path_id=element.source_id+"-"+element.target_id;
        let entry=` (${element.target_id}) ${PUX_COMPLETE[element.target_id].name} `;
        
        console.log("element", element);
        console.log(path_id, state,element.strength);
        console.log(PUX_COMPLETE[element.source_id])
        console.log(entry);
        console.log("target id ",element.target_id);

        // if(state=="positive"){
        //     split_positive.push(entry)
        //     animate_path(path_id, FORWARD_LINK_COLOR);
        // }
        // else{
        //     split_negative.push(entry)
        //     animate_path(path_id, BACKWARD_LINK_COLOR);
        // }

        // //vertical text over experience circles
        // try {
        //   show_experience_names(element.target_id);

        // } catch (error) {
        //   console.log(error);
        // }

        // highlight relevant experiences
        d3.select("#experiences_circle-" + element.target_id)
        .style("opacity",OPACITY_ON);

    })

    // second_degree.forEach((element) => {

    //     let state=parseFloat(element.strength)>0?"positive":"negative";
    //     let path_id=element.source_id+"-"+element.target_id;
    //     let entry=` (${element.source_id}) ${PUX_COMPLETE[element.source_id].name} `;

    //     console.log(path_id, state,element.strength);
    //     console.log(PUX_COMPLETE[element.source_id])
    //     console.log(entry);

    //     if(state=="positive"){
    //         split_positive.push(entry)
    //         animate_dashed_path(path_id, FORWARD_LINK_COLOR);
    //     }
    //     else{
    //         split_negative.push(entry)
    //         animate_dashed_path(path_id, BACKWARD_LINK_COLOR);
    //     }

    //     // highlight relevant experiences
    //     d3.select("#experiences_circle-" + element.target_id)
    //     .style("opacity",OPACITY_ON);
    // })


    d3.select("#negative_experience").text("");
    d3.select("#positive_experience").text("");

    updateTextAndCircles("negative_experience",split_negative,START_NEGATIVE_X,START_Y);
    updateTextAndCircles("positive_experience",split_positive,START_POSITIVE_X, START_Y);


}

function animate_path(path_id, stroke_color){
    const path = d3.select("#" + path_id);
    const pathLength = path.node().getTotalLength();

      path
        .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
        .attr("stroke-dashoffset", pathLength)
        .style("stroke", stroke_color)
        .style("stroke-width", STROKE_WIDTH_ON)
        .style("opacity", OPACITY_ON)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);
}

function animate_dashed_path(path_id, stroke_color){
    const path = d3.select("#" + path_id);
    const pathLength = path.node().getTotalLength();

    path
        .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
        .attr("stroke-dashoffset", pathLength)
        .style("stroke", stroke_color)
        .style("stroke-width", STROKE_WIDTH_ON/1.5)
        // .style("opacity", OPACITY_OFF)
        .transition()
        .duration(2500)
        .ease(d3.easeLinear)
        .style("opacity", OPACITY_ON)
        .attr("stroke-dashoffset", 0);
}

//needs to be rewritten from scratch
//it should only get data from  experience_links and exp_list variables
//link positive should only show link_positive elements from exp_list
//link negative should only show link_negative elements from exp_list
//this will give a source and target (available from experience_links)
//that will then be highlighted
function experience_sentiments_bullets_old(d){
    
    // // Initialize two arrays to store IDs
    // const firstHalfIDs = [];
    // const secondHalfIDs = [];

    // // Select all elements with the class "experiences_path"
    // d3.selectAll(".experiences_path").each(function () {
    //   const idParts = this.id.split("-");
    //   if (idParts[0].includes(d)) {
    //     firstHalfIDs.push(this.id);
    //   } else if (idParts[1].includes(d)) {
    //     secondHalfIDs.push(this.id);
    //   }
    // });

    // let positive_experience = "";
    // let negative_experience = "";

    // // Loop through and target elements with specificString in the first half
    // firstHalfIDs.forEach((id) => {
    //   const target_circle = id.split("-")[1];
    //   const element = d3.select("#" + id);
    //   const pathLength = element.node().getTotalLength();

    //   d3.select("#experiences_circle-" + target_circle)
    //     .style("opacity",OPACITY_ON);

    //   element
    //     .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
    //     .attr("stroke-dashoffset", pathLength)
    //     .style("stroke", FORWARD_LINK_COLOR)
    //     .style("stroke-width", STROKE_WIDTH_ON)
    //     .style("opacity", OPACITY_ON)
    //     .transition()
    //     .duration(1500)
    //     .ease(d3.easeLinear)
    //     .attr("stroke-dashoffset", 0);

    //   let foundObject =
    //     exp_list.find((item) => item.name === target_circle) ||
    //     activities.find((item) => item.name === target_circle);

    //   if (!foundObject)
    //     console.error(`id: ${id}, target: ${target_circle} not found`);

    //   positive_experience += ` (${target_circle})   ${foundObject.id} \n`;
    // });

    // // Loop through and target elements with specificString in the second half
    // secondHalfIDs.forEach((id) => {
    //   const target_circle = id.split("-")[0];
    //   const element = d3.select("#" + id);
    //   const pathLength = element.node().getTotalLength();

    //   let foundObject =
    //     exp_list.find((item) => item.name === target_circle) ||
    //     activities.find((item) => item.name === target_circle);

    //   if (!foundObject)
    //     console.error(`id: ${id}, target: ${target_circle} not found`);

    //   negative_experience += ` (${target_circle}) \t ${foundObject.id} \n`;

    //   d3.select("#experiences_circle-" + target_circle)
    //     .style("opacity",OPACITY_ON);

    //   element
    //     .attr("stroke-dasharray", `${pathLength} ${pathLength}`)
    //     .attr("stroke-dashoffset", pathLength)
    //     .style("stroke", BACKWARD_LINK_COLOR)
    //     .style("stroke-width", STROKE_WIDTH_ON)
    //     .style("opacity", OPACITY_ON)
    //     .transition()
    //     .duration(1500)
    //     .ease(d3.easeLinear)
    //     .attr("stroke-dashoffset", 0);
    // });


    // let split_positive = positive_experience.split("\n");
    // let split_negative = negative_experience.split("\n");

    // console.log(split_positive,split_negative);

    // d3.select("#negative_experience").text("");
    // d3.select("#positive_experience").text("");

    // updateTextAndCircles("negative_experience",split_negative,START_NEGATIVE_X,START_Y);
    // updateTextAndCircles("positive_experience",split_positive,START_POSITIVE_X, START_Y);
}

function clean_experience_paths(){
  d3.selectAll(".experiences_path").interrupt();

    d3.selectAll(".experiences_path")
    // .interrupt()
    // .transition()
    // .duration(250)
    .style("stroke", STROKE_COLOR_OFF)
    .style("opacity", OPACITY_OFF)
    .style("stroke-width", STROKE_WIDTH_OFF);

    d3.selectAll(".experience_circle")
      .style("stroke-opacity", OPACITY_ON)
      .style("opacity", OPACITY_ON);
}

function fade_experience_paths(duration) {
  d3.selectAll(".experiences_path")
    .interrupt()
    .transition()
    .duration(duration)
    .style("stroke-width", STROKE_WIDTH_OFF)
    .style("opacity", OPACITY_OFF)
    .end() // Wait for the transition to complete
    .then(() => {
      // Change the "stroke" property after the transition ends
      d3.selectAll(".experiences_path").style("stroke", STROKE_COLOR_OFF);
    })
    .catch(error => {
      // Handle any errors that occur during the transition
      console.error("Transition failed:", error);
    });

  // This part remains unchanged
  d3.selectAll(".experience_circle")
    .style("stroke-opacity", OPACITY_ON)
    .style("opacity", OPACITY_ON);
}

function clean_activities_paths(){

    d3.selectAll(".activities_path").interrupt();

    d3.selectAll(".activities_path")
    .style("stroke", STROKE_COLOR_OFF)
    .style("stroke-width", STROKE_WIDTH_OFF)
    .style("stroke-opacity", OPACITY_OFF);
}

// function fade_activities_paths(duration){
//   d3.selectAll(".activities_path")
//   .interrupt()
//   .transition()
//   .duration(duration)
//   .style("stroke", STROKE_COLOR_OFF)
//   .style("stroke-width", STROKE_WIDTH_OFF)
//   .style("stroke-opacity", OPACITY_OFF);
// }

function fade_activities_paths(duration) {
  d3.selectAll(".activities_path")
    .interrupt()
    .transition()
    .duration(duration)
    .style("stroke-width", STROKE_WIDTH_OFF)
    .style("stroke-opacity", OPACITY_OFF)
    .end() // Wait for the transition to complete
    .then(() => {
      // Change the "stroke" property after the transition ends
      d3.selectAll(".activities_path").style("stroke", STROKE_COLOR_OFF);
    })
    .catch(error => {
      // Handle any errors that occur during the transition
      console.error("Transition failed:", error);
    });
}


function icon_zoom(d){
    let circle_id = '#experiences_circle-' + d;
    let icon_id = '#experiences_icon-' + d;

    d3.select(circle_id)
      .transition()
      .duration(TRANSITION_TIME)
      .style("stroke", "white")
      .style("stroke-width", "2")
      .attr("r", CIRCLE_RADIUS * SIZE_MULTIPLIER + "px");

    d3.select(icon_id)
      .transition()
      .duration(TRANSITION_TIME)
      .attr("width", ICON_WIDTH * SIZE_MULTIPLIER)
      .attr("height", ICON_HEIGHT * SIZE_MULTIPLIER)
      .attr("x", d3.select(circle_id).attr("cx") - ICON_WIDTH)
      .attr("y", d3.select(circle_id).attr("cy") - ICON_HEIGHT);

    // Move circle to top layer
    let circleNode = d3.select(circle_id).node();
    topLayer.node().appendChild(circleNode);

    // Move icon to top layer
    let iconNode = d3.select(icon_id).node();
    topLayer.node().appendChild(iconNode);
}

function icon_dezoom(d){
    let circle_id='#experiences_circle-'+d;
    let icon_id='#experiences_icon-'+d;

    d3.select(circle_id)
      .transition()
      .duration(TRANSITION_TIME)
      .style("stroke", "none")
      .attr("r", CIRCLE_RADIUS_PX);

    d3.select(icon_id)
      .transition()
      .duration(TRANSITION_TIME)
      .attr("width", ICON_WIDTH)
      .attr("height", ICON_HEIGHT)
      .attr("x", d3.select(circle_id).attr("cx")-ICON_WIDTH/2)
      .attr("y", d3.select(circle_id).attr("cy")-ICON_HEIGHT/2);
}


function add_strength_scale(){
    const yAxisXPos = 19; // X position for the Y-axis
    const yAxisY1Pos = Y_ACTIVITIES - 230; // Starting Y position for the Y-axis
    const yAxisY2Pos = Y_ACTIVITIES - 20; // Ending Y position for the Y-axis
    
    // Create Y-axis group
    const yAxisGroup = svg.append("g")
      .attr("id", "scales")
      .attr("transform", `translate(${yAxisXPos},0)`);
    
    // Draw Y-axis line
    yAxisGroup.append("line")
      .attr("x1", 0)
      .attr("y1", yAxisY1Pos)
      .attr("x2", 0)
      .attr("y2", yAxisY2Pos)
      .attr("stroke", "darkgray");
    
    // Draw arrow at the end
    yAxisGroup.append("path")
      .attr("d", `M 0 ${yAxisY1Pos} L -5 ${yAxisY1Pos + 5} L 5 ${yAxisY1Pos + 5} Z`)
      .attr("fill", "darkgray");
    
    // Draw ticks and labels
    for (let i = 0; i <= 5; i++) {
    
      // if (i==0){continue}
      const yTickPos = yAxisY2Pos - i * 40; // 20 pixels between each tick
      // const tickValue = (i * 0.2).toFixed(1);
      const tickValue = (i * 0.2*100).toFixed(0)+"%";

      yAxisGroup.append("line")
        .attr("x1", -2)
        .attr("y1", yTickPos)
        .attr("x2", 2)
        .attr("y2", yTickPos);
        // .attr("stroke", "darkgray");
    
    yAxisGroup.append("text")
      .attr("x", 2)
      .attr("y", yTickPos - 0)
      .attr("text-anchor", "end")
      .attr("transform", `rotate(-90, -5, ${yTickPos + 2})`)
      // .attr("stroke", "darkgray")
      .text(tickValue);
    
    }
    
    // Add label
    yAxisGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", yAxisXPos + 10)
      .attr("x", -(yAxisY1Pos + yAxisY2Pos) / 2)
      .attr("dy", "-2em")
      .style("text-anchor", "middle")
      .style("opacity", 0.75)
      .text("correlation strength");
    
      d3.select('#scales').style("opacity", 0.4);
}

function add_text_aid(){
    const text_data = [
        // {text: "Hover over an experience", x: 910, y: 250, style: {"font-style": "italic"}, id: "experience_definition"},
        {text: "Activity:",   x: 50,  y: 500, style: {"font-weight": "bolder"}},
        {text: "Hover",       x: 125, y: 500, id: "activity_txt"},
    
        {text: "Experience:", x: 50, y: 550, style: {"font-weight": "bolder"}},
        {text: "Hover",       x: 125, y: 550, id: "experience_txt"},
    
        {text: "Positively correlated:", x: START_POSITIVE_X, y: 500, style: {"font-weight": "bolder"}},
        {text: "Select Experience",      x: START_POSITIVE_X, y: 515, id: "positive_experience"},
        {text: "Negatively correlated:", x: START_NEGATIVE_X, y: 500, style: {"font-weight": "bolder"}},
        {text: "Select Experience",      x: START_NEGATIVE_X, y: 515, id: "negative_experience"},
      ];
      
      text_data.forEach(({x, y, style, text, id}) => addText(x, y, style, text, id));

      const activity_data=[
        {text: "Interpretation activities", x: 135, y: 460, style: {"font-style": "italic"}, underlineColor: colorMap["IA"], identifier_start: "IA1", identifier_end: "IA3"},
        {text: "Construction activities",   x: 530, y: 460, style: {"font-style": "italic"}, underlineColor: colorMap["CA"],identifier_start: "CA1", identifier_end: "CA4"},
        {text: "Social activities",         x: 920, y: 460, style: {"font-style": "italic"}, underlineColor: colorMap["SA"],identifier_start: "SA1", identifier_end: "SA3"}
    ];
      

      function underlined_text(x, y, style, text, id, underlineColor, identifier_start, identifier_end) {
        // Existing code for appending text
        svg.append("text")
          .attr("x", x)
          .attr("y", y)
          .attr("style", style)
          .text(text);
      
        let x_start = parseFloat(d3.select("#activity_circle-" + identifier_start).attr("cx"));
        let x_end = parseFloat(d3.select("#activity_circle-" + identifier_end).attr("cx"));
      
        svg.append("line")
          .attr("x1", x_start)
          .attr("y1", y + 5)
          .attr("x2", x_end)
          .attr("y2", y + 5)
          .attr("stroke", underlineColor);
      }
      
      activity_data.forEach(({x, y, style, text, id, underlineColor, identifier_start, identifier_end}) => 
      underlined_text(x, y, style, text, id, underlineColor, identifier_start, identifier_end)
    );
    
      
}

//draw vertical text
function show_experience_names(d){
  let experience_name=PUX_COMPLETE[d]["name"];
  let circle_location=d3.select("#experiences_circle-"+d);

  // Get the x and y coordinates of the circle
  let x = +circle_location.attr("cx");
  let y = +circle_location.attr("cy");

  let x_off=3;
  let y_off=-20;

  let x_pos=x+x_off;
  let y_pos=y+y_off;

  // Append text element at the circle's position
  d3.select("svg").append("text")
    .attr("class", "experience_names")
    .attr("x", x_pos)
    .attr("y", y_pos)
    .style("font-size", "12px")  // Set the desired font size here
    .attr("transform", "rotate(-90, " + x_pos + ", " + y_pos + ")")
    .text(experience_name);

}

function load_animation(){
    let delay = 100;
const delayIncrement = 25;  // milliseconds

d3.selectAll(".experience_circle").each(function (d, i) {
  const circle_id = '#experiences_circle-' + d;
  const icon_id = '#experiences_icon-' + d;
  const cy_incr=20;

  let cy=parseInt(d3.select(circle_id).attr("cy"));

  const SIZE_MULTIPLIER=1.25;
  d3.select(this)
    .transition()
    .delay(delay)
    .duration(TRANSITION_TIME/2)
    .attr("r", CIRCLE_RADIUS * SIZE_MULTIPLIER + "px")
    .attr("cy",cy-cy_incr)
    .transition()
    .duration(TRANSITION_TIME/2)
    .attr("cy",cy)
    .attr("r", CIRCLE_RADIUS_PX);

  d3.select(icon_id)
    .transition()
    .delay(delay)
    .duration(TRANSITION_TIME/2)
    .attr("width", ICON_WIDTH * SIZE_MULTIPLIER*0.9)
    .attr("height", ICON_HEIGHT * SIZE_MULTIPLIER*0.9)
    .attr("x", d3.select(circle_id).attr("cx") - (ICON_WIDTH* SIZE_MULTIPLIER*0.9)/2)
    .attr("y", d3.select(circle_id).attr("cy") - (ICON_HEIGHT* SIZE_MULTIPLIER*0.9)/2 -cy_incr)
    .transition()
    .duration(TRANSITION_TIME/2)
    .attr("width", ICON_WIDTH)
    .attr("height", ICON_HEIGHT)
    .attr("x", d3.select(circle_id).attr("cx") - ICON_WIDTH / 2)
    .attr("y", d3.select(circle_id).attr("cy") - ICON_HEIGHT / 2);

  delay += delayIncrement;
});

}


function show_tooltip(d){

    // Create tooltip
    const tooltip = d3.select("body").append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("background-color", "white")
      // .style("border", "1px solid black")
      .style("padding", "5px")
      .style("opacity", 0.6);
    
      const svgWidth = width;
      const svgHeight=height;
    
    
      // Set tooltip content initially to measure size
      tooltip.html(PUX_COMPLETE[d].name+ "<br> <div id='pux_span'>"+pux_list_definitions[d.slice(0, 2)] + " " + PUX_COMPLETE[d].id[2]+"</div>");
      document.getElementById("pux_span").style.color = colorMap[d.slice(0, 2)]; //sets color
      document.getElementById("pux_span").style.fontSize = "12px";

      // Dynamically calculate tooltip dimensions
      const tooltipDimensions = tooltip.node().getBoundingClientRect();
      const tooltipWidth = tooltipDimensions.width;
      const tooltipHeight = tooltipDimensions.height;
      
      // Mouse position
      const [x, y] = d3.pointer(event);
    
    // Calculate left and top position
    // const leftPosition = (x + tooltipWidth > svgWidth) ? (x - tooltipWidth) : x;
    // let topPosition = (y + tooltipHeight + 10 > svgHeight) ? (y - tooltipHeight) : (y + 10);
    // topPosition=+338;

    const leftPosition = x+100;
    const topPosition = (y + 10);

    // Update tooltip position
    tooltip
      .style("top", `${topPosition}px`)
      .style("left", `${leftPosition}px`);
    
    
    }
   

    function clickable_interaction(){
      // Assuming this is the selection for your experience and activity circles
      d3.selectAll(".experience_circle, .activity_circle")
        .on("click", function(event, d) {
          if (isClicked) { 
            console.log("clicked no mouseout");return;} // If clicked, disable mouseout behavior
      
            isClicked = true; // Set flag to true on click      
      
            console.log("toggle clicked", isClicked);
        
            if(rect){
              checkIsClicked();
            }
            
        // Call the function without passing 'this'
          // Instead, use 'event.target' to refer to the clicked element
          add_history_entry(d, event.target);
          });
      
      }
      
    
// Function to check and respond to changes in isClicked
function checkIsClicked() {
  if (isClicked) {
    startPulsing(rect.node()); // Start pulsing if isClicked is true
    d3.select("#lock_toggle").text("UNLOCK")

  } else {
    stopPulsing(rect.node());  // Stop pulsing and reset if isClicked is false
    d3.select("#lock_toggle").text("LOCK")

  }
}

function startPulsing(element) {
  pulse(element, "orange", "white");
}

function stopPulsing(element) {
  d3.select(element).interrupt(); // Stops ongoing transitions
  d3.select(element)
    .attr("fill", "lightgray")
    .attr("stroke-width", 1);

    d3.select("#lock_toggle").text("LOCK");

}

function pulse(element, color1, color2) {
  d3.select(element)
  .attr("stroke",color1)
    .transition()
    .duration(1500)
    .attr("fill", color1)
    .transition()
    .duration(1500)
    .attr("fill", color2)
    .on("end", function() {
      if (isClicked) pulse(element, color1, color2); // Continue pulsing if isClicked is true
    });
}

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
 rect = newSVG.append("rect")
.attr("x", 4)
.attr("y", 12) // Adjust y-coordinate as needed
.attr("width", 45)   // width of the rectangle
.attr("height", 40)  // height of the rectangle
.attr("stroke", "orange")
.attr("fill", "lightgray"); // fill color of the rectangle

checkIsClicked();



// Add hover (mouseover) and mouseout event listeners
rect.on("mouseover", function() {
d3.select(this)
  .attr("stroke-width", 3) // Increase stroke width
  .attr("stroke", "red") // Increase stroke width
  .attr("fill", "orange");  // Change fill color on hover
})
.on("mouseout", function() {
d3.select(this)
  .attr("stroke-width", 1) // Reset stroke width
  .attr("fill", "lightgray"); // Reset fill color
});

// Add click event listener
rect.on("click", function() {
// location.reload(); // Reloads the current page
checkIsClicked();

//experiences
clear_bullets();

clear_html_text();

// clean_experience_paths();  //targets experience paths and circles
fade_experience_paths(2000)
// clean_activities_paths(); //targets activity paths only (optional)
fade_activities_paths(2000);

d3.selectAll(".experience_circle").each(function(d, i) {
  // 'this' refers to the current DOM element
  // 'd' is the bound data, 'i' is the index
  icon_dezoom(d);
});

d3.select("#tooltip").remove();

//remove vertical text over circles
d3.selectAll(".experience_names").remove();

//activities
// clean_activities_paths(); //targets activity paths only (optional)
fade_activities_paths(2000);

clear_html_text();
clear_bullets();

 //remove vertical text over circles
 d3.selectAll(".experience_names").remove();

 isClicked=false;
 d3.select("#lock_toggle").text("UNLOCK")
 checkIsClicked();

});


 // Draw text under the circle
 newSVG.append("text")
 .style("pointer-events", "none")
 .attr("id", "lock_toggle")
 .attr("x", 26)
 .attr("y", 36) 
 .attr("text-anchor", "middle") // Center the text under the circle
 .text("UNLOCK")
 .style("font-size", "10.5px") // Adjust font size as needed
 .style("fill", "black");
//  .attr("transform", "rotate(-90, 15, 10)"); // Rotate 90 degrees around (15, 10)
  }

  // Calculate new circle position
  lastCircleX += circleSpacing;
  
  console.log("identifier", identifier);
  // Determine fill color based on identifier
  // let fillColor = (identifier.substring(0, 2) === 'IA' || identifier.substring(0, 2) === 'SA' || identifier.substring(0, 2) === 'CA') ? 'white' : strokeColor;
  let fillColor;
  let circle_id;
  let circle_class;

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

    if (!['IA', 'SA', 'CA'].includes(identifier.substring(0, 2))) {
      newSVG.append("image")
      .attr("pointer-events", "none")
      .attr("id", `experiences_icon-${circle_id}`)
      .attr("class", "experience_icon")
      .attr("xlink:href", `./files/icons/vector/${identifier}.svg`)
      .attr("x", lastCircleX + clear_offset - ICON_WIDTH / 2)
      .attr("y", 30 - ICON_HEIGHT / 2)
      .attr("width", ICON_WIDTH)
      .attr("height", ICON_HEIGHT);
    }

  // Draw text under the circle
  newSVG.append("text")
    .attr("x", lastCircleX-8+clear_offset)
    .attr("y", 30 + parseInt(r) + 12) // Position the text below the circle
    // .attr("text-anchor", "middle") // Center the text under the circle
    .text(identifier)
    .style("font-size", "10px") // Adjust font size as needed
    .style("fill", "black"); // Set the text color

}
 
  function add_history_entry(d,that){

      // Get attributes of the clicked circle
      let cx = d3.select(that).attr("cx");
      let cy = d3.select(that).attr("cy");
      // const r = d3.select(this).attr("r");
      let r ="12px";
     //  console.log('click', d, this)
      //d can be in different form type for activity and  experience
      let identifier = typeof d === 'string' ? d : d["name"] ? d["name"] : null;
      let fill = colorMap[identifier.substring(0, 2)];
    
      // Draw this circle on the new SVG, passing the identifier
      drawCircleOnNewSVG(cx, cy, r, fill, identifier);
    
      }
    

      