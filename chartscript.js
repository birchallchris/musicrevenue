Papa.parse('musicrevenue_simple.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        const labels = [];
        const values = [];

        results.data.forEach(row => {
            labels.push(row.Outlet);
            values.push(cleanNumber(row.PPM));
        });

        new Chart(
            document.getElementById('revenueChart'),
            {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'PPM',
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
                                text: 'PPM'
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
