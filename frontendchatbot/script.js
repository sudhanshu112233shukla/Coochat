document.addEventListener('DOMContentLoaded', function() {
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const sendButton = document.getElementById('sendButton');
    const newChatButton = document.getElementById('newChatButton');

    // Function to add a new message to the chat
    function addMessage(message, isUser = false) {
        const messageGroup = document.createElement('div');
        messageGroup.classList.add('message-group');
        
        // Create avatar
        const avatar = document.createElement('div');
        avatar.classList.add('message-avatar');
        if (isUser) {
            avatar.classList.add('user');
            avatar.innerHTML = '<i class="fas fa-user"></i>';
        } else {
            avatar.classList.add('bot');
            avatar.innerHTML = '<i class="fas fa-robot"></i>';
        }
        
        // Create message
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = message;

        // Assemble the message group
        messageDiv.appendChild(messageContent);
        messageGroup.appendChild(avatar);
        messageGroup.appendChild(messageDiv);
        chatMessages.appendChild(messageGroup);

        // Scroll to the bottom of the chat
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Function to handle user input
    function handleUserInput() {
        const message = userInput.value.trim();
        if (message !== '') {
            // Add user message to chat
            addMessage(message, true);

            // Clear input field
            userInput.value = '';

            // Simulate bot response (with a slight delay to feel more natural)
            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessage(botResponse);
            }, 500);
        }
    }

    // Simple bot response function (can be expanded later)
    function getBotResponse(userMessage) {
        userMessage = userMessage.toLowerCase();

        if (userMessage.includes('hello') || userMessage.includes('hi')) {
            return 'Hello there! How can I help you today?';
        } else if (userMessage.includes('how are you')) {
            return 'I\'m doing well, thank you for asking! How about you?';
        } else if (userMessage.includes('bye') || userMessage.includes('goodbye')) {
            return 'Goodbye! Have a great day!';
        } else if (userMessage.includes('thank')) {
            return 'You\'re welcome!';
        } else if (userMessage.includes('help')) {
            return 'I\'m here to help! Feel free to ask me anything.';
        } else {
            return 'I\'m still learning. Can you please rephrase or ask something else?';
        }
    }

    // Function to clear chat and start a new conversation
    function startNewChat() {
        // Clear all messages except the first greeting
        while (chatMessages.childNodes.length > 1) {
            chatMessages.removeChild(chatMessages.lastChild);
        }
        
        // Add a new welcome message
        addMessage('Hello! Welcome to COchat. How can I help you today?', false);
        
        // Focus on the input field
        userInput.focus();
    }
    
    // Event listeners
    sendButton.addEventListener('click', handleUserInput);
    
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
    
    newChatButton.addEventListener('click', startNewChat);
    
    // Focus on input field when page loads
    userInput.focus();
});