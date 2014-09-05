// Declare a global variable to hold where our output will go
var outputPane;

// Declare a function that will run when the page is loaded
function onBodyLoad() {
    // Send a message to the console
    console.log("BodyLoad");

    // Find the element with id "resultsPane" and store it in our global
    outputPane = document.getElementById("resultsPane");

    // Find all buttons with the class "simple_button"
    var buttons = document.getElementsByClassName("simple_button");
    for (var i = 0; i < buttons.length; i++) {
        // Add a listener that will call onButtonClick every time a button is clicked
        buttons[i].addEventListener('click', onButtonClick, false);
    }

    // Find all entries with the class "simple_entry"
    var inputs = document.getElementsByClassName("simple_entry");
    for (var j = 0; j < inputs.length; j++) {
        // Add a listener that will call onInputChange every time an input's value changed
        inputs[j].addEventListener('change', onInputChange, false);
    }
}

// Button click handler
function onButtonClick(e) {
    // Grab the element that was clicked
    var elem = e.target;
    // Place the id of the element in the output pane
    outputPane.innerText = elem.id;
}

function onInputChange(e) {
    // Grab the element that changed
    var elem = e.target;
    // Place the text in the output pane
    outputPane.innerText = elem.value;
}
