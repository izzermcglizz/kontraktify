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
            setTimeout(async () => {
                // Check if user is logged in for create.html
                if (targetUrl === 'create.html' || targetUrl.includes('create.html')) {
                    const user = await window.authSystem?.getCurrentUser();
                    if (!user) {
                        // Redirect to login first
                        window.location.href = 'login.html?redirect=create.html';
                        return;
                    }
                }
                window.location.href = targetUrl;
            }, 300);
        }
    }
    
    // Start animation
    requestAnimationFrame(animateProgress);
})();

