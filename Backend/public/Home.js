const tableBody = document.getElementById("tableBody");
const createForm = document.getElementById("createForm");
const updateForm = document.getElementById("updateForm");
const deleteForm = document.getElementById("deleteForm");

const createSubmit = document.getElementById("createSubmit");
const updateSubmit = document.getElementById("updateSubmit");
const deleteSubmit = document.getElementById("deleteSubmit");

const createFormFields = document.getElementById("createFormFields");
const updateFormFields = document.getElementById("updateFormFields");
const deleteFormFields = document.getElementById("deleteFormFields");

updateSubmit.addEventListener("click", () => {
  const name = document.getElementById("updateName").value;
  const weight = parseFloat(document.getElementById("updateWeight").value);
  const height = parseFloat(document.getElementById("updateHeight").value);
  const bmi = calculateBMI(weight, height);

  const index = data.findIndex((person) => person.name === name);
  if (index !== -1) {
    data[index] = { name, weight, height, bmi };
    updateFormFields.reset();
  }
});



function calculateBMI(weight, height) {
  return (weight / (height * height)).toFixed(2);
}

// Show/hide forms based on button clicks
document.getElementById("createBtn").addEventListener("click", () => {
  createForm.classList.remove("hidden");
  updateForm.classList.add("hidden");
  deleteForm.classList.add("hidden");
});

document.getElementById("updateBtn").addEventListener("click", () => {
  createForm.classList.add("hidden");
  updateForm.classList.remove("hidden");
  deleteForm.classList.add("hidden");
});

document.getElementById("deleteBtn").addEventListener("click", () => {
  createForm.classList.add("hidden");
  updateForm.classList.add("hidden");
  deleteForm.classList.remove("hidden");
});

const formContainer = document.getElementById("formContainer");

const apiUrl = "/api/v1/bmi";

document.getElementById("createSubmit").addEventListener("click", async () => {
  const name = document.getElementById("createName").value;
  const weight = parseFloat(document.getElementById("createWeight").value);
  const height = parseFloat(document.getElementById("createHeight").value);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weight, height }),
  });

  if (response.ok) {
    const newData = await response.json();
    fetchDataFromBackend();
    createFormFields.reset();
  }
});

document.getElementById("updateSubmit").addEventListener("click", async () => {
  const name = document.getElementById("updateName").value;
  const weight = parseFloat(document.getElementById("updateWeight").value);
  const height = parseFloat(document.getElementById("updateHeight").value);

  const response = await fetch(`api/v1/update-bmi`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, weight, height }),
  });
  fetchDataFromBackend();

  if (response.ok) {
    updateFormFields.reset();
    fetchDataFromBackend();
  }
});

document.getElementById("deleteSubmit").addEventListener("click", async () => {
  const name = document.getElementById("deleteName").value;
  const response = await fetch(`api/v1/delete-bmi/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });
  fetchDataFromBackend();
});

document.addEventListener("DOMContentLoaded", function () {
  // Fetch data from the backend and display it in the table when the page loads
  fetchDataFromBackend();
});

function displayResponse(data) {
  const responseTable = document.getElementById("responseTable");
  let tableHTML = `
        <table>
            <tr>
                <th>Name</th>
                <th>Height (cm)</th>
                <th>Weight (kg)</th>
                <th>BMI</th>
            </tr>`;

  data.bmi.forEach((entry) => {
    tableHTML += `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.height}</td>
                <td>${entry.weight}</td>
                <td>${entry.bmi}</td>
            </tr>`;
  });

  tableHTML += `</table>`;
  responseTable.innerHTML = tableHTML;
}

function fetchDataFromBackend() {
  // Replace 'YOUR_BACKEND_URL' with the actual URL of your backend endpoint
  fetch("api/v1/get-bmi")
    .then((response) => response.json())
    .then((data) => {
      // Display the response in the table
      displayResponse(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function logout() {
  fetch("api/v1/logout")
    .then((response) => response.json())
    .then((data) => {
      location.reload();
      displayResponse(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
