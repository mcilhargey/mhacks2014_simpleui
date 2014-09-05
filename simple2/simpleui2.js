var outputPane;
var socket = io.connect('http://localhost');
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
    }

    
}

function onButtonClick(e) {
    var elem = e.target;
    socket.emit('button_click', { id: elem.id });
}

function onInputChange(e) {
    var elem = e.target;
    socket.emit('input_change', { id: elem.id, value: elem.value });
}
