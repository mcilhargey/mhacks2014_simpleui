// simpleui2.js                                                          -+-JS-+-

// This file will comment on the differences form simpleui.js

var outputPane;

// Here, we connect to the socket for communicating with out nodeJs server, running on the localhost
var socket = io.connect('http://localhost');

// This line sets up a handler for when the server sends a result event.
socket.on('result', function (data) {
    console.log(data);
    outputPane.innerText = data.result;
});


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
        
        // Here we store some extra data on the input elements, the old text. Since they were
        // just created, there is no old text.
        inputs[j].oldText = null;
    }
}

// Instead of setting the text on the outputPane, we send an even to the server
function onButtonClick(e) {
    var elem = e.target;
    // Here we send a button click event, letting the server know which button was clicked
    socket.emit('button_click', { id: elem.id });
}

function onInputChange(e) {
    var elem = e.target;
    // Grab the oldText
    var oldText = elem.oldText;
    // Grab the new text of the input
    var newText = elem.value;
    
    // Here we send an input_change event, letting the server know which input was changed and
    // what the old and new values are.
    socket.emit('input_change', { id: elem.id, oldvalue : oldText, newvalue: newtext });
    
    // Now we store the new text as old
    elem.oldText = newText;
}
