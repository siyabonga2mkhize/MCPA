//write 
const scriptURL = 'https://script.google.com/macros/s/AKfycbz8kh8qXGLYTrErO1btuwBcpx9pCsYw69tJf5DpvtQ_USp4T-vqBRu4l3jfjvgIB3LI/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  
  e.preventDefault()
  
  const formData = new FormData(form);

  // Add new columns to the form data
  formData.append('Surname', document.querySelector("input[name='Surname']").value);
  formData.append('your-name', document.querySelector("input[name='your-name']").value);
  formData.append('your-email', document.querySelector("input[name='your-email']").value);
  formData.append('CellNumber', document.querySelector("input[name='CellNumber']").value);
  formData.append('password', document.querySelector("input[name='password']").value);
  formData.append('Address', document.querySelector("input[name='Address']").value);

  fetch(scriptURL, { method: 'POST', body: formData })
    .then(response => response.text().then(text => alert(`Thank you! Form is submitted: ${text}`)))
    .then(() => { window.location.reload(); })
    .catch(error => console.error('Error!', error.message))
})

//read from publish link
document.addEventListener("DOMContentLoaded", () => {
    const loginButton = document.querySelector("button[type='button']");

    if (loginButton) {
        loginButton.addEventListener("click", () => {
            const email = document.querySelector("input[name='your-email']").value;
            const password = document.querySelector("input[name='password']").value;

            // Replace with your published CSV link
            const csvURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSE1DPdGhVLxqz07hCgbkBPJPuGKRm39eNT_Ni-kqU9xAfe6S8j6YS7QR_0NzIESGTBLrUYqmv7qcqk/pub?output=csv';

            // Fetch the CSV data
            fetch(csvURL)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to load CSV data');
                    }
                    return response.text();
                })
                .then(csvText => {
                    // Parse the CSV data
                    const rows = csvText.split('\n').map(row => row.split(','));
                    const headers = rows.shift(); // Extract headers (first row)

                    // Convert rows to objects
                    const data = rows.map(row => {
                        const obj = {};
                        headers.forEach((header, index) => {
                            obj[header.trim()] = row[index].trim();
                        });
                        return obj;
                    });

                    // Search for the user in the parsed data
                    const userFound = data.find(user => user["your-email"] === email && user.password === password);

                    if (userFound) {
                        // Redirect to home.html if user is found
                        window.location.href = "../Cart & Checkout/index.html";
                    } else {
                        // Show an error message if validation fails
                        alert("Invalid email or password. Please try again.");
                    }
                })
                .catch(error => console.error('Error fetching or parsing CSV data!', error.message));
        });
    } else {
        console.error("Login button not found in the DOM.");
    }
});
