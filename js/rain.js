// rain.js - Full Screen Code Rain Background Effect
(function() {
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full screen
    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '0';
        canvas.style.pointerEvents = 'none'; // Allow clicking through to content
    }
    
    setCanvasSize();
    
    // Code rain characters - matrix style
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン<>/{}[]()*.-+=';
    const charsArray = chars.split('');
    
    // Column settings
    const fontSize = 18;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Drops array - each column has a Y position
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
    }
    
    // Rainbow colors for variation
    const colors = [
        '#00BFFF', // primary blue
        '#33ccff', // lighter blue
        '#0099cc', // darker blue
        '#66ccff', // light blue
        '#0066cc'  // deep blue
    ];
    
    // Draw the rain
    function drawRain() {
        // Clear with transparent to create trail effect
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set font
        ctx.font = `${fontSize}px 'Fira Code', monospace`;
        ctx.textAlign = 'center';
        
        // Draw characters
        for (let i = 0; i < drops.length; i++) {
            // Random character
            const char = charsArray[Math.floor(Math.random() * charsArray.length)];
            
            // Random color from blue palette
            const colorIndex = Math.floor(Math.random() * colors.length);
            ctx.fillStyle = colors[colorIndex];
            
            // Vary opacity for depth
            ctx.globalAlpha = Math.random() * 0.7 + 0.3;
            
            // Add glow effect
            ctx.shadowColor = '#00BFFF';
            ctx.shadowBlur = 8;
            ctx.shadowOffsetX = 0;
            ctx.shadowOffsetY = 0;
            
            // Draw the character
            const x = i * fontSize + fontSize/2;
            const y = drops[i] * fontSize;
            
            ctx.fillText(char, x, y);
            
            // Reset drop if it goes off screen (with randomness for continuous flow)
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Move drop down with variable speed
            drops[i] += Math.random() * 0.8 + 0.4;
        }
        
        // Reset shadow
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
        
        requestAnimationFrame(drawRain);
    }
    
    // Start animation
    drawRain();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        setCanvasSize();
        const newColumns = Math.floor(canvas.width / fontSize);
        
        // Adjust drops array for new width
        if (newColumns > drops.length) {
            // Add new columns
            for (let i = drops.length; i < newColumns; i++) {
                drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
            }
        } else if (newColumns < drops.length) {
            // Remove excess columns
            drops.length = newColumns;
        }
    });
})();