//render chat templates of dom
//clears the chats(when the room changes)


class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix: true}
        );

        const html = `
            <li class="list-group-item">
            <span>${data.username}</span>
            <span>${data.message}</span>
            <div>${when}</div>
            </li>
         `;

        this.list.innerHTML += html;
    }
}