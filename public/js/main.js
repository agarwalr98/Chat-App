
const chatForm = document.getElementById('chat-form');
const chatMessage = document.querySelector ('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

const {username, room}= Qs.parse(window.location.search, {
  ignoreQueryPrefix: true
});

const socket =io ();

socket.emit('joinroom', {username, room});
socket.on('message', function(message){
  console.log(" CLIENT side mssg ", message);
  outputmessage(message );
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

socket.on('msg_self', function(message){
  outputmessage(message, "50px ");
  chatMessage.scrollTop = chatMessage.scrollHeight;
});

socket.on('room_users', function( {room, users}){
  console.log("room: ", room, "users are ", users);
  outputRoomName(room);
  outputUsers(users);
});


chatForm.addEventListener('submit', function(event){
  event. preventDefault();
  const msg = event.target.elements.msg.value;
  console.log (msg);

  socket.emit('chat-mssg', msg);
  event.target.elements.msg.value= '';
  event.target.elements.msg.focus(); 
});

function outputmessage(message, margin)
{
  console.log("In outputmessage: ", message, margin);
  const div = document.createElement('div');
  div.classList.add('message');
  div.style.marginLeft = `${margin}`;
  div.innerHTML = `<p class="meta">${message.user} <span> ${ message.time}</span></p>
  <p class="text">
  ${message.message }
  </p>`
  document.querySelector('.chat-messages').appendChild(div);

};

// Add room name to DOM.
function outputRoomName(room)
{
  roomName.innerText = room;
};

// Output users to HTML..
function outputUsers(users)
{
  userList.innerHTML = `
  ${users.map(user =>  `<li>${user.username}</li>`).join('')}`;
}
