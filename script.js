Papa.parse('musicrevenue_simple.csv', {
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
                <td>${row.Outlet}</td>
                <td>${row.ArtistType}</td>
                <td>${row.Format}</td>
                <td>£${row.RetailPrice}</td>
                <td>${row.PPM}</td>
            `;

            tbody.appendChild(tr);
            
        });
    },

    error: function(err) {
        console.error("FAILED");
        console.error(err);
    }
});
