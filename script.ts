interface Message {
    content: string;
    likes: number;
}

const messagesDiv = document.getElementById('messages') as HTMLDivElement;
const messageForm = document.getElementById('messageForm') as HTMLFormElement;
const messageInput = document.getElementById('messageInput') as HTMLInputElement;

messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const messageContent = messageInput.value.trim();
    if (messageContent) {
        sendMessage(messageContent);
        messageInput.value = '';
    }
});

function sendMessage(content: string) {
    const message: Message = { content, likes: 0 };
    fetch('server.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
    })
    .then(response => response.json())
    .then(data => {
        displayMessages(data);
    })
    .catch(error => console.error('Error:', error));
}

function likeMessage(index: number) {
    fetch(`server.php?like=${index}`, { method: 'POST' })
    .then(response => response.json())
    .then(data => {
        displayMessages(data);
    })
    .catch(error => console.error('Error:', error));
}

function displayMessages(messages: Message[]) {
    messagesDiv.innerHTML = '';
    messages.forEach((message, index) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');

        const messageContentElement = document.createElement('div');
        messageContentElement.classList.add('message-content');
        messageContentElement.textContent = message.content;

        const likeButton = document.createElement('button');
        likeButton.classList.add('like-button');
        likeButton.innerHTML = `&#x1F44D; ${message.likes}`;
        likeButton.addEventListener('click', () => likeMessage(index));

        messageElement.appendChild(messageContentElement);
        messageElement.appendChild(likeButton);

        messagesDiv.appendChild(messageElement);
    });
}

// Initial load
fetch('server.php')
    .then(response => response.json())
    .then(data => {
        displayMessages(data);
    })
    .catch(error => console.error('Error:', error));
