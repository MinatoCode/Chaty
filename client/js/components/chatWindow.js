export default function chatWindow() {

    const element = document.createElement("div");

    element.className = "chat-window";


    element.innerHTML = `

        <div class="chat-header">

            <button class="chat-back-btn">
                ➜
            </button>


            <div class="chat-user">

                <div class="chat-avatar online">
                    A
                </div>


                <div>

                    <h3>
                        Alex
                    </h3>

                    <span>
                        Online
                    </span>

                </div>

            </div>

        </div>



        <div class="messages">


            <div class="message received">
                Hey, what's up?
            </div>


            <div class="message sent">
                Nothing much, just testing ChatVerse.
            </div>


        </div>



        <div class="message-input">


            <input 
                class="message-text"
                placeholder="Type a message..."
            >


            <button class="send-btn">
                ➤
            </button>


        </div>

    `;



    const input = element.querySelector(".message-text");

    const sendButton = element.querySelector(".send-btn");

    const messages = element.querySelector(".messages");



    function sendMessage() {


        const text = input.value.trim();


        if (!text) {

            return;

        }



        const message = document.createElement("div");


        message.className = "message sent";


        message.textContent = text;



        messages.appendChild(message);



        input.value = "";



        messages.scrollTop = messages.scrollHeight;

    }



    sendButton.addEventListener("click", sendMessage);



    input.addEventListener("keydown", (event) => {


        if (event.key === "Enter") {

            sendMessage();

        }


    });



    return element;

}
