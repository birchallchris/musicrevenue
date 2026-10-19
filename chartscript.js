Papa.parse('musicrevenue_simple.csv', {
    download: true,
    header: true,
    skipEmptyLines: true,

    complete: function(results) {

        const labels = [];
        const values = [];

        results.data.forEach(row => {
            labels.push(row.Outlet);
            values.push(Number(row.PPM));
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
                }
            }
        );
    }
});
