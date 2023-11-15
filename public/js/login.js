const loginFormHandler = async (event) => {
    event.preventDefault();

    const userData = {
        email: document.querySelector('#emailLogin').value.trim(),
        password: document.querySelector('passwordLogin').value.trim(),
    };

    if (email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-type': 'application,/json', },
        });
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Login failed.');
        }
    }
};


const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#usernameSignup').value.trim();
    const email = document.querySelector('#emailSignup').value.trim();
    const password = document.querySelector('#passwordSignup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/user/', {
            method: 'POST',
            body: JSON.stringify({username, email, password}),
            headers: { 'Content-Type': 'application/json'},
        });
        if (response.ok) {
            window.location.href = '/dashboard';
        } else {
            const errorData = await response.json();
            alert('Sign up Error: ' + errorData.message);
        }
    }
}