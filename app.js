var express = require('express');
var path = require('path');
const FormatMessage = require('./util/messages');
const {users, AddUsers, getCurrentUser, UserLeave, getRoomUser} = require("./util/user");
app =express();

app.use(express.static( path.join(__dirname, 'public')));
http = require('http').Server(app);  
port = process.env.PORT || 8080;        //port: 3000 
host = "127.0.0.1"  ;                     //address: localhost

const chatbot = "Chat Bot";
//Socket connection
const io = require('socket.io')(http) ;
//Event will be fired from frontend js|
io.on('connection', function(socket){
    socket.on('joinroom', function(object ) {
        const user = AddUsers(socket.id, object.username, object.room);
        socket.join(user.room);

        socket.emit('message', FormatMessage(chatbot,"Welcome to chat application!"));
        broadcast_mssg =`${object.username}  has joined the chat`;
        socket.broadcast.to(user. room).emit('message', FormatMessage('', broadcast_mssg));

        io.emit('room_users',{
            room: user.room, 
            users: getRoomUser(user.room) 
            });
    });
    console.log("A user/ client has connected!" );

    socket.on('chat-mssg', function(msg){
        // console.log(user, socket.id);
        const current_user = getCurrentUser(socket.id);
        socket.emit('msg_self', FormatMessage('You', msg) );
        socket.broadcast .to(current_user.room).emit('message',FormatMessage(current_user.username, msg));

        io.emit('room_users', {
            room: current_user.room,
            users: getRoomUser(current_user.room) 
        });

    });

    socket.on('disconnect', function() {
    const current_user = UserLeave (socket.id);

    if (current_user){
        io .to(current_user.room).emit('message', FormatMessage(chatbot, `${current_user.username} has left the chat..`));
        io.emit('room_users', {
            room: current_user.room,
            users: getRoomUser(current_user.room)
        });
    
    };
});
});

http.listen(port,host, function(){
	console.log("Listening @ http://" + host.toString()+":"+ http.address().port);
});
