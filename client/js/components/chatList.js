export default function chatList() {

    const element = document.createElement("div");

    element.className = "chat-list-container";


    element.innerHTML = `

        <h3>
            Chats
        </h3>


        <input 
            class="chat-search"
            placeholder="Search chats..."
        >


        <div class="chat-item">

            <div class="avatar"></div>

            <div>
                <strong>
                    No chats yet
                </strong>

                <p>
                    Start a conversation
                </p>
            </div>

        </div>

    `;


    return element;
}
