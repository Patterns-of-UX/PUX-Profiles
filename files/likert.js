function createLikertScale() {
    const container = document.getElementById('likerts');

    for (let i = 1; i <= 36; i++) {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'likert-container';
        //            <div><strong>Question ${i}</strong></div>

        questionDiv.innerHTML = `
            <label class="likert-label">Strongly Disagree</label>
            <input type="radio" name="question${i}" value="1">
            <input type="radio" name="question${i}" value="2">
            <input type="radio" name="question${i}" value="3">
            <input type="radio" name="question${i}" value="4">
            <input type="radio" name="question${i}" value="5">
            <label class="likert-label">Strongly Agree</label>
            <input type="text" class="textbox" name="reason${i}" placeholder="Why? / Give example">
        `;
        container.appendChild(questionDiv);
    }
}

createLikertScale();