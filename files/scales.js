// Constants for layout
const scales_margin = { top: 40, right: 20, bottom: 10, left: 40 },
      scales_width = 150,
      single_height = 47,
      scales_height = single_height * 10 + scales_margin.top + scales_margin.bottom,
      vertical_padding = 50;

const y_start = 0;
const scale_min = -1;
const scale_max = 1;

// Store references for updating bars
const scales = [];

const scale_limits = {
  "CA1": 4,
  "CA2": 12,
  "CA3": 12,
  "CA4": 12,
  "IA1": 8,
  "IA2": 8,
  "IA3": 14,
  "SA1": 10,
  "SA2": 12,
  "SA3": 14
};

// x_scales will hold a D3 linear scale for each activity
const x_scales = {};

// Colour scale (red to green) from -1 to +1
const color_scale = d3.scaleSequential(d3.interpolateRdYlGn)
    .domain([scale_min, scale_max]);

// Draw a single scale with zero line, axis, and a rect for the bar
function draw_scale(id) {
    const g = svg.append("g")
        .attr("transform", `translate(${scales_margin.left}, ${scales_margin.top + (single_height + vertical_padding) * id})`);

    // Create x-scale
    x_scales[id] = d3.scaleLinear()
        .domain([scale_min, scale_max])
        .range([0, scales_width]);

    // Draw axis
    g.append("g")
        .call(d3.axisBottom(x_scales[id]).ticks(5))
        .attr("transform", `translate(0, ${single_height / 2})`);

    // Draw vertical line at x=0
    g.append("line")
        .attr("x1", x_scales[id](0))
        .attr("x2", x_scales[id](0))
        .attr("y1", 0)
        .attr("y2", single_height / 2)
        .style("stroke", "black")
        .style("stroke-width", 1);

    // Draw the bar (initially width=0 at x=0)
    const bar = g.append("rect")
        .attr("x", x_scales[id](0))
        .attr("y", single_height / 4)
        .attr("width", 0)
        .attr("height", single_height / 4)
        .style("fill", color_scale(0));

    // Store references for later updates
    scales[activities[id].name + "_scale"] = { bar, x_scale: x_scales[id] };
}

// Draw a scale for each activity
activities.forEach((activity, index) => draw_scale(index));

// Update the scale bar based on new value
function updateScale(id, value) {
    console.log("updating", id, value);
    const normalised_value = value / scale_limits[id];
    console.log("normalised", id, normalised_value);

    const scale_name = id + "_scale";
    if (scales[scale_name]) {
        const { bar, x_scale } = scales[scale_name];

        // Calculate bar position and width
        const bar_x = normalised_value < 0 ? x_scale(normalised_value) : x_scale(0);
        const bar_width = Math.abs(x_scale(normalised_value) - x_scale(0));

        bar.attr("x", bar_x)
           .attr("width", bar_width)
           .style("fill", color_scale(normalised_value));
    }
}

// Event handlers for .likert-scale elements
d3.selectAll(".likert-scale")
    .on("mouseover", function (event, d) {
        clean_activities_paths();
        let target = d3.select(this).attr('id').substring(0,3);
        show_tooltip(target, true);
        d3.selectAll(".experience_circle").style("opacity", OPACITY_OFF);
        d3.select("#experiences_circle-" + target).style("opacity", OPACITY_ON);
        find_experience_parents(target);
        icon_zoom(target);
        set_html_text(target, 'experience');
        console.log("experiences_circle-" + target, OPACITY_ON);
    })
    .on("mouseout", function (event, d) {
        let target = d3.select(this).attr('id').substring(0,3);
        d3.select("#tooltip").remove();
        fade_activities_paths(3000);
        icon_dezoom(target);
        d3.selectAll(".experience_names").remove();
        d3.selectAll(".experience_circle").style("opacity", OPACITY_ON);
        clear_html_text();
    });

// Example usage:
// update_scale("CA1", -5);
