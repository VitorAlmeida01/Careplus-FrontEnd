import ReactEcharts from "echarts-for-react"

export default function DonutChart() {
  const option = {
    series: [
      {
        type: "pie",
        radius: ["70%", "90%"],
        avoidLabelOverlap: false,
        label: {
          show: true,
          position: "center",
          fontSize: 30,
          color: "#00B8DB",
          formatter: "65%",
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 65, itemStyle: { color: "#00D492" } },
          { value: 35, itemStyle: { color: "#E5E7EB" } },
        ],
      },
    ],
  }

  return (
    <ReactEcharts option={option} style={{ height: "200px", width: "200px" }} />
  )
}
