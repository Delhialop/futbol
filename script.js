// Information Hub Data
const infoData = {
    historia: {
        title: "Historia del Fútbol Femenino",
        content: "Desde los primeros partidos en el siglo XIX hasta el auge actual. El fútbol femenino ha superado prohibiciones y prejuicios para convertirse en un fenómeno global masivo.",
        image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=800"
    },
    ligas: {
        title: "Las Mejores Ligas",
        content: "Explora la Liga F de España, la WSL de Inglaterra y la NWSL de Estados Unidos, donde convergen las mejores jugadoras del planeta.",
        image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=800"
    },
    iconos: {
        title: "Iconos Legendarios",
        content: "Conoce a las pioneras como Marta, Mia Hamm y Birgit Prinz, quienes pavimentaron el camino para las estrellas de hoy.",
        image: "https://images.unsplash.com/photo-1543326173-054593f4e246?auto=format&fit=crop&q=80&w=800"
    },
    impacto: {
        title: "Impacto y Récords",
        content: "Asistencias de más de 90,000 personas y audiencias millonarias. El fútbol femenino está rompiendo todos los techos de cristal.",
        image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"
    }
};

function selectInfo(category) {
    const data = infoData[category];
    const display = document.getElementById('info-display');
    if (!display) return;

    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.category === category) btn.classList.add('active');
    });

    display.style.opacity = '0';
    display.style.transform = 'translateY(10px)';

    setTimeout(() => {
        display.innerHTML = `
            <div class="info-card-dynamic">
                <div class="info-img-dynamic" style="background-image: url('${data.image}')"></div>
                <div class="info-text-dynamic">
                    <h3>${data.title}</h3>
                    <p>${data.content}</p>
                </div>
            </div>
        `;
        display.style.opacity = '1';
        display.style.transform = 'translateY(0)';
    }, 300);
}

// Chatbot Logic
const botResponses = {
    historia: "El fútbol femenino comenzó a ganar fuerza en el siglo XIX, pero sufrió prohibiciones durante gran parte del siglo XX. Hoy es un movimiento imparable.",
    ligas: "Las ligas más competitivas actualmente son la Liga F (España), la WSL (Inglaterra) y la NWSL (Estados Unidos).",
    jugadoras: "Estrellas como Alexia Putellas, Aitana Bonmatí y Sam Kerr están elevando el nivel del juego.",
    balon: "El Balón de Oro femenino se entrega desde 2018. Ada Hegerberg fue la primera ganadora.",
    default: "Lo siento, no entiendo esa pregunta. Prueba con palabras clave como 'historia', 'ligas' o 'jugadoras'."
};

function addMessage(text, sender, id = null) {
    const chatMessages = document.getElementById('chat-messages');
    if (!chatMessages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    if (id) msgDiv.id = id;
    msgDiv.innerHTML = text;
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function processInput(input) {
    const userMessage = input.trim();
    if (!userMessage) return;

    // Indicador de carga
    const loadingId = "loading-" + Date.now();
    addMessage("Pensando...", 'bot', loadingId);

    try {
        const backendUrl = 'https://delhia-tarea.hf.space/chat';

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        const loadingMsg = document.getElementById(loadingId);
        if (loadingMsg) loadingMsg.remove();

        const botResponse = data.response || data.respuesta;
        if (botResponse) {
            addMessage(botResponse, 'bot');
        } else if (data.error) {
            addMessage(`Error: ${data.error}`, 'bot');
        } else {
            addMessage("Lo siento, no pude obtener una respuesta válida.", 'bot');
        }
    } catch (error) {
        console.error("Error:", error);
        const loadingMsg = document.getElementById(loadingId);
        if (loadingMsg) loadingMsg.remove();
        addMessage("No pude conectarme al servidor de IA. ¿Está activo?", 'bot');
    }
}

// Player Data
const players = [
    {
        name: "Alexia Putellas",
        country: "España",
        image: "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?auto=format&fit=crop&q=80&w=800",
        bio: "Doble ganadora del Balón de Oro. Capitana del FC Barcelona y líder técnica indiscutible de la selección española."
    },
    {
        name: "Aitana Bonmatí",
        country: "España",
        image: "https://images.unsplash.com/photo-1628891890467-b79f2c8ba9ed?auto=format&fit=crop&q=80&w=800",
        bio: "Balón de Oro 2023. Motor del centro del campo con una visión de juego y elegancia técnica inigualables."
    },
    {
        name: "Sam Kerr",
        country: "Australia",
        image: "https://images.unsplash.com/photo-1517466787919-ca0469074900?auto=format&fit=crop&q=80&w=800",
        bio: "Máxima goleadora histórica de Australia. Conocida por su olfato goleador y sus icónicas celebraciones."
    },
    {
        name: "Wendie Renard",
        country: "Francia",
        image: "https://images.unsplash.com/photo-1564594736624-def7a10ab047?auto=format&fit=crop&q=80&w=800",
        bio: "Leyenda del Lyon. Considerada una de las mejores defensas centrales de la historia del fútbol femenino."
    },
    {
        name: "Megan Rapinoe",
        country: "EE. UU.",
        image: "https://images.unsplash.com/photo-1552318970-d9229e378c85?auto=format&fit=crop&q=80&w=800",
        bio: "Icono mundial dentro y fuera del campo. Bicampeona del mundo y ganadora del Balón de Oro 2019."
    },
    {
        name: "Marta Vieira",
        country: "Brasil",
        image: "https://images.unsplash.com/photo-1518605336324-581770067117?auto=format&fit=crop&q=80&w=800",
        bio: "Seis veces elegida mejor jugadora del mundo por la FIFA. La 'Rainha' definitiva del fútbol brasileño."
    }
];

function renderPlayers() {
    const grid = document.getElementById('players-grid');
    if (!grid) return;

    grid.innerHTML = players.map(player => `
        <div class="card player-card">
            <div class="card-img" style="background-image: url('${player.image}')"></div>
            <div class="card-content">
                <span class="player-country">${player.country}</span>
                <h3 class="player-name">${player.name}</h3>
                <p class="player-bio">${player.bio}</p>
            </div>
        </div>
    `).join('');
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Info Hub Init
    selectInfo('historia');
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', () => selectInfo(btn.dataset.category));
    });

    // Render Players
    renderPlayers();

    // Chatbot Toggle
    const chatbotTrigger = document.getElementById('chatbot-trigger');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');

    if (chatbotTrigger && chatWindow) {
        chatbotTrigger.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
    }
    if (closeChat) {
        closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));
    }

    // Chat Submission
    const chatForm = document.getElementById('chat-input-form');
    const chatInput = document.getElementById('chat-input');
    if (chatForm && chatInput) {
        chatForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatInput.value.trim();
            if (text) {
                addMessage(text, 'user');
                chatInput.value = '';
                processInput(text);
            }
        });
    }

    // Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('section').forEach(section => {
        if (section.id !== 'inicio') {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'all 0.8s ease-out';
            observer.observe(section);
        }
    });

    // Smooth Scroll
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({ top: targetSection.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });
});

