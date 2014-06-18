var socket = io.connect();
function addMessage(msg) {
    document.getElementById("chatEntries").innerHTML = msg;
}

function sentMessage() {
    if ($('#messageInput').val() != "") 
    {
        socket.emit('message', $('#messageInput').val());
        $('#messageInput').val('');
    }
}

socket.on('receive', function(data) {
    addMessage(data);
});

$(function() {
    $("#messageInput").click(function() {sentMessage();});
    $('#messageInput').keyup(function(e){ if (e.keyCode == 13) sentMessage(); });
});

$(document).ready(function(){
    socket.emit('message', "");
});


