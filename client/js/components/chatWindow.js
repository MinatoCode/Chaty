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


            <div class="message received">

                Nice! Looks cool.

            </div>


        </div>




        <div class="message-input">


            <input 
                placeholder="Type a message..."
            >


            <button>

                ➤

            </button>


        </div>


    `;


    return element;

}
