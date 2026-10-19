Papa.parse('musicrevenue.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: function(results) {
        // Sort by payout (highest first)
        results.data.sort((a, b) =>
            Number(b.PayoutPerStreamUSD) -
            Number(a.PayoutPerStreamUSD)
        );
        const tbody = document.querySelector('#dataTable tbody');
        const labels = [];
        const values = [];
        results.data.forEach(row => {
            // Add row to table
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${row.Platform}</td>
                <td>${row.PayoutPerStreamUSD}</td>
                <td>${row.MonthlyUsersMillions}</td>
                <td>${row.Type}</td>
                <td>${row.StreamsForUSMonthlyMinimumWage}</td>
            `;
            tbody.appendChild(tr);
          
            // Add data to chart arrays
            labels.push(row.Platform);
            values.push(Number(row.PayoutPerStreamUSD));
        });
        new Chart(
            document.getElementById('revenueChart'),
            {
                type: 'bar',

                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Payout Per Stream ($)',
                        data: values,
                        backgroundColor: '#4e79a7'
                    }]
                },

                options: {
                    responsive: true,

                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            }
        );
    },

    error: function(err) {
        console.error("FAILED");
        console.error(err);
    }
});
function cleanNumber(value) {
    return Number(
        String(value).replace(/[^0-9.-]/g, '')
    );
}
function populateFilter(data) {

    const filter =
        document.getElementById('typeFilter');

    // Clear existing options
    filter.innerHTML = '';

    // Add "All"
    filter.add(
        new Option('All', 'All')
    );

    // Get unique values
    const types = [
        ...new Set(data.map(row => row.Type))
    ];

    // Add each unique type
    types.forEach(type => {
        filter.add(
            new Option(type, type)
        );
    });
}
