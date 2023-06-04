// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}

// CHART
var options = {
  chart: {
    type: "bar",
    stacked: true,
    toolbar: { show: false },
    events: {
      mounted: function (chartContext, config) {
        var categories = chartContext.w.config.xaxis.categories;
        var series = chartContext.w.config.series;

        var graphics = chartContext.el;
        var barsGroup = graphics.querySelector(".apexcharts-bar-series");

        series.forEach(function (data, seriesIndex) {
          data.forEach(function (value, dataIndex) {
            var label = document.createElement("div");
            label.classList.add("custom-label");
            label.innerHTML = value;

            var bar = barsGroup.querySelector(".apexcharts-bar"); // 모든 막대 중 첫 번째 막대만 선택
            var x =
              parseFloat(bar.getAttribute("x")) + bar.getAttribute("width") / 2;
            var y = parseFloat(bar.getAttribute("y")) - 10;

            label.style.left = x + "px";
            label.style.top = y + "px";

            barsGroup.appendChild(label);
          });
        });
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: true,
      barHeight: "80%",
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      data: [60, 40, 80, 50, 70],
    },
  ],
  xaxis: {
    categories: ["Label 1", "Label 2", "Label 3", "Label 4", "Label 5"],
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    max: 100,
  },
  chart: {
    events: {
      rendered: function (chartContext, config) {
        var labels = chartContext.w.globals.labels;
        var series = chartContext.w.globals.series;

        var graphics = chartContext.el;
        var labelsGroup = graphics.querySelector(".apexcharts-xaxis-texts-g");

        series[0].forEach(function (value, index) {
          var label = document.createElement("div");
          label.classList.add("custom-label");
          label.innerHTML = value + "%";

          var position = labelsGroup.children[index]
            .getAttribute("transform")
            .match(/translate\(([^)]+)\)/)[1]
            .split(",");
          var x = parseFloat(position[0]);
          var y = parseFloat(position[1]);

          label.style.left = x + "px";
          label.style.top = y - 15 + "px";

          graphics.appendChild(label);
        });
      },
    },
  },
};

var chart = new ApexCharts(document.querySelector("#barChart"), options);
chart.render();
