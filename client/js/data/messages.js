export const chats = {

    alex: {
        id: "alex",
        name: "Alex",
        avatar: "A",
        online: true,

        messages: [
            {
                id: 1,
                own: false,
                text: "Hey! 👋",
                time: "10:15 PM"
            },
            {
                id: 2,
                own: true,
                text: "Hello Alex!",
                time: "10:16 PM"
            }
        ]
    },

    sarah: {
        id: "sarah",
        name: "Sarah",
        avatar: "S",
        online: true,

        messages: [
            {
                id: 1,
                own: false,
                text: "Hi 😊",
                time: "09:40 PM"
            },
            {
                id: 2,
                own: false,
                text: "How are you?",
                time: "09:41 PM"
            }
        ]
    }

};

export let currentChat = "alex";

export function setCurrentChat(id) {

    currentChat = id;

}
