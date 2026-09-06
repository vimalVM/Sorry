document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.getElementById('envelope-wrapper');
    const card = document.getElementById('card');
    const hintText = document.getElementById('hint-text');
    const replayBtn = document.getElementById('replay-btn');

    let state = 0; // 0: closed, 1: flap open, 2: card out, 3: card read

    // Apply idle animation initially
    wrapper.classList.add('envelope-idle');

    function advanceState() {
        if (state === 0) {
            // Open flap
            wrapper.classList.remove('envelope-idle');
            wrapper.classList.add('state-open');
            hintText.style.opacity = '0';
            
            setTimeout(() => {
                hintText.textContent = 'Pull the card';
                hintText.style.opacity = '1';
                state = 1;
            }, 600);
        } 
        else if (state === 1) {
            // Card peeking out
            wrapper.classList.add('state-card-peek');
            hintText.style.opacity = '0';
            
            setTimeout(() => {
                hintText.textContent = 'Tap to read';
                hintText.style.opacity = '1';
                state = 2;
            }, 600);
        }
    }

    function readCard(e) {
        if (state === 2) {
            e.stopPropagation(); // Don't trigger wrapper click
            wrapper.classList.add('state-card-read');
            hintText.style.opacity = '0';
            state = 3;
        } else if (state === 3) {
            e.stopPropagation();
            state = 4; // transitioning back

            spawnFlowers();

            // 1. Shrink back to peek state
            wrapper.classList.remove('state-card-read');
            
            setTimeout(() => {
                // 2. Drop back inside
                wrapper.classList.remove('state-card-peek');
                
                setTimeout(() => {
                    // 3. Close flap
                    wrapper.classList.remove('state-open');
                    
                    wrapper.classList.add('envelope-idle');
                    state = 0;
                    
                    hintText.textContent = 'Tap to open';
                    hintText.style.opacity = '1';
                }, 600);
            }, 600);
        }
    }

    function spawnFlowers() {
        const flowerPaths = [
            // Flower 1 (Pink full flower)
            `<path d="M50 20 Q60 5 70 20 Q85 30 70 45 Q85 60 70 70 Q60 85 50 70 Q40 85 30 70 Q15 60 30 45 Q15 30 30 20 Q40 5 50 20 Z" fill="#E7B5C0" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/> <circle cx="50" cy="45" r="5" fill="#E8C468" stroke="#222" stroke-width="1.5"/>`,
            // Flower 2 (Yellow pointy)
            `<path d="M50 30 Q65 15 80 40 Q75 60 50 60 Q25 60 20 40 Q35 15 50 30 Z" fill="#E8C468" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/> <circle cx="50" cy="45" r="4" fill="#E7B5C0" stroke="#222" stroke-width="1.5"/>`,
            // Flower 3 (Small pink)
            `<path d="M50 15 Q70 10 75 35 Q80 60 50 70 Q20 60 25 35 Q30 10 50 15 Z" fill="#E7B5C0" stroke="#222" stroke-width="1.5" stroke-linejoin="round"/> <circle cx="50" cy="40" r="6" fill="#E8C468" stroke="#222" stroke-width="1.5"/>`,
            // Flower 4 (Dandelion/Stem style)
            `<path d="M50 40 Q55 60 55 90" stroke="#222" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="50" cy="40" r="6" fill="#E8C468" stroke="#222" stroke-width="1.5"/><circle cx="40" cy="30" r="3" fill="#E7B5C0" stroke="#222" stroke-width="1.5"/><circle cx="60" cy="30" r="3" fill="#E7B5C0" stroke="#222" stroke-width="1.5"/>`
        ];

        // Spawn 20 random flowers
        for (let i = 0; i < 20; i++) {
            const flower = document.createElement('div');
            flower.className = 'spawned-flower';
            flower.innerHTML = `<svg viewBox="0 0 100 100">${flowerPaths[Math.floor(Math.random() * flowerPaths.length)]}</svg>`;
            
            // Random positioning across viewport
            const startX = Math.random() * 90 + 5;
            const startY = Math.random() * 90 + 5;
            
            flower.style.left = `${startX}vw`;
            flower.style.top = `${startY}vh`;
            
            const scale = 0.4 + Math.random() * 0.8; 
            const rotation = Math.random() * 360;
            const delay = Math.random() * 0.5;
            
            flower.style.transform = `scale(0) rotate(${rotation}deg)`;
            flower.style.transition = `transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}s, opacity 0.8s ease ${delay}s`;
            
            document.body.appendChild(flower);
            
            // Trigger animation next frame
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    flower.style.transform = `scale(${scale}) rotate(${rotation + 45}deg)`;
                    flower.style.opacity = 1;
                });
            });
        }
    }

    function resetAnimation(e) {
        e.stopPropagation();
        state = 0;
        
        // Remove all state classes
        wrapper.classList.remove('state-open', 'state-card-peek', 'state-card-read');
        
        // Force reflow to restart animations
        void wrapper.offsetWidth;
        
        wrapper.classList.add('envelope-idle');
        hintText.textContent = 'Tap to open';
        hintText.style.opacity = '1';
    }

    // Event Listeners
    wrapper.addEventListener('click', advanceState);
    card.addEventListener('click', readCard);
    replayBtn.addEventListener('click', resetAnimation);

    // Keyboard support
    wrapper.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            advanceState();
        }
    });

    card.addEventListener('keydown', (e) => {
        if (state === 2 && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            readCard(e);
        }
    });
});
