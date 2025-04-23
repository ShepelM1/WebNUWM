document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const copyBtn = document.getElementById('copy-btn');
    const generateBtn = document.getElementById('generate-btn');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const uppercaseCheckbox = document.getElementById('uppercase');
    const lowercaseCheckbox = document.getElementById('lowercase');
    const numbersCheckbox = document.getElementById('numbers');
    const symbolsCheckbox = document.getElementById('symbols');

    // Update length value display
    lengthSlider.addEventListener('input', function() {
        lengthValue.textContent = this.value;
    });

    // Generate password button
    generateBtn.addEventListener('click', function() {
        const length = lengthSlider.value;
        const includeUppercase = uppercaseCheckbox.checked;
        const includeLowercase = lowercaseCheckbox.checked;
        const includeNumbers = numbersCheckbox.checked;
        const includeSymbols = symbolsCheckbox.checked;
        
        passwordField.value = generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols);
    });

    // Copy password button
    copyBtn.addEventListener('click', function() {
        if (passwordField.value) {
            passwordField.select();
            document.execCommand('copy');
            copyBtn.textContent = 'Скопійовано!';
            setTimeout(() => {
                copyBtn.textContent = 'КОПІЯ';
            }, 2000);
        }
    });

    // Generate initial password
    generateBtn.click();
});

function generatePassword(length, includeUppercase, includeLowercase, includeNumbers, includeSymbols) {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '@$#%^';
    
    let allowedChars = '';
    let password = '';
    
    if (includeUppercase) allowedChars += uppercaseChars;
    if (includeLowercase) allowedChars += lowercaseChars;
    if (includeNumbers) allowedChars += numberChars;
    if (includeSymbols) allowedChars += symbolChars;
    
    // If no character types are selected, use all
    if (allowedChars.length === 0) {
        allowedChars = uppercaseChars + lowercaseChars + numberChars;
    }
    
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * allowedChars.length);
        password += allowedChars[randomIndex];
    }
    
    return password;
}