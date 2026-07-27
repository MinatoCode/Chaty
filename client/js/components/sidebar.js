export default function sidebar() {

    const element = document.createElement("div");

    element.className = "sidebar-container";

    element.innerHTML = `
        <h2 class="logo">
            ChatVerse
        </h2>

        <nav>

            <button>
                💬 Chats
            </button>

            <button>
                👥 Friends
            </button>

            <button>
                📩 Requests
            </button>

            <button>
                🔎 Search
            </button>

            <button>
                👤 Profile
            </button>

            <button>
                ⚙ Settings
            </button>

        </nav>


        <div class="user-status">

            <div class="avatar"></div>

            <div>
                <p>User</p>
                <span>● Online</span>
            </div>

        </div>
    `;


    return element;
}
