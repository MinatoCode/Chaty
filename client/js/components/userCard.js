export default function userCard(user = {}) {

    const element = document.createElement("div");

    element.className = "user-card";


    element.innerHTML = `

        <div class="avatar"></div>


        <div class="user-info">

            <h4>
                ${user.name || "User"}
            </h4>

            <p>
                ${user.status || "Online"}
            </p>

        </div>

    `;


    return element;
}
