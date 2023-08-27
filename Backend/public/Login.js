document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    // Get the values from the input fields
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;

    // Create an object with the login data
    var loginData = {
      email: email,
      password: password,
    };
    console.log(loginData);
    // Make a POST request to the backend server
    fetch("/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then(function (response) {
        console.log(response);
        if (response.ok) {
          window.location.href = "/";
        } else {
          // Login failed
          alert("Invalid email or password. Please try again.");
        }
      })
      .catch(function (error) {
        console.log(error);
        alert("An error occurred during login. Please try again later.");
      });
  });
