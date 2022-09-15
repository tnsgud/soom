const socket = io();

const welcome = document.getElementById('welcome');
const form = welcome.querySelector('form');
const room = document.getElementById('room');

room.hidden = true;

let roomName = '';
let userCount = 0;

const addMessage = (message) => {
  const ul = room.querySelector('ul');
  const li = document.createElement('li');
  li.innerText = message;
  ul.appendChild(li);
};

const handleMessageSubmit = (e) => {
  e.preventDefault();

  const input = room.querySelector('#msg input');
  const value = input.value;
  socket.emit('new_message', value, roomName, () => {
    addMessage(`You: ${value}`);
  });

  input.value = '';
};

const handleNicknameSubmit = (e) => {
  e.preventDefault();

  const input = room.querySelector('#name input');
  const value = input.value;

  socket.emit('nickname', value);
  input.value = '';
};

const showRoom = (count) => {
  welcome.hidden = true;
  room.hidden = false;

  const h3 = room.querySelector('h3');

  userCount = count;
  h3.innerText = `Room ${roomName}(${userCount})`;

  const msgForm = room.querySelector('#msg');
  const nameForm = room.querySelector('#name');

  msgForm.addEventListener('submit', handleMessageSubmit);
  nameForm.addEventListener('submit', handleNicknameSubmit);
};

const handleRoomSubmit = (e) => {
  e.preventDefault();

  const input = form.querySelector('input');
  roomName = input.value;
  userCount += 1;

  socket.emit('enter_room', input.value, showRoom);
  input.value = '';
};

form.addEventListener('submit', handleRoomSubmit);

socket.on('welcome', (userNickname, count) => {
  const h3 = room.querySelector('h3');
  console.log(userCount);
  console.log(count);
  userCount += 1;
  h3.innerText = `Room ${roomName}(${userCount})`;

  addMessage(`${userNickname} arrived!`);
});

socket.on('bye', (userNickname, newCount) => {
  const h3 = room.querySelector('h3');

  userCount -= 1;

  h3.innerText = `Room, ${roomName} (${newCount})`;
  addMessage(`${userNickname} left ㅠㅠ`);
});

socket.on('new_message', (msg) => {
  addMessage(msg);
});

socket.on('room_change', (rooms) => {
  console.log('test');
  const roomList = welcome.querySelector('ul');

  roomList.innerText = '';

  if (rooms.length === 0) return;

  rooms.forEach((room) => {
    const li = document.createElement('li');

    li.innerText = room;
    roomList.append(li);
  });
});
