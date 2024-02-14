function createLikertScale() {
    const container = document.getElementById('likerts');
    

    for (let i = 0; i < exp_list.length; i++) {

        SCORE_BOARD_EXPERIENCES[exp_list[i].name]=0;

        const questionDiv = document.createElement('div');
        questionDiv.className = 'likert-container';
        
        questionDiv.innerHTML = `
            <div class="exp-name">[${exp_list[i].name}]</div>
            <div class="likert-scale" id="${exp_list[i].name}_likert_group">
                <label class="likert-label">Strongly Disagree</label>
                <input type="radio" name="${exp_list[i].name}_likert" value="-2">
                <input type="radio" name="${exp_list[i].name}_likert" value="-1">
                <input type="radio" name="${exp_list[i].name}_likert" value="0">
                <input type="radio" name="${exp_list[i].name}_likert" value="1">
                <input type="radio" name="${exp_list[i].name}_likert" value="2">
                <label class="likert-label">Strongly Agree</label>
                <input type="text" class="textbox" name="${exp_list[i].name}_why" placeholder="Why? / Give example">
            </div>
        `;
        container.appendChild(questionDiv);

        // Add event listeners to the inputs
        const inputs = questionDiv.querySelectorAll(`input[type="radio"][name="${exp_list[i].name}_likert"]`);
        inputs.forEach(input => {
            input.addEventListener('click', function() {
                // Update SCORE_BOARD with the selected value
                SCORE_BOARD_EXPERIENCES[exp_list[i].name]= parseInt(this.value, 10);//,10 is base 10
                console.log(SCORE_BOARD_EXPERIENCES); // For debugging, to see the updated SCORE_BOARD
                recalculate_score();
                recalculate_windrose();
            });
        });
    }
}

function scaleConversion(value) {
    return (value + 1) * 50;
}


const SCORE_BOARD_EXPERIENCES = {};
const SCORE_BOARD_ACTIVITIES = {};
//init scoreboard
activities.forEach((activity) => {
    SCORE_BOARD_ACTIVITIES[activity.name] = 0;
});


function recalculate_score() {
    // Initialize SCORE_BOARD_ACTIVITIES scores to 0
    activities.forEach((activity) => {
        SCORE_BOARD_ACTIVITIES[activity.name] = 0;
    });

    // Calculate scores for activities based on experiences
    activities.forEach((activity) => {
        activity.imports.forEach((child) => {
            // console.log(activity.name, child);
            // Ensure the child score exists before adding to prevent NaN errors
            if (SCORE_BOARD_EXPERIENCES[child] !== undefined) {
                SCORE_BOARD_ACTIVITIES[activity.name] += SCORE_BOARD_EXPERIENCES[child];
            }
        });
    });

    // Update scales for each activity with the calculated score
    activities.forEach((activity) => {
        updateScale(activity.name, SCORE_BOARD_ACTIVITIES[activity.name]);
    });
}

function recalculate_windrose(){
    let windrose_scores={};
    // SCORE_BOARD_ACTIVITIES.forEach((activity)=>{
    //     windrose_scores[activity]=scaleConversion(SCORE_BOARD_ACTIVITIES[activity]/scale_limits[activity]);
    // })
    Object.keys(SCORE_BOARD_ACTIVITIES).forEach((activity) => {
        windrose_scores[activity] = scaleConversion(SCORE_BOARD_ACTIVITIES[activity] / scale_limits[activity]);
    });
    
    windrose_plot.updateValuesAndRedraw(windrose_scores)
}


createLikertScale();
