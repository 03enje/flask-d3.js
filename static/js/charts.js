// ---------- CHARTS ----------

fetch("/get_data")
  .then((response) => response.json())
  .then((data) => {
    // Check if the necessary data is available

    if (
      data.response1 &&
      data.response1.rows &&
      data.response1.rows.length > 0
    ) {
      const rows1 = data.response1.rows;
      const dimensionValues1 = rows1.map((row) => row.dimensionValues[0].value);
      const metricValues1 = rows1.map((row) => row.metricValues[0].value);
      // const ctx1 = document.getElementById("myChart");

      // BAR CHART
      var barChartOptions = {
        series: [
          {
            data: metricValues1,
          },
        ],
        chart: {
          type: "bar",
          height: 350,
          toolbar: {
            show: false,
          },
        },
        colors: ["#246dec", "#cc3c43", "#367952", "#f5b74f", "#4f35a1"],
        plotOptions: {
          bar: {
            distributed: true,
            borderRadius: 4,
            horizontal: false,
            columnWidth: "40%",
          },
        },
        dataLabels: {
          enabled: false,
        },
        legend: {
          show: false,
        },
        xaxis: {
          categories: dimensionValues1,
        },
        yaxis: {
          title: {
            text: "Count",
          },
        },
      };

      var barChart = new ApexCharts(
        document.querySelector("#bar-chart"),
        barChartOptions
      );
      barChart.render();
    }
    if (
      data.response2 &&
      data.response2.rows &&
      data.response2.rows.length > 0
    ) {
      const rows2 = data.response2.rows;
      const dimensionValues2 = rows2.map((row) => row.dimensionValues[0].value);
      const metricValues2 = rows2.map((row) => row.metricValues[0].value);
      // const ctx2 = document.getElementById("myBar");
      // AREA CHART
      var areaChartOptions = {
        series: [
          {
            name: "Purchase Orders",
            data: metricValues2,
          },
          // {
          //   name: "Sales Orders",
          //   data: [11, 32, 45, 32, 34, 52, 41],
          // },
        ],
        chart: {
          height: 350,
          type: "area",
          toolbar: {
            show: false,
          },
        },
        // colors: ["#4f35a1", "#246dec"],
        colors: ["#4f35a1"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        labels: dimensionValues2,
        markers: {
          size: 0,
        },
        yaxis: [
          {
            title: {
              text: "Purchase Orders",
            },
          },
          // {
          //   opposite: true,
          //   title: {
          //     text: "Sales Orders",
          //   },
          // },
        ],
        tooltip: {
          shared: true,
          intersect: false,
        },
      };

      var areaChart = new ApexCharts(
        document.querySelector("#area-chart"),
        areaChartOptions
      );
      areaChart.render();
    }

    if (
      data.response3 &&
      data.response3.rows &&
      data.response3.rows.length > 0
    ) {
      const rows3 = data.response4.rows;
      const dimensionValues3 = rows3.map((row) => row.dimensionValues[0].value);
      const metricValues3 = rows3.map((row) => row.metricValues[0].value);
      // CHART 2

      var options = {
        series: [
          {
            data: metricValues3,
          },
        ],
        chart: {
          type: "bar",
          height: 380,
        },
        plotOptions: {
          bar: {
            barHeight: "100%",
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: "bottom",
            },
          },
        },
        colors: [
          "#33b2df",
          "#546E7A",
          "#d4526e",
          "#13d8aa",
          "#A5978B",
          "#2b908f",
          "#f9a3a4",
          "#90ee7e",
          "#f48024",
          "#69d2e7",
        ],
        dataLabels: {
          enabled: true,
          textAnchor: "start",
          style: {
            colors: ["#000"],
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true,
          },
        },
        stroke: {
          width: 1,
          colors: ["#fff"],
        },
        xaxis: {
          categories: dimensionValues3,
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        title: {
          text: "Custom DataLabels",
          align: "center",
          floating: true,
        },
        subtitle: {
          text: "Category Names as DataLabels inside bars",
          align: "center",
        },
        tooltip: {
          theme: "dark",
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function () {
                return "";
              },
            },
          },
        },
      };

      var chart = new ApexCharts(document.querySelector("#testChart"), options);
      chart.render();
    } else {
      console.error("Error: Insufficient data to create the bar chart");
    }
  })
  .catch((error) => {
    console.error("Error:", error);
  });
