document.addEventListener('DOMContentLoaded', function() {

    const firebaseConfig = {
        apiKey: "AIzaSyB5e10tMSvgPZ4fsNeNsnf6fkpmCJNo5Qg",
        authDomain: "evpoint-a86f2.firebaseapp.com",
        databaseURL: "https://evpoint-a86f2-default-rtdb.firebaseio.com",
        projectId: "evpoint-a86f2",
        storageBucket: "evpoint-a86f2.appspot.com",
        messagingSenderId: "1016890687077",
        appId: "1:1016890687077:web:9cda77a50ce0c29068908c",
        measurementId: "G-BRF0GMB7VC"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    const auth = firebase.auth();
    const database = firebase.database();

    const userloginSubmit = document.getElementById('login_submit');
    const usersignupSubmit = document.getElementById('signup_submit');

    // Utility function to validate email format
    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    // Utility function to validate phone number format
    function validatePhoneNumber(phone) {
        const re = /^\d{10}$/; // Assumes phone number format with 10 digits
        return re.test(String(phone));
    }

    // Utility function to validate password
    function validatePassword(password) {
        return password.length >= 6; // Minimum password length of 6 characters
    }

    userloginSubmit.addEventListener('click', event => {
        event.preventDefault();
        const email = document.getElementById('login_email').value;
        const password = document.getElementById('login_password').value;

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!validatePassword(password)) {
            alert('Please enter a valid password (minimum 6 characters)');
            return;
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Signed in
                const user = userCredential.user;
                alert('Login successful!');
                window.location.href = 'index.html';
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    });

    usersignupSubmit.addEventListener('click', event => {
        event.preventDefault();
        const name = document.getElementById('user_name').value;
        const email = document.getElementById('signup_email').value;
        const phone = document.getElementById('signup_phone').value;
        const password = document.getElementById('signup_password').value;
        const con_password = document.getElementById('signup_con_password').value;

        if (name.trim() === '') {
            alert('Name is required');
            return;
        }

        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!validatePhoneNumber(phone)) {
            alert('Please enter a valid phone number (10 digits)');
            return;
        }

        if (!validatePassword(password)) {
            alert('Password must be at least 6 characters long');
            return;
        }

        if (password !== con_password) {
            alert('Passwords do not match');
            return;
        }

        auth.createUserWithEmailAndPassword(email, password)
            .then(userCredential => {
                // Signed up
                const user = userCredential.user;
                return database.ref('users/' + user.uid).set({
                    name: name,
                    email: email,
                    phone: phone
                });
            })
            .then(() => {
                alert('Signup successful!');
                window.location.href = 'index.html';
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert('Error: ' + errorMessage);
            });
    });
});
function toggleForms() {
    const signupForm = document.getElementById('signup-form');
    const loginForm = document.getElementById('login-form');
    signupForm.classList.toggle('hidden');
    loginForm.classList.toggle('hidden');
}
