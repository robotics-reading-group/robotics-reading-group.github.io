document.addEventListener("DOMContentLoaded", function() {
    // Replace with your Google Sheet CSV link
    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1pj_bHTd7RDTGN4NDmmmD8KTYK-4Nvla5rMgvPJZPpoY/export?format=csv';

    fetch(GOOGLE_SHEET_CSV_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // skip the header row
        let htmlContent = '';

        rows.forEach(row => {
            // Splitting by tab character since CSV provided is tab-separated
            const [date, agenda, presenter, source, authors] = row.split('\t');

            // Ensure that the row has the expected number of columns to avoid errors
            if ([date, agenda, presenter, source, authors].includes(undefined)) {
                return;
            }

            htmlContent += `
                <tr>
                    <td>${date.trim()}</td>
                    <td>${agenda.trim()}</td>
                    <td>${presenter.trim()}</td>
                    <td>${source.trim()}</td>
                    <td>${authors.trim()}</td>
                </tr>
            `;
        });

        document.querySelector('#papersTable tbody').innerHTML = htmlContent; // add the rows to the table
    })
    .catch(error => {
        console.error('Error fetching the CSV file:', error);
    });
});
