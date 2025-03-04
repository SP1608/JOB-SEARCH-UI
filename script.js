document.addEventListener("DOMContentLoaded", () => {
    const uploadButton = document.getElementById("uploadBtn");
    const fileInput = document.getElementById("resumeUpload");
    const fileNameDisplay = document.getElementById("fileNameDisplay");

    // Open file selector when upload button is clicked
    uploadButton.addEventListener("click", () => {
        fileInput.click(); ``
    });

    // Show selected file name on the UI
    fileInput.addEventListener("change", (event) => {
        if (event.target.files.length > 0) {
            fileNameDisplay.textContent = `Uploaded: ${event.target.files[0].name}`;
            fileNameDisplay.style.color = "yellow"; // Highlight text
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Register Event Listener
    document.getElementById("register-form")?.addEventListener("submit", function (event) {
        event.preventDefault();
        registerUser();
    });

    // Login Event Listener
    document.getElementById("login-email")?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") login();
    });
    document.getElementById("login-password")?.addEventListener("keypress", function (event) {
        if (event.key === "Enter") login();
    });
});

function registerUser() {
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const message = document.getElementById("register-message");

    if (!validateEmail(email)) {
        message.innerText = "Invalid email! Use Gmail or Yahoo.";
        message.style.color = "red";
        return;
    }

    if (!validatePassword(password)) {
        message.innerText = "Password must be 10+ chars, include upper/lowercase, number, and special character.";
        message.style.color = "red";
        return;
    }

    if (password !== confirmPassword) {
        message.innerText = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    if (localStorage.getItem(email)) {
        message.innerText = "User already exists! Try logging in.";
        message.style.color = "red";
        return;
    }

    localStorage.setItem(email, JSON.stringify({ password }));
    message.innerText = "Registration successful! Redirecting...";
    message.style.color = "green";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

function login() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    const message = document.getElementById("login-message");

    const user = JSON.parse(localStorage.getItem(email));

    if (!user) {
        message.innerText = "User not registered! Please register first.";
        message.style.color = "red";
        return;
    }

    if (user.password !== password) {
        message.innerText = "Invalid email or password!";
        message.style.color = "red";
        return;
    }

    message.innerText = "Login successful! Redirecting...";
    message.style.color = "green";
    setTimeout(() => {
        window.location.href = "index.html";
    }, 1500);
}

function validateEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/.test(email);
}

function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/.test(password);
}

// Test Function to Validate User Storage
function testAuthentication() {
    localStorage.clear();
    registerUserTest("testuser@gmail.com", "Test@12345", "Test@12345");
    registerUserTest("testuser@yahoo.com", "Yahoo@12345", "Yahoo@12345");
    loginTest("testuser@gmail.com", "Test@12345");
    loginTest("testuser@yahoo.com", "WrongPass");
    loginTest("unregistered@gmail.com", "Test@12345");
}

function registerUserTest(email, password, confirmPassword) {
    localStorage.setItem(email, JSON.stringify({ password }));
    console.log(`Registered: ${email}`);
}

function loginTest(email, password) {
    const user = JSON.parse(localStorage.getItem(email));
    if (!user) {
        console.log(`Login failed: ${email} not registered.`);
    } else if (user.password === password) {
        console.log(`Login success: ${email}`);
    } else {
        console.log(`Login failed: Incorrect password for ${email}.`);
    }
}

testAuthentication();
