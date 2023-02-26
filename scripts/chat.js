
class Chatroom{
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message){
        const now = new Date();

        const chat = {
            message,
            room : this.room,
            username : this.username,
            created_at : firebase.firestore.Timestamp.fromDate(now)

        };

        const response = await this.chats.add(chat);
        return response;
    }

    getChats(callback){
        this.unsub = this.chats
            .where('room', '==', this.room)       //comapres the name of the room (use == )
            .orderBy('created_at')                // order by created at time
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        callback(change.doc.data());
                    }
                })
            })
    }

    updateName(name){
        this.username = name;
        localStorage.setItem('username', username);
    }

    updateRoom(room){
        this.room = room;
        if(this.unsub){
            this.unsub();
        }
    }
}

