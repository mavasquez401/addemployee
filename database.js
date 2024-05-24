
// checks submit employee form constantly for new user
document.getElementById('employeeForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(this);

    // goes through localhost to get info
    fetch('http://localhost:3000/addemployee', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => response.text())
    .then(data => {
        document.getElementById('status').innerHTML = `<p style="color:green">${data}</p>`;
    })
    .catch(error => {
        console.error('Error:', error); // terminal error check
        document.getElementById('status').innerHTML = `<p style="color:red">Failed to save employee</p>`;
    });
});

// helps with connecting the 
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    let formData = new FormData(this);
    console.log('Login form data:', Array.from(formData.entries())); // Debugging log

    fetch('http://localhost:3000/login', {
        method: 'POST',
        body: new URLSearchParams(formData)
    })
    .then(response => {
        console.log('Login fetch response status:', response.status); // Debugging log
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Login response data:', data); // Debugging log

        if (data.success) {
            document.getElementById('loginStatus').innerHTML = `<p style="color:green">Logged In</p>`;
        } else {
            document.getElementById('loginStatus').innerHTML = `<p style="color:red">${data.message || 'Login Failed'}</p>`;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('loginStatus').innerHTML = `<p style="color:red">Login Failed</p>`;
    });
});
