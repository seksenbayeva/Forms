document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Получение данных формы
    var userphoto = document.querySelector('#userphoto').files[0];
    var username = document.querySelector('#username').value;
    var company = document.querySelector('#company').value;
    var selectedPosition = document.querySelector('input[name="position"]:checked');
    var position = selectedPosition ? selectedPosition.value : null;
    var github = document.querySelector('#github').value;
    var linkedin = document.querySelector('#linkedin').value;
    var instagram = document.querySelector('#instagram').value;
    var telegram = document.querySelector('#telegram').value;

    const companyLogos = {
        'meta': 'fab fa-facebook',
        'apple': 'fab fa-apple',
        'amazon': 'fab fa-amazon',
        'netflix': 'fab fa-netflix',
        'google': 'fab fa-google',
        'microsoft': 'fab fa-microsoft',
    };
    
    function displayError(inputElement, errorMessage) {
        // Удаление существующих сообщений об ошибке
        var errorElement = inputElement.parentElement ? inputElement.parentElement.querySelector('.error-message') : null;
        if (errorElement) {
            errorElement.remove();
        }

        var errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerText = errorMessage;
        if (inputElement.parentElement) {
            inputElement.parentElement.appendChild(errorDiv);
        }
    }

    // Функция для очистки сообщений об ошибке
    function clearErrors() {
        var errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function (error) {
            error.remove();
        });
    }

    // Валидация каждого поля
    clearErrors(); // Очистка предыдущих сообщений об ошибках

    if (!userphoto) {
        displayError(document.querySelector('#userphoto'), 'Please upload a photo.');
        return;
    }

    if (!username) {
        displayError(document.querySelector('#username'), 'Please enter your name.');
        return;
    }

    if (!company) {
        displayError(document.querySelector('#company'), 'Please select a company.');
        return;
    }

    if (!position) {
        displayError(document.querySelector('.custom-dropdown'), 'Please select a position.');
        return;
    }

    const companyLogoClass = companyLogos[company] || 'fa-brands fa-default';

    // Map positions to corresponding emojis
    const positionEmojis = {
        'intern': '👶',
        'junior': '🧑‍💻',
        'engineer': '👨‍💻',
        'senior': '👴',
    };

    // Get the emoji for the current position
    const positionEmoji = positionEmojis[position] || '';

    // Function to generate link HTML with Font Awesome icon
    function generateFontAwesomeLinkHtml(link, iconClass, altText) {
        const iconHtml = link ? `<a href="${link}" target="_blank"><i class="${iconClass}"></i></a>` : '';
        return iconHtml;
    }

    // Отображение данных пользователя
    var displayContainer = document.querySelector('.display-container');
    displayContainer.innerHTML = `
        <img src="${URL.createObjectURL(userphoto)}" alt="User photo">
        <p>${username}</p>
        <p><i class="${companyLogoClass}"></i> ${company}</p>
        <p>Position: ${positionEmoji} ${position}</p>
        <div class="social-links">
            ${generateFontAwesomeLinkHtml(github, 'fab fa-github', 'GitHub')}
            ${generateFontAwesomeLinkHtml(linkedin, 'fab fa-linkedin', 'LinkedIn')}
            ${generateFontAwesomeLinkHtml(instagram, 'fab fa-instagram', 'Instagram')}
            ${generateFontAwesomeLinkHtml(telegram, 'fab fa-telegram', 'Telegram')}
        </div>
    `;
    displayContainer.classList.add('animation');
});







