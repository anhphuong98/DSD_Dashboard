// <div id="chartContainer" style="height: 300px; width: 100%;"></div>
//     <script src="js/canvasjs-2.3.2/canvasjs.min.js"></script>
function drawChart(url, title) {
    $.ajax({
        type: "GET",
        url: url,
        success: function (response) {
            console.log(response);
            var chart = new CanvasJS.Chart("chartContainer", {
                animationEnabled: true,
                exportEnabled: true,
                theme: "light1", // "light1", "light2", "dark1", "dark2"
                title: {
                    text: title
                },
                data: [{
                    type: "column", //change type to bar, line, area, pie, etc
                    //indexLabel: "{y}", //Shows y value on all Data Points
                    indexLabelFontColor: "#5A5757",
                    indexLabelPlacement: "outside",
                    dataPoints: [
                        {x: response[0][0], y: response[0][1]},
                        {x: response[1][0], y: response[1][1]},
                        {x: response[2][0], y: response[2][1]},
                        {x: response[3][0], y: response[3][1]},
                        // {x: response[0][0], y: response[0][0], indexLabel: "Highest"},
                        {x: response[4][0], y: response[4][1]},
                        {x: response[5][0], y: response[5][1]},
                        {x: response[6][0], y: response[6][1]},
                        {x: response[7][0], y: response[7][1]},
                        {x: response[8][0], y: response[8][1]},
                        {x: response[9][0], y: response[9][1]},
                        {x: response[10][0], y: response[10][1]},
                        {x: response[11][0], y: response[11][1]}
                    ]
                }]
            });
            chart.render();
        },
        error: function (error) {
            console.log(error);
        }
    });
}
