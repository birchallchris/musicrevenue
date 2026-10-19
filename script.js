Papa.parse('musicrevenue.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        console.log("running");
        console.log(results.data);
        const tbody = document.querySelector('#dataTable tbody');

        results.data.forEach(row => {

            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${row.Platform}</td>
                <td>${row.PayoutPerStreamUSD}</td>
                <td>${row.MonthlyUsersMillions}</td>
                <td>£${row.Type}</td>
                <td>${row.StreamsForUSMothlyMinimumWage}</td>
            `;

            tbody.appendChild(tr);
            
        });
    },

    error: function(err) {
        console.error("FAILED");
        console.error(err);
    }
});
