document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded');
    
    const simulationItems = document.querySelectorAll('.simulation-item');
    console.log('Found items:', simulationItems.length);
    
    if (simulationItems.length === 0) {
        console.log('No simulation items found!');
        return;
    }
    
    simulationItems.forEach((item, index) => {
        console.log('Setting up item', index);
        
        const iframe = item.querySelector('iframe');
        const videoWrapper = item.querySelector('.video-wrapper');
        
        if (!iframe || !videoWrapper) {
            console.log('Missing iframe or wrapper for item', index);
            return;
        }
        
        // Add click event to expand video
        videoWrapper.addEventListener('click', function(e) {
            console.log('Video clicked!');
            e.stopPropagation();
            
            // Add expanded class
            item.classList.add('expanded');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
            
            // Update iframe src to enable API and autoplay
            const currentSrc = iframe.src;
            if (!currentSrc.includes('enablejsapi=1')) {
                const separator = currentSrc.includes('?') ? '&' : '?';
                iframe.src = currentSrc + separator + 'enablejsapi=1&autoplay=1';
            }
        });
        
        // Add click event to the expanded item itself for closing
        item.addEventListener('click', function(e) {
            console.log('Item clicked, expanded:', item.classList.contains('expanded'));
            
            // Only close if clicking on the item background (not iframe or info)
            if (item.classList.contains('expanded') && 
                e.target === item) {
                closeVideo(item, iframe);
            }
        });
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const expandedItem = document.querySelector('.simulation-item.expanded');
            if (expandedItem) {
                const iframe = expandedItem.querySelector('iframe');
                closeVideo(expandedItem, iframe);
            }
        }
    });
    
    // Close expanded video when clicking on overlay
    document.addEventListener('click', function(e) {
        const expandedItem = document.querySelector('.simulation-item.expanded');
        
        if (expandedItem) {
            // Check if click is outside the video content
            const videoWrapper = expandedItem.querySelector('.video-wrapper');
            const infoSection = expandedItem.querySelector('.info');
            
            if (!videoWrapper.contains(e.target) && !infoSection.contains(e.target)) {
                const iframe = expandedItem.querySelector('iframe');
                closeVideo(expandedItem, iframe);
            }
        }
    });
    
    // Function to close video and reset
    function closeVideo(item, iframe) {
        console.log('Closing video');
        
        item.classList.remove('expanded');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Stop the video by removing autoplay
        const src = iframe.src;
        iframe.src = src.replace('&autoplay=1', '').replace('?autoplay=1&', '?').replace('?autoplay=1', '');
    }
});