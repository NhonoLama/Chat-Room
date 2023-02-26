//DOM queries
const chatlist = document.querySelector('.chat-list');
const newChat = document.querySelector('.new-chat');
const newName = document.querySelector('.new-name');
const updateMsg = document.querySelector('.update-msg');
const chatRoom = document.querySelector('.chat-rooms');

//add a new chat
newChat.addEventListener('submit', e => {
    e.preventDefault();

    const message = newChat.message.value.trim();
    chatroom.addChat(message)
     .then(() => newChat.reset())
     .catch(err => console.log(err));
})

//update username
newName.addEventListener('submit' , e =>{
    e.preventDefault();

    const name = newName.name.value.trim();
    chatroom.updateName(name);
    newName.reset();

    updateMsg.innerText = `Your name was updated to ${name}.`;

    setTimeout(() => updateMsg.innerText = '' ,3000);
})

//update the room
chatRoom.addEventListener('click' , e =>{

    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => chatUI.render(chat));
    }
})

//check for existing username in local storage
const username = localStorage.username ? localStorage.username : 'guest'; 

//class instances
const chatUI = new ChatUI(chatlist);
const chatroom = new Chatroom('Business', username);


//get chat and render
chatroom.getChats(data => chatUI.render(data));