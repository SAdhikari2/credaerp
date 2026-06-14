document.addEventListener('DOMContentLoaded', () => {
    // Screenshot Mapping
    const screenshots = [
        { file: 'dashboard-analytics.png', alt: 'CredaERP Dashboard Charts & Analytics' },
        { file: 'dashboard-overview.png', alt: 'CredaERP Dashboard Overview Cards' },
        { file: 'inventory.png', alt: 'CredaERP Smart Inventory Management' },
        { file: 'billing-items.png', alt: 'CredaERP POS Terminal Billing Grid' },
        { file: 'billing-checkout.png', alt: 'CredaERP POS Terminal Checkout & Payment' },
        { file: 'reports.png', alt: 'CredaERP Business Reports & GST Compliance' }
    ];

    // DOM Elements for Screenshots tab switcher
    const tabButtons = document.querySelectorAll('#screenshot-tabs .tab-btn');
    const screenshotImg = document.getElementById('screenshot-img');
    const screenshotFallback = document.getElementById('screenshot-fallback');
    const fallbackFilename = document.getElementById('fallback-filename');

    if (tabButtons && screenshotImg) {
        tabButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Deactivate all tabs
                tabButtons.forEach(b => b.classList.remove('active'));
                
                // Activate clicked tab
                btn.classList.add('active');
                
                const index = parseInt(btn.dataset.screenshot) || 0;
                const screenshot = screenshots[index];
                
                // Fade out current screenshot
                screenshotImg.style.opacity = '0';
                screenshotFallback.classList.remove('hidden'); // Show loading spinner
                
                if (fallbackFilename) {
                    fallbackFilename.textContent = screenshot.file;
                }
                
                // Preload new image
                const tempImg = new Image();
                tempImg.src = 'images/' + screenshot.file;
                
                tempImg.onload = () => {
                    screenshotImg.src = 'images/' + screenshot.file;
                    screenshotImg.alt = screenshot.alt;
                    screenshotImg.style.opacity = '1';
                    screenshotFallback.classList.add('hidden'); // Hide spinner on success
                };
                
                tempImg.onerror = () => {
                    // Image doesn't exist yet, show fallback state
                    screenshotImg.style.opacity = '0';
                    screenshotFallback.classList.remove('hidden'); // Keep spinner/message visible
                };
            });
        });

        // Initialize first screenshot load
        const initialIndex = 0;
        const initialScreenshot = screenshots[initialIndex];
        
        // Handle onload/onerror for initial load
        screenshotImg.onload = () => {
            screenshotImg.style.opacity = '1';
            screenshotFallback.classList.add('hidden');
        };
        
        screenshotImg.onerror = () => {
            screenshotImg.style.opacity = '0';
            screenshotFallback.classList.remove('hidden');
            if (fallbackFilename) {
                fallbackFilename.textContent = initialScreenshot.file;
            }
        };

        // Trigger load
        screenshotImg.src = 'images/' + initialScreenshot.file;
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.maxHeight = null;
            });
            
            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Modal Interaction
    const modal = document.getElementById('demo-modal');
    const modalTitle = document.getElementById('modal-plan-title');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');
    const closeModalBtn = document.querySelector('.modal-close');
    const demoForm = document.getElementById('demo-form');

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const planName = btn.dataset.plan || 'Early Adopter Trial';
            if (modalTitle) {
                modalTitle.textContent = `Request Free Demo Key (${planName})`;
            }
            if (modal) {
                modal.classList.add('active');
            }
        });
    });

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modal) modal.classList.remove('active');
        });
    }

    // Close modal on clicking overlay
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    }

    // Form submission simulation
    if (demoForm) {
        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = demoForm.querySelector('.form-submit-btn');
            
            submitBtn.textContent = 'Registering Demo Request...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                const modalContent = modal.querySelector('.modal-content');
                modalContent.innerHTML = `
                    <button class="modal-close" style="position: absolute; top: 1.25rem; right: 1.25rem; background: transparent; border: none; cursor: pointer; color: var(--text-muted); font-size: 1.5rem;">&times;</button>
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 4rem; color: var(--color-success); margin-bottom: 1rem;">✓</div>
                        <h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #fff;">Request Received!</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Thank you! We will reach out to you on WhatsApp within 2 hours with your trial license key and installation instructions.</p>
                        <button class="form-submit-btn close-success-btn" style="max-width: 200px; margin: 0 auto;">Close</button>
                    </div>
                `;
                
                const successCloseHandler = () => {
                    modal.classList.remove('active');
                    setTimeout(() => {
                        window.location.reload();
                    }, 300);
                };
                
                modalContent.querySelector('.modal-close').addEventListener('click', successCloseHandler);
                modalContent.querySelector('.close-success-btn').addEventListener('click', successCloseHandler);
                
            }, 1500);
        });
    }
});
