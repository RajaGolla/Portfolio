document.querySelectorAll('.certification-card').forEach(card => {
    card.addEventListener('click', function() {
        const imgSrc = this.querySelector('.certification-image img').src;
        
        // Remove any existing modal
        const existingModal = document.querySelector('.certification-modal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create new modal
        const modal = document.createElement('div');
        modal.className = 'certification-modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <img src="${imgSrc}" alt="Certification">
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close modal when clicked
        modal.addEventListener('click', function() {
            this.remove();
        });
        
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
        
        // Re-enable scrolling when modal is closed
        modal.addEventListener('click', function() {
            document.body.style.overflow = 'auto';
            this.remove();
        });
    });
}); 

// Mobile Menu Toggle
const menuBtn = document.createElement('div');
menuBtn.className = 'menu-btn';
menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('header').appendChild(menuBtn);

menuBtn.addEventListener('click', () => {
    const nav = document.querySelector('nav');
    nav.classList.toggle('active');
    menuBtn.querySelector('i').classList.toggle('fa-bars');
    menuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close menu when clicking a link
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('nav').classList.remove('active');
        menuBtn.querySelector('i').classList.add('fa-bars');
        menuBtn.querySelector('i').classList.remove('fa-times');
    });
}); 

const faqs = [
    {
        question: "👋 Hi! What can you tell me about yourself?",
        answer: "I'm Raja Sekhar Golla, a Full Stack Developer passionate about creating web applications. I specialize in HTML, CSS, JavaScript, and more!"
    },
    {
        question: "🚀 What are your main skills?",
        answer: "I'm proficient in HTML5, CSS3, JavaScript, Bootstrap, MySQL, and Java. I love building responsive and user-friendly websites!"
    },
    {
        question: "💼 Can I see your work?",
        answer: "Check out my projects section! I've built an e-commerce website and a food delivery platform. Each project showcases different aspects of my skills."
    },
    {
        question: "📧 How can I reach you?",
        answer: "You can email me at rajagolla95@gmail.com or connect with me on LinkedIn. I'm always open to discussing new opportunities!"
    },
    {
        question: "🤝 Are you available for collaboration?",
        answer: "Yes! I'm open to freelance projects and full-time opportunities. Let's discuss how we can work together!"
    }
];

document.addEventListener('DOMContentLoaded', function() {
    const chatbotButton = document.getElementById('chatbotButton');
    const chatbotContainer = document.getElementById('chatbotContainer');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotMessages = document.getElementById('chatbotMessages');
    let isInitialized = false;

    function toggleChatbot() {
        const isActive = chatbotContainer.classList.contains('active');
        if (isActive) {
            chatbotContainer.classList.remove('active');
        } else {
            chatbotContainer.classList.add('active');
            if (!isInitialized) {
                initializeChatbot();
                isInitialized = true;
            }
        }
    }

    function addMessage(content, isBot = true, isQuestion = false) {
        const messageDiv = document.createElement('div');
        
        if (isQuestion) {
            messageDiv.className = 'message bot-message question message-animate';
            messageDiv.style.cursor = 'pointer';
            messageDiv.addEventListener('click', () => {
                const faq = faqs.find(f => f.question === content);
                if (faq) {
                    addMessage(faq.answer);
                }
            });
        } else {
            messageDiv.className = `message ${isBot ? 'bot-message' : 'user-message'} message-animate`;
        }
        
        messageDiv.textContent = content;
        chatbotMessages.appendChild(messageDiv);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function initializeChatbot() {
        chatbotMessages.innerHTML = '';
        addMessage("🤖 Hello! I'm Raja's Portfolio Assistant!");
        setTimeout(() => {
            addMessage("Please click on any question below to get more information:");
            faqs.forEach((faq, index) => {
                setTimeout(() => {
                    addMessage(faq.question, true, true);
                }, index * 500);
            });
        }, 500);
    }

    // Toggle chatbot on button click
    chatbotButton.addEventListener('click', toggleChatbot);

    // Close chatbot on close button click
    closeChatbot.addEventListener('click', (e) => {
        e.stopPropagation();
        chatbotContainer.classList.remove('active');
    });

    // Prevent clicks inside chatbot from closing it
    chatbotContainer.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    // Robot animation
    setInterval(() => {
        if (!chatbotContainer.classList.contains('active')) {
            const robotIcon = chatbotButton.querySelector('i');
            robotIcon.style.animation = 'none';
            robotIcon.offsetHeight;
            robotIcon.style.animation = 'robotWave 2s';
        }
    }, 5000);
});

// Add styles for clickable questions
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .message.question {
        background-color: #34495e !important;
        color: #fff !important;
        transition: all 0.3s ease;
    }

    .message.question:hover {
        background-color: #2c3e50 !important;
        transform: translateX(5px);
    }

    .message-animate {
        opacity: 0;
        transform: translateY(20px);
        animation: messageAppear 0.3s forwards;
    }

    @keyframes messageAppear {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet); 