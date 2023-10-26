document.addEventListener("DOMContentLoaded", function() {
    // Replace with your Google Sheet CSV link
    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1pj_bHTd7RDTGN4NDmmmD8KTYK-4Nvla5rMgvPJZPpoY/export?format=csv';

    fetch(GOOGLE_SHEET_CSV_URL)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text();
    })
    .then(data => {
        const rows = data.split('\n').slice(1); // skip the header row
        let htmlContent = '';

        rows.forEach(row => {
            const columns = row.split('\t');  // Assume CSV is tab-separated

            // Ensure that the row has the expected number of columns to avoid errors
            if (columns.length !== 5) {
                return;
            }

            const [date, agenda, presenter, source, _] = columns;  // _ is a placeholder for authors

            htmlContent += `
                <tr>
                    <td>${date.trim()}</td>
                    <td><a href="${source.trim()}" target="_blank">${agenda.trim()}</a></td>
                    <td>${presenter.trim()}</td>
                    <td>${source.trim()}</td>
                </tr>
            `;
        });

        document.querySelector('#papersTable tbody').innerHTML = htmlContent; // add the rows to the table
    })
    .catch(error => {
        console.error('Error:', error.message);
        // Assuming there's a designated place on your webpage to display errors
        const errorDisplay = document.createElement('div');
        errorDisplay.style.color = 'red';
        errorDisplay.textContent = "An error occurred: " + error.message;
        document.body.appendChild(errorDisplay); // Append the error message to the body
    });
});
