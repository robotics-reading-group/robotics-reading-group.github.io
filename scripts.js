document.addEventListener("DOMContentLoaded", function() {
    // Replace with your Google Sheet CSV link
    const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1pj_bHTd7RDTGN4NDmmmD8KTYK-4Nvla5rMgvPJZPpoY/export?format=csv';

    fetch(GOOGLE_SHEET_CSV_URL)
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // skip the header row
        let htmlContent = '';

        rows.forEach(row => {
            const [presenter, title, linkp, year, source, linkm] = row.split(',');

            // Ensure that the row has the expected number of columns to avoid errors
            if ([presenter, title, linkp, year, source, linkm].includes(undefined)) {
                return;
            }

            htmlContent += `
                <tr>
                    <td>${presenter.trim()}</td>
                    <td>${title.trim()}</td>
                    <td><a href="${linkp.trim()}" target="_blank">Link paper</a></td>
                    <td>${year.trim()}</td>
                    <td>${source.trim()}</td>
                    <td><a href="${linkm.trim()}" target="_blank">Link meeting</a></td>
                </tr>
            `;
        });

        document.querySelector('#papersTable tbody').innerHTML = htmlContent; // add the rows to the table
    })
    .catch(error => {
        console.error('Error fetching the CSV file:', error);
    });
});
