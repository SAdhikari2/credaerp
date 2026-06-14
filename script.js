document.addEventListener('DOMContentLoaded', () => {
    // New Pricing Data Configuration (Lowered for Indian Market & Anchored)
    const pricingData = {
        starter: {
            quarterly: { price: 999, usd: 15, monthlyEquiv: 333, usdMonthlyEquiv: 5 },
            yearly: { price: 2999, usd: 39, monthlyEquiv: 250, usdMonthlyEquiv: 3.25 }
        },
        growth: {
            quarterly: { price: 2499, usd: 39, monthlyEquiv: 833, usdMonthlyEquiv: 13 },
            yearly: { price: 7999, usd: 99, monthlyEquiv: 666, usdMonthlyEquiv: 8.25 }
        },
        premium: {
            quarterly: { price: 2999, usd: 45, monthlyEquiv: 1000, usdMonthlyEquiv: 15 },
            yearly: { price: 8999, usd: 119, monthlyEquiv: 750, usdMonthlyEquiv: 9.90 }
        }
    };

    // State
    let currentPeriod = 'quarterly'; // 'quarterly' or 'yearly'
    let currentCurrency = 'inr'; // 'inr' or 'usd'

    // DOM Elements
    const billingToggle = document.getElementById('billing-toggle');
    const currencyToggle = document.getElementById('currency-toggle');
    
    // Pricing Cards elements
    const plans = ['starter', 'growth', 'premium'];
    const planElements = {};
    
    plans.forEach(plan => {
        planElements[plan] = {
            currency: document.getElementById(`${plan}-currency`),
            amount: document.getElementById(`${plan}-amount`),
            period: document.getElementById(`${plan}-period`),
            original: document.getElementById(`${plan}-original`),
            trialInfo: document.getElementById(`${plan}-trial-info`)
        };
    });

    // Toggle Handlers
    if (billingToggle) {
        const buttons = billingToggle.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentPeriod = btn.dataset.period;
                if (currentPeriod === 'yearly') {
                    billingToggle.classList.add('annually'); // Keeps class for styling
                } else {
                    billingToggle.classList.remove('annually');
                }
                updatePricing();
            });
        });
    }

    if (currencyToggle) {
        const buttons = currencyToggle.querySelectorAll('.toggle-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                currentCurrency = btn.dataset.currency;
                if (currentCurrency === 'usd') {
                    currencyToggle.classList.add('usd');
                } else {
                    currencyToggle.classList.remove('usd');
                }
                updatePricing();
            });
        });
    }

    // Update Pricing Display
    function updatePricing() {
        const symbol = currentCurrency === 'inr' ? '₹' : '$';
        
        plans.forEach(plan => {
            const data = pricingData[plan];
            const elems = planElements[plan];
            
            if (!elems.amount) return;

            let priceVal = 0;
            let monthlyEquiv = 0;
            
            if (currentCurrency === 'inr') {
                priceVal = data[currentPeriod].price;
                monthlyEquiv = data[currentPeriod].monthlyEquiv;
            } else {
                priceVal = data[currentPeriod].usd;
                monthlyEquiv = data[currentPeriod].usdMonthlyEquiv;
            }

            // Period Description Display
            if (currentPeriod === 'quarterly') {
                elems.period.innerHTML = `/ quarter <br><span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary)">Equivalent to: ${symbol}${monthlyEquiv}/mo</span>`;
                if (elems.trialInfo) {
                    elems.trialInfo.innerHTML = '✨ 3 months free trial, then billed quarterly';
                }
            } else {
                elems.period.innerHTML = `/ year <br><span style="font-size:0.8rem; font-weight:600; color:var(--text-secondary)">Equivalent to: ${symbol}${monthlyEquiv}/mo</span>`;
                if (elems.trialInfo) {
                    elems.trialInfo.innerHTML = '✨ 3 months free trial, then billed yearly';
                }
            }
            
            // Animate number change
            animateNumber(elems.amount, priceVal);
            elems.currency.textContent = symbol;
        });
    }

    // Smooth number animation
    function animateNumber(element, targetValue) {
        const duration = 300; // ms
        const startValue = parseFloat(element.textContent.replace(/,/g, '')) || 0;
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Ease out quad
            const easeProgress = progress * (2 - progress);
            const currentValue = startValue + (targetValue - startValue) * easeProgress;
            
            // Check if it has decimals (e.g. 3.25 for USD Starter)
            if (targetValue % 1 === 0) {
                element.textContent = Math.round(currentValue).toLocaleString();
            } else {
                element.textContent = currentValue.toFixed(2);
            }
            
            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }
        
        requestAnimationFrame(update);
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
            const planName = btn.dataset.plan || 'Starter';
            if (modalTitle) {
                modalTitle.textContent = `Get Started with ${planName} Plan`;
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
            
            submitBtn.textContent = 'Registering Trial...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                // Success feedback
                const modalContent = modal.querySelector('.modal-content');
                const originalContent = modalContent.innerHTML;
                
                modalContent.innerHTML = `
                    <button class="modal-close" style="position: absolute; top: 1.25rem; right: 1.25rem; background: transparent; border: none; cursor: pointer; color: var(--text-muted); font-size: 1.5rem;">&times;</button>
                    <div style="text-align: center; padding: 2rem 0;">
                        <div style="font-size: 4rem; color: var(--color-success); margin-bottom: 1rem;">✓</div>
                        <h3 style="font-size: 1.75rem; font-weight: 700; margin-bottom: 1rem; color: #fff;">Registration Successful!</h3>
                        <p style="color: var(--text-secondary); margin-bottom: 2rem;">Your 3-Month Free Trial is active. We have sent the installation instructions and trial activation key to your email.</p>
                        <button class="form-submit-btn close-success-btn" style="max-width: 200px; margin: 0 auto;">Close</button>
                    </div>
                `;
                
                // Close button handler for success view
                const newCloseBtn = modalContent.querySelector('.modal-close');
                const successCloseBtn = modalContent.querySelector('.close-success-btn');
                
                const closeHandler = () => {
                    modal.classList.remove('active');
                    // Reset modal back to original form state after animation
                    setTimeout(() => {
                        modalContent.innerHTML = originalContent;
                        window.location.reload();
                    }, 300);
                };
                
                newCloseBtn.addEventListener('click', closeHandler);
                successCloseBtn.addEventListener('click', closeHandler);
                
            }, 1500);
        });
    }

    // Initial pricing load
    updatePricing();
});
