document.addEventListener('DOMContentLoaded', function() {
    
    const bookTitleInput = document.getElementById('bookTitle');
    const publicationYearInput = document.getElementById('publicationYear');
    const addBookBtn = document.getElementById('addBookBtn');
    const bookTableBody = document.getElementById('bookTableBody');
    const errorMessage = document.getElementById('errorMessage');
    
    const currentYear = new Date().getFullYear();
    
    function isValidTitle(title) {
        const titlePattern = /^[a-zA-Z]+$/;
        return titlePattern.test(title);
    }
    
    function isValidYear(year) {
        const yearPattern = /^\d{4}$/;
        if (!yearPattern.test(year)) {
            return false;
        }
        
        const yearNum = parseInt(year);
        return yearNum >= 1900 && yearNum <= currentYear;
    }
    
    function showError(message) {
        errorMessage.textContent = '❌ ' + message;
        errorMessage.classList.add('show');
        
        setTimeout(() => {
            errorMessage.classList.remove('show');
        }, 5000);
    }
    
    function addBookToTable(title, year) {

        const newRow = document.createElement('tr');
        
        const yearNum = parseInt(year);
        if (yearNum < 2000) {
            newRow.classList.add('old-book');
        } else {
            newRow.classList.add('new-book');
        }
        
        const titleCell = document.createElement('td');
        titleCell.textContent = title;
        
        const yearCell = document.createElement('td');
        yearCell.textContent = year;
        
        newRow.appendChild(titleCell);
        newRow.appendChild(yearCell);
        
        bookTableBody.appendChild(newRow);
        
        newRow.style.animation = 'slideIn 0.3s ease-out';
    }
    
    function clearInputs() {
        bookTitleInput.value = '';
        publicationYearInput.value = '';
        bookTitleInput.classList.remove('error');
        publicationYearInput.classList.remove('error');
    }
    
    addBookBtn.addEventListener('click', function() {
        const title = bookTitleInput.value.trim();
        const year = publicationYearInput.value.trim();
        
        bookTitleInput.classList.remove('error');
        publicationYearInput.classList.remove('error');
        errorMessage.classList.remove('show');
        
        if (!title) {
            showError('Book title cannot be empty!');
            bookTitleInput.classList.add('error');
            bookTitleInput.focus();
            return;
        }
        
        if (!isValidTitle(title)) {
            showError('Book title must contain only alphabetic characters (no numbers, spaces, or special characters)!');
            bookTitleInput.classList.add('error');
            bookTitleInput.focus();
            return;
        }
        
        if (!year) {
            showError('Publication year cannot be empty!');
            publicationYearInput.classList.add('error');
            publicationYearInput.focus();
            return;
        }
        
        if (!isValidYear(year)) {
            showError(`Publication year must be a 4-digit number between 1900 and ${currentYear}!`);
            publicationYearInput.classList.add('error');
            publicationYearInput.focus();
            return;
        }
        
        addBookToTable(title, year);
        clearInputs();
        
        console.log(`✅ Book "${title}" (${year}) added successfully!`);
    });

    publicationYearInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addBookBtn.click();
        }
    });
    
    bookTitleInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addBookBtn.click();
        }
    });
    
    console.log('📚 Library Management System loaded successfully!');
    console.log(`Current year: ${currentYear}`);
    
});
