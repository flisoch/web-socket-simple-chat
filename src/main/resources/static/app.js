var stompClient = null;
function setConnected(connected) {
    $("#connect").prop("disabled", connected);
    $("#disconnect").prop("disabled", !connected);
    if (connected) {
        $("#conversation").show();
    }
    else {
        $("#conversation").hide();
    }
    $("#greetings").html("");
}

function createConnectedStompClient() {
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function(frame){
        console.log('Connected: ' + frame);
    });
    return stompClient;
}

function listenChat(chatName) {

    if(chatExists(chatName)) {
        alert('already connected to this chat');
        return;
    }
    createNewChatElement(chatName);
    stompClient.subscribe(('/topic/chat/'+ chatName), function(message){
        this.message = message;
        showMessageFromServer(chatName, JSON.parse(message.body));
    });
}
function chatExists(chatName) {
    let chat = $(`#chat-${chatName}`);
    return !(chat.length === 0);
}

function showMessageFromServer(chatName, jsonMessage) {
    let chat = $(`#messages-${chatName}`);
    chat.append(`<tr><td> ${jsonMessage.name} : ${jsonMessage.text} </td></tr>`);
}

function createNewChatElement(chatName) {

    let pillsHolder = $('#pillsHolder');
    let tabs = $('#tab-content');
    pillsHolder.append(`<li><a data-toggle="pill" href="#chat-${chatName}">${chatName}</a></li>`);
    tabs.append(
        `<div id="chat-${chatName}" class="tab-pane fade">
            <div class="row">
                <form class="form-inline">
                    <div class="form-group">
                        <label for="name">What is your name?</label>
                        <input type="text" id="name-${chatName}" class="form-control" placeholder="write your name">
                        <input type="text" id="text-${chatName}" class="form-control" placeholder="write your text">
                    </div>
                    <button id="send-${chatName}" class="btn btn-default" 
                    type="button" onclick="sendMessage('${chatName}')">Send</button>
                </form>
                <div class="col-md-12">
                    <table id="conversation-${chatName}" class="table table-striped">
                        <thead>
                        <tr>
                            <th>Messages</th>
                        </tr>
                        </thead>
                        <tbody id="messages-${chatName}">
                        </tbody>
                    </table>
                </div>
            </div>
        </div>`
    );

}


function sendMessage(chatName) {
    console.log(chatName);
    stompClient.send("/app/chat/"+ chatName, {},
        JSON.stringify({'name': $(`#name-${chatName}`).val(), 'text': $(`#text-${chatName}`).val()}));
}
