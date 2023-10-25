document.addEventListener("DOMContentLoaded", function() {
    fetch('papers.csv')
    .then(response => response.text())
    .then(data => {
        const rows = data.split('\n').slice(1); // skip the header row
        let htmlContent = '';

        rows.forEach(row => {
            const [presenter, title, linkp, year, source,linkm] = row.split(',');
            htmlContent += `
                <tr>
                    <td>${presenter}</td>
                    <td>${title}</td>
                    <td><a href="${linkp}" target="_blank">Link paper</a></td>
                    <td>${year}</td>
                    <td>${source}</td>
                    <td><a href="${linkm}" target="_blank">Link meeting</a></td>
                </tr>
            `;
        });

        document.querySelector('#papersTable tbody').innerHTML = htmlContent;
    })
    .catch(error => {
        console.error('Error fetching the CSV file:', error);
    });
});
