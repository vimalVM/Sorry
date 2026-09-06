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
