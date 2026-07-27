export default function header() {

    const element = document.createElement("header");

    element.className = "header-container";


    element.innerHTML = `

        <div class="header-logo">
            ChatVerse
        </div>


        <div class="header-actions">

            <button class="notification-btn">
                🔔
            </button>


            <div class="header-avatar"></div>

        </div>

    `;


    return element;
}
