

document.addEventListener('DOMContentLoaded', function() {
    
    const form = document.querySelector('form');
    const firstName = document.getElementById('first-name');
    const lastName = document.getElementById('last-name');
    const address1 = document.getElementById('address1');
    const city = document.getElementById('city');
    const state = document.getElementById('state');
    const zipCode = document.getElementById('zip');
    const country = document.getElementById('country');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    
    const amountRadios = document.querySelectorAll('input[name="amount"]');
    const otherAmountRadio = document.querySelector('input[name="amount"][value="other"]');
    const otherAmountInput = document.querySelector('input[name="amount-other"]');
    
    const recurringCheckbox = document.querySelector('input[name="recurring"]');
    const monthlyAmountInput = document.querySelector('input[name="monthly-amount"]');
    const monthlyMonthsInput = document.querySelector('input[name="monthly-months"]');
    
    const honorRadios = document.querySelectorAll('input[name="honor-type"]');
    const ackTitle = document.querySelector('select[name="acknowledge-title"]');
    const ackName = document.getElementById('ack-name');
    const ackAddress = document.getElementById('ack-address');
    const ackCity = document.getElementById('ack-city');
    const ackState = document.getElementById('ack-state');
    const ackZip = document.getElementById('ack-zip');
    
    const comments = document.getElementById('comments');
    const resetBtn = document.querySelector('button[type="reset"]');
    
    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
    

    function isValidPhone(phone) {
        if (!phone) return true;
        const phonePattern = /^[\d\s\-\+\(\)]+$/;
        return phonePattern.test(phone) && phone.replace(/\D/g, '').length >= 10;
    }
    
    function isValidZip(zip) {
        const zipPattern = /^\d{4,6}$/;
        return zipPattern.test(zip);
    }
    
    amountRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (otherAmountRadio.checked) {
                otherAmountInput.disabled = false;
                otherAmountInput.required = true;
                otherAmountInput.style.backgroundColor = '#fffbcc';
                otherAmountInput.focus();
            } else {
                otherAmountInput.disabled = true;
                otherAmountInput.required = false;
                otherAmountInput.style.backgroundColor = '';
                otherAmountInput.value = '';
            }
        });
    });
    otherAmountInput.disabled = true;
    
    recurringCheckbox.addEventListener('change', function() {
        if (this.checked) {
            monthlyAmountInput.disabled = false;
            monthlyMonthsInput.disabled = false;
            monthlyAmountInput.style.backgroundColor = '#fffbcc';
            monthlyMonthsInput.style.backgroundColor = '#fffbcc';
            monthlyAmountInput.required = true;
            monthlyMonthsInput.required = true;
        } else {
            monthlyAmountInput.disabled = true;
            monthlyMonthsInput.disabled = true;
            monthlyAmountInput.style.backgroundColor = '';
            monthlyMonthsInput.style.backgroundColor = '';
            monthlyAmountInput.required = false;
            monthlyMonthsInput.required = false;
            monthlyAmountInput.value = '';
            monthlyMonthsInput.value = '';
            const totalDisplay = document.getElementById('recurringTotal');
            if (totalDisplay) totalDisplay.remove();
        }
    });
    monthlyAmountInput.disabled = true;
    monthlyMonthsInput.disabled = true;
    
    function calculateRecurringTotal() {
        if (recurringCheckbox.checked) {
            const monthly = parseFloat(monthlyAmountInput.value) || 0;
            const months = parseInt(monthlyMonthsInput.value) || 0;
            const total = monthly * months;
            
            if (monthly > 0 && months > 0) {
                let totalDisplay = document.getElementById('recurringTotal');
                if (!totalDisplay) {
                    totalDisplay = document.createElement('p');
                    totalDisplay.id = 'recurringTotal';
                    totalDisplay.style.color = '#008000';
                    totalDisplay.style.fontWeight = 'bold';
                    totalDisplay.style.marginTop = '10px';
                    totalDisplay.style.fontSize = '14px';
                    recurringCheckbox.closest('.inline-group').appendChild(totalDisplay);
                }
                totalDisplay.textContent = `💰 Total Recurring Donation: $${total.toFixed(2)}`;
            }
        }
    }
    monthlyAmountInput.addEventListener('input', calculateRecurringTotal);
    monthlyMonthsInput.addEventListener('input', calculateRecurringTotal);
    
    honorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                [ackTitle, ackName, ackAddress, ackCity, ackState, ackZip].forEach(field => {
                    field.disabled = false;
                    field.style.backgroundColor = '#fffbcc';
                });
            }
        });
    });
    [ackTitle, ackName, ackAddress, ackCity, ackState, ackZip].forEach(f => f.disabled = true);
    
    const maxCommentChars = 500;
    const charCounter = document.createElement('div');
    charCounter.style.fontSize = '12px';
    charCounter.style.color = '#666';
    charCounter.style.marginTop = '5px';
    charCounter.textContent = `0 / ${maxCommentChars} characters`;
    comments.parentElement.insertBefore(charCounter, comments.nextSibling);
    
    comments.addEventListener('input', function() {
        const currentLength = this.value.length;
        charCounter.textContent = `${currentLength} / ${maxCommentChars} characters`;
        
        if (currentLength > maxCommentChars) {
            this.value = this.value.substring(0, maxCommentChars);
            charCounter.style.color = 'red';
            charCounter.textContent = `${maxCommentChars} / ${maxCommentChars} characters (LIMIT REACHED!)`;
        } else if (currentLength > maxCommentChars * 0.9) {
            charCounter.style.color = 'orange';
        } else {
            charCounter.style.color = '#666';
        }
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        let isValid = true;
        let errors = [];
        
        function markError(field, message) {
            field.style.borderColor = 'red';
            field.style.backgroundColor = '#ffe6e6';
            errors.push(message);
            isValid = false;
        }
        
        function clearError(field) {
            field.style.borderColor = '';
            field.style.backgroundColor = '';
        }
        
        [firstName, lastName, address1, city, state, zipCode, country, email, phone].forEach(clearError);
        
        if (!firstName.value.trim()) markError(firstName, '❌ First Name is required!');
        if (!lastName.value.trim()) markError(lastName, '❌ Last Name is required!');
        if (!address1.value.trim()) markError(address1, '❌ Address 1 is required!');
        if (!city.value.trim()) markError(city, '❌ City is required!');
        if (!state.value) markError(state, '❌ Please select a State!');
        
        if (!zipCode.value.trim()) {
            markError(zipCode, '❌ Zip Code is required!');
        } else if (!isValidZip(zipCode.value.trim())) {
            markError(zipCode, '❌ Please enter a valid Zip Code (4-6 digits)!');
        }
        
        if (!country.value) markError(country, '❌ Please select a Country!');
        
        if (!email.value.trim()) {
            markError(email, '❌ Email is required!');
        } else if (!isValidEmail(email.value.trim())) {
            markError(email, '❌ Please enter a valid email address!');
        }
        
        if (phone.value.trim() && !isValidPhone(phone.value.trim())) {
            markError(phone, '⚠️ Please enter a valid phone number!');
        }
        
        let donationSelected = false;
        amountRadios.forEach(radio => {
            if (radio.checked) donationSelected = true;
        });
        
        if (!donationSelected) {
            errors.push('❌ Please select a donation amount!');
            isValid = false;
        }
        
        if (otherAmountRadio.checked) {
            if (!otherAmountInput.value.trim() || parseFloat(otherAmountInput.value) <= 0) {
                markError(otherAmountInput, '❌ Please enter a valid amount for "Other"!');
            }
        }
        
        if (recurringCheckbox.checked) {
            if (!monthlyAmountInput.value.trim() || parseFloat(monthlyAmountInput.value) <= 0) {
                markError(monthlyAmountInput, '❌ Please enter a valid monthly amount!');
            }
            if (!monthlyMonthsInput.value.trim() || parseInt(monthlyMonthsInput.value) <= 0) {
                markError(monthlyMonthsInput, '❌ Please enter number of months!');
            }
        }
        
        if (!isValid) {
            alert('⚠️ Please fix the following errors:\n\n' + errors.join('\n'));
            const firstError = document.querySelector('input[style*="border-color: red"]');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
            alert('🎉 Thank you for your donation! Form submitted successfully! 💙');
        }
    });
    
    resetBtn.addEventListener('click', function(event) {
        event.preventDefault();
        
        if (confirm('⚠️ Are you sure you want to reset? All information will be lost!')) {
            form.reset();
            
            otherAmountInput.disabled = true;
            otherAmountInput.style.backgroundColor = '';
            monthlyAmountInput.disabled = true;
            monthlyMonthsInput.disabled = true;
            monthlyAmountInput.style.backgroundColor = '';
            monthlyMonthsInput.style.backgroundColor = '';
            
            [ackTitle, ackName, ackAddress, ackCity, ackState, ackZip].forEach(field => {
                field.disabled = true;
                field.style.backgroundColor = '';
            });
            
            const totalDisplay = document.getElementById('recurringTotal');
            if (totalDisplay) totalDisplay.remove();
            
            charCounter.textContent = `0 / ${maxCommentChars} characters`;
            charCounter.style.color = '#666';
            
            document.querySelectorAll('input, select, textarea').forEach(field => {
                field.style.borderColor = '';
                field.style.backgroundColor = '';
            });
            
            alert('✅ Form reset successfully!');
        }
    });
    
    email.addEventListener('blur', function() {
        if (this.value.trim() && !isValidEmail(this.value.trim())) {
            this.style.borderColor = 'orange';
            this.style.backgroundColor = '#fff3cd';
        } else {
            this.style.borderColor = '';
            this.style.backgroundColor = '';
        }
    });
    
    console.log('✅ Donation Form JavaScript loaded! 🚀');
});
