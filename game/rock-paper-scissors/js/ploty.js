// const PLOTLY_BY_ID = document.getElementById(
//     "plotly"
// );

// function barChart(obj) {
//     let [x, y] = obj.ductile();
//     x.swap(1, 2);
//     y.swap(1, 2);
//     const data = [{
//         x: x,
//         y: y,
//         type: "bar",
//         marker: {color: "#FFFFFF"}
//     }];
//     const layout = {
//         showlegend: false,
//         plot_bgcolor: "#282828",
//         paper_bgcolor: "#282828"
//     };

//     Plotly.newPlot(PLOTLY_BY_ID, data, layout, {displayModeBar: false});
// }