const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('hidden')) {
                entry.target.classList.add('show');
            }
            
            if (entry.target.classList.contains('hidden-from-right')) {
                // Clear any existing timeout if the element was already being processed
                if (entry.target.dataset.timeoutId) {
                    clearTimeout(entry.target.dataset.timeoutId);
                }
                // Set a timeout to add 'show-from-right' after 500ms
                const timeoutId = setTimeout(() => {
                    entry.target.classList.add('show-from-right');
                }, 400);
                // Store the timeout ID in the dataset for future reference
                entry.target.dataset.timeoutId = timeoutId;
            }
        } else {
            if (entry.target.classList.contains('hidden')) {
                entry.target.classList.remove('show');
            }
            
            if (entry.target.classList.contains('hidden-from-right')) {
                // Clear any existing timeout if the element is no longer intersecting
                if (entry.target.dataset.timeoutId) {
                    clearTimeout(entry.target.dataset.timeoutId);
                    delete entry.target.dataset.timeoutId;
                }
                // Remove the 'show-from-right' class immediately
                entry.target.classList.remove('show-from-right');
            }
        }
    });
});

// Select elements with either 'hidden' or 'hidden-from-right' class
const hiddenElements = document.querySelectorAll('.hidden, .hidden-from-right');
hiddenElements.forEach((el) => observer.observe(el));
