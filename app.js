

function handleClick(data){
    let minibox_element = document.getElementById(data);
    // console.log(minibox_element)
    let state = minibox_element.attributes['state'].value;
    state = parseInt(state) % 3;
    state += 1;
    // console.log(state);
    minibox_element.attributes['state'].value = state;
    if(state == 1){
        minibox_element.style.background = "white";
    }
    if(state == 2){
        minibox_element.style.background = "greenyellow";
    }
    if(state == 3){
        minibox_element.style.background = "green";
    }
}

var id = "0_0"


function getElementStr(id){
    var elementStr = "<span class='minibox' state = '1' id='" + id + "' onclick='handleClick(`" +  id + "`)'>&nbsp;&nbsp;</span>";
    return elementStr;
}

var board = document.getElementById('board')

for(var i = 1 ; i <= 7 ; i++){
    var rowElement = document.createElement('div');
    rowElement.setAttribute('class' , 'row');
    rowElement.setAttribute('id' , 'row');
    var miniBoxElements = ""
    for(var j = 1 ; j <= 51 ; j++){
        var miniStr = getElementStr(i + "_" + j);
        miniBoxElements += miniStr;
    }
    rowElement.innerHTML = miniBoxElements;
    // console.log(miniBoxElements)
    board.appendChild(rowElement);
}


var jsonData = []

function generate(){
    console.log('hello');
    for(var i = 1 ; i <= 7 ; i++){
        for(var j = 1 ; j <= 51 ; j++){
            var id = i + "_" + j;
            var elem = document.getElementById(id);
            // console.log(elem.attributes['state'].value);
            
            var state = parseInt(elem.attributes['state'].value);
            if(state == 2 || state == 3){
                var oneJson = {
                    x : j,
                    y : i
                };
                jsonData.push(oneJson);
            }
        }
    }
    for(var i = 1 ; i <= 7 ; i++){
        for(var j = 1 ; j <= 51 ; j++){
            var id = i + "_" + j;
            var elem = document.getElementById(id);
            var state = parseInt(elem.attributes['state'].value);
            if(state == 3){
                var oneJson = {
                    x : j,
                    y : i
                };
                jsonData.push(oneJson);
            }
        }
    }

    document.getElementById('points').innerHTML = JSON.stringify(jsonData)
}