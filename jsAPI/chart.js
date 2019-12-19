// <div id="chartContainer" style="height: 300px; width: 100%;"></div>
//     <script src="js/canvasjs-2.3.2/canvasjs.min.js"></script>

$.ajax({
    type: "GET",
    url: "https://dsd15-log.azurewebsites.net/Logs/totalallchange/",
    success: function (data) {
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            theme: "light1", // "light1", "light2", "dark1", "dark2"
            title: {
                text: "Số lượng nhân viên công ty từng tháng"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                //indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: [
                    {x: data[0][0], y: data[0][1]},
                    {x: data[1][0], y: data[1][1]},
                    {x: data[2][0], y: data[2][1]},
                    {x: data[3][0], y: data[3][1]},
                    // {x: data[0][0], y: data[0][0], indexLabel: "Highest"},
                    {x: data[4][0], y: data[4][1]},
                    {x: data[5][0], y: data[5][1]},
                    {x: data[6][0], y: data[6][1]},
                    {x: data[7][0], y: data[7][1]},
                    {x: data[8][0], y: data[8][1]},
                    {x: data[9][0], y: data[9][1]},
                    {x: data[10][0], y: data[10][1]},
                    {x: data[11][0], y: data[11][1]}
                ]
            }]
        });
        chart.render();
    },
    error: function (error) {
        console.log(error);
    }
});
