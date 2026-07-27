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



        <div class="chat-items">


            <div class="chat-item">

                <div class="chat-avatar online">
                    A
                </div>


                <div class="chat-info">

                    <div class="chat-top">

                        <strong>
                            Alex
                        </strong>

                        <span>
                            9:42 PM
                        </span>

                    </div>


                    <div class="chat-bottom">

                        <p>
                            Hey, what's up?
                        </p>


                        <div class="unread">
                            2
                        </div>

                    </div>

                </div>

            </div>




            <div class="chat-item">

                <div class="chat-avatar">
                    S
                </div>


                <div class="chat-info">

                    <div class="chat-top">

                        <strong>
                            Sarah
                        </strong>

                        <span>
                            8:15 PM
                        </span>

                    </div>


                    <div class="chat-bottom">

                        <p>
                            See you tomorrow
                        </p>

                    </div>

                </div>

            </div>



        </div>

    `;



    // Active chat selection

    const chats = element.querySelectorAll(".chat-item");


    chats.forEach(chat => {


        chat.addEventListener("click", () => {


            chats.forEach(item => {

                item.classList.remove("active");

            });


            chat.classList.add("active");


        });


    });



    return element;

}
