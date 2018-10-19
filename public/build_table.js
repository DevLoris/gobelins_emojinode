//WS CONNECTION
var socket = new WebSocket('ws://localhost:5000');
socket.addEventListener('open', function (event) {
    console.log("connected", event);
});
socket.addEventListener('message', function (event) {
    var parse = JSON.parse(event.data);
    displayName(parse.username);
    displayContinue(parse.new_emojis);
    doStat(parse.username, parse.new_emojis);
});

//Use Table
var data_user_use = {};
var data_emoji_use = {};

//Dom elements
var emoji_dom_continue = document.querySelector('.emoji-list-continue');
var emoji_dom_name = document.querySelector('.tweet_name');
var emoji_dom_last = document.querySelector('.emoji-last');

//Sort array by use
function sortByUse(a, b) {
    if (a['value'] === b['value'])
        return 0;
    else
        return (a['value'] < b['value']) ? 1 : -1;
}

//Table builder
function build(table_selector, table_data) {
    var dom_element = document.querySelector(table_selector);
    dom_element.innerText = "";
    table_data = Object.values(table_data);
    table_data = table_data.sort(sortByUse);
    for(data in table_data){
        var content = table_data[data];

        var tr = document.createElement('tr');
        var name = document.createElement('td');
        var value = document.createElement('td');
        name.innerText = content.name;
        value.innerText = content.value;
        tr.append(name);
        tr.append(value);

        dom_element.append(tr);
        if(data>= 10)
            break;
    }
}

function buildTables() {
    build('.leaderboard-user', data_user_use);
    build('.leaderboard-emoji', data_emoji_use);
}



function displayContinue(list) {
    if(list != null && list.length >= 1) {
        for(emoji in list){
            emoji_dom_continue.innerText = list[emoji] + emoji_dom_continue.innerText;
        }
        emoji_dom_last.innerText = list[0];
    }
}

function displayName(username) {
    if(username != null)
        emoji_dom_name.innerText ="@"+ (username);
}

function doStat(username, list) {
    if(username != null) {
        if(data_user_use[username] !== undefined)
            data_user_use[username].value += list.length;
        else
            data_user_use[username] = {value: list.length, name: username};
    }
    if(list != null && list.length >= 1) {
        for(key in list) {
            var emoji = list[key];
            if(data_emoji_use[emoji] !== undefined)
                data_emoji_use[emoji].value += 1;
            else
                data_emoji_use[emoji] = {value: 1, name: emoji};
        }
    }
    buildTables();
}
