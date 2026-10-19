let allData = [];
let chart = null;

Papa.parse('musicrevenue.csv', {
    download: true, 
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        allData = results.data;

        populateFilter();

        drawPage(allData);

        document
            .getElementById('typeFilter')
            .addEventListener('change', filterData);
    }
});

function populateFilter() {

    const filter =
        document.getElementById('typeFilter');

    filter.innerHTML = '';

    filter.add(new Option('All Types', 'All'));

    const values =
        [...new Set(allData.map(row => row.Type))]
        .sort();

    values.forEach(value => {

        filter.add(
            new Option(value, value)
        );

    });
}

function filterData() {

    const selected =
        document.getElementById('typeFilter').value;

    let filteredData;

    if (selected === 'All') {

        filteredData = allData;

    } else {

        filteredData = allData.filter(
            row => row.Type === selected
        );

    }

    drawPage(filteredData);
}

function drawPage(data) {

    // Sort by payout (highest first)

    data.sort((a, b) =>
        Number(b.PayoutPerStreamUSD) -
        Number(a.PayoutPerStreamUSD)
    );

    const tbody =
        document.querySelector('#dataTable tbody');

    tbody.innerHTML = '';

    const labels = [];
    const values = [];

    data.forEach(row => {

        // Build table row

        const tr =
            document.createElement('tr');

        tr.innerHTML = `
            <td>${row.Platform}</td>
            <td>${row.PayoutPerStreamUSD}</td>
            <td>${row.MonthlyUsersMillions}</td>
            <td>${row.Type}</td>
            <td>${row.StreamsForUSMonthlyMinimumWage}</td>
        `;

        tbody.appendChild(tr);

        // Build chart arrays

        labels.push(row.Platform);

        values.push(
            Number(row.PayoutPerStreamUSD)
        );

    });

    // Destroy old chart if one exists

    if (chart) {
        chart.destroy();
    }

    // Create chart

    chart = new Chart(
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
}
