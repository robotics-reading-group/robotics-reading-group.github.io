document.addEventListener("DOMContentLoaded", function() {
    // Replace with your Google Sheet CSV link
    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1mzFGnrAVxXgl-67nVLEZ2WCv2U8sHbeMnyPhpwSMZzs/export?format=csv';

    fetch(GOOGLE_SHEET_CSV_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // skip the header row
        let htmlContent = '';

        rows.forEach(row => {
            // Splitting by tab character since CSV provided is tab-separated
            const [date, agenda, presenter, source, _] = row.split('\t');  // _ is a placeholder for authors

            // Ensure that the row has the expected number of columns to avoid errors
            if ([date, agenda, presenter, source].includes(undefined)) {
                return;
            }

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
        console.error('Error fetching the CSV file:', error);
    });
});
