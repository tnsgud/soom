const socket = io();

const welcome = document.getElementById('welcome');
const form = document.querySelector('form');

const handleRoomSubmit = (e) => {
  e.preventDefault();

  const input = form.querySelector('input');

  socket.emit('enter_room', { payload: input.value });
  input.value = '';
};

form.addEventListener('submit', handleRoomSubmit);
