Papa.parse('musicrevenue.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        const labels = [];
        const values = [];

        results.data.forEach(row => {
            labels.push(row.Platform);
            values.push(cleanNumber(row.StreamsForUSMonthlyMinimumWage));
        });

        new Chart(
            document.getElementById('revenueChart'),
            {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Streams for US Monthly Minimum Wage',
                        data: values,
                        backgroundColor: '#4e79a7'
                    }]
                },
                options: {
                    scales: {
                        y: {
                            type: 'logarithmic',
                            title: {
                                display: true,
                                text: 'Streams for US Monthly Minimum Wage'
                            }
                        }
                    }
                }
            }
        );
    }
});
function cleanNumber(value) {
    return Number(
        String(value).replace(/[^0-9.-]/g, '')
    );
}
