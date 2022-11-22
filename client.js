document.getElementById('time').innerText = new Date().toLocaleTimeString([], {
  hour: '2-digit',
  minute: "2-digit",
  hour12: false
})
console.log('js connected');

var sendAudio = new Audio('http://evening-tor-18134.herokuapp.com/api/audio/send');
var receiveAudio = new Audio('http://evening-tor-18134.herokuapp.com/api/audio/receive');


var socket = io('http://evening-tor-18134.herokuapp.com/');
var form = document.getElementById('form');
var input = document.getElementById('input');
var scroll = () => document.getElementsByClassName("card-body")[0].scrollTo(0, document.getElementsByClassName("card-body")[0].scrollHeight);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    addHere(input.value);
    socket.emit('chat message', input.value);
    console.log("1: " + input.value);
    sendAudio.play();
    input.value = '';
  }
});

socket.on('chat message', (msg) => {
  addThere(msg);
});


function addHere(msg) {
  const position = document.getElementsByClassName("card-body")[0].lastElementChild.id;


  if (position == 'left' || position == "") {
    const divRight = document.createElement("div");
    const divEmpty = document.createElement("div");
    const body = document.getElementsByClassName("card-body")[0];
    const br = document.createElement("br");

    const msgTag = document.createElement('p');
    msgTag.classList = "small p-2 me-3 mb-1 text-white rounded-3 bg-primary";
    msgTag.style.display = "inline-block";

    msgTag.innerText = msg;

    divRight.classList = "d-flex flex-row justify-content-end mb-4 pt-1";
    divRight.id = "right";
    divEmpty.style.direction = "rtl";
    divRight.appendChild(divEmpty);
    divRight.firstElementChild.appendChild(msgTag);
    divRight.firstElementChild.appendChild(br);
    body.appendChild(divRight);
    scroll();
  } else {
    const body = document.getElementsByClassName("card-body")[0].lastElementChild.firstElementChild;
    const msgTag = document.createElement('p');
    const br = document.createElement("br");

    msgTag.classList = "small p-2 me-3 mb-1 text-white rounded-3 bg-primary";
    msgTag.style.display = "inline-block";

    msgTag.innerText = msg;

    body.appendChild(msgTag);
    body.appendChild(br);
    scroll();
  }

}

function addThere(msg) {
  receiveAudio.pause();
  receiveAudio.currentTime = 0;
  receiveAudio.play();

  const position = document.getElementsByClassName("card-body")[0].lastElementChild.id;

  if (position == 'right' || position == "") {
    const divLeft = document.createElement("div");
    const divEmpty = document.createElement("div");
    const body = document.getElementsByClassName("card-body")[0];

    const msgTag = document.createElement('p');
    const br = document.createElement("br");

    msgTag.classList = "small p-2 ms-3 mb-1 rounded-3";
    msgTag.style.display = "inline-block";
    msgTag.innerText = msg;

    divLeft.classList = "d-flex flex-row justify-content-start mb-4 pt-1";
    divLeft.id = "left";
    divLeft.appendChild(divEmpty);
    divLeft.firstElementChild.appendChild(msgTag);
    body.appendChild(br);
    body.appendChild(divLeft);
    scroll();
  } else {
    const body = document.getElementsByClassName("card-body")[0].lastElementChild.firstElementChild;
    const msgTag = document.createElement('p');
    const br = document.createElement("br");

    msgTag.classList = "small p-2 ms-3 mb-1 rounded-3";

    msgTag.innerText = msg;

    body.appendChild(msgTag);
    body.appendChild(br);
    scroll();
  }
}