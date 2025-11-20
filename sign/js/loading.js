// Loading Screen Progress Animation

(function() {
    const progressFill = document.getElementById('progressFill');
    const targetUrl = new URLSearchParams(window.location.search).get('redirect') || 'create.html';
    
    let progress = 0;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    
    function animateProgress() {
        const elapsed = Date.now() - startTime;
        progress = Math.min((elapsed / duration) * 100, 100);
        
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
        
        if (progress < 100) {
            requestAnimationFrame(animateProgress);
        } else {
            // Add slight delay before redirect
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 300);
        }
    }
    
    // Start animation
    requestAnimationFrame(animateProgress);
})();

