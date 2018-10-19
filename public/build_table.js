

function sortArray(a, b) {
    if (a['use'] === b['use'])
        return 0;
    else
        return (a['use'] < b['use']) ? 1 : -1;
}

var emoji_dom = document.querySelector('.list-emojis');
var emoji_dom_continue = document.querySelector('.emoji-list-continue');

function build(emoji_table) {
    emoji_dom.innerHTML = "";
    emoji_table = emoji_table['emojis'];
    emoji_table = Object.values(emoji_table);
    emoji_table.sort(sortArray);
   for(emoji in emoji_table){
       var tr = document.createElement('tr');
       var emoji_td = document.createElement('td');
       emoji_td.innerText = emoji_table[emoji].emoji;
       var emoji_use_td = document.createElement('td');
       emoji_use_td.innerText = emoji_table[emoji].use;

       tr.append(emoji_td);
       tr.append(emoji_use_td);

       emoji_dom.append(tr);
   }
}

function displayContinue(list) {
    if(list != null) {
        for(emoji in list){
            emoji_dom_continue.innerText = list[emoji] + emoji_dom_continue.innerText;
        }
    }
}