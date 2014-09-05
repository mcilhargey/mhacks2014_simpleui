var outputPane;




function onBodyLoad() {
    console.log("BodyLoad");
    outputPane = document.getElementById("resultsPane");
    var buttons = document.getElementsByClassName("simple_button");
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', onButtonClick, false);
    }
    var inputs = document.getElementsByClassName('simple_entry');
    for (var j = 0; j < inputs.length; j++) {
        inputs[j].addEventListener('change', onInputChange, false);
    }
}

function onButtonClick(e) {
    var elem = e.target;
    outputPane.innerText = elem.id;
}

function onInputChange(e) {
    var elem = e.target;
    outputPane.innerText = elem.value;
}
