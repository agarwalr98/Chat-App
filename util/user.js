var users = [];

// Add users into a list of users(with room)
function AddUsers(id, username, room){
    console.log("In AddUsers ");
    const user ={id, username, room};
    users.push(user);   

    return user;
}

// user leaves a room
function UserLeave(id){
    const index = users.findIndex(user => user.id === id);

    if (index!==-1)
    {
        return users.splice(index, 1)[0];
    }
}

// All users of one room
function getRoomUser(room){
    return users.filter(user=> user.room === room);
}

// geth current user.
function getCurrentUser (id){
    console.log(users, id);
    return users.find(user => user.id===id);
}

//Exports these modules .
module.exports ={users,
    AddUsers, 
    getCurrentUser, 
    UserLeave,
    getRoomUser


};