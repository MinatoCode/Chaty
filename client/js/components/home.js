export default function home() {

    const element = document.createElement("div");

    element.className = "home-container";


    element.innerHTML = `

        <div class="welcome">

            <h1>
                Welcome to ChatVerse
            </h1>


            <p>
                Select a conversation or find someone to start chatting.
            </p>


            <button>
                Find Friends
            </button>

        </div>

    `;


    return element;
}
