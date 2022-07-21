import React, {useState} from 'react'
import {Bar} from 'react-chartjs-2'
import {Line} from 'react-chartjs-2'
import Chart from 'chart.js/auto';

function Graph({measurements}) {
  let new_obj = {}
  let chart_array = []

  function chart_obj (time, charge) {
    this.time = time;
    this.charge= charge;
  }
  measurements.map((item) => {
    if(item.stateOfCharge != null){
      new_obj = new chart_obj(item.timestamp, item.stateOfCharge)
    }else {
      new_obj = new chart_obj(item.timestamp, 0)
    }
    chart_array.push(new_obj)

  })
const data = {
    labels: chart_array.map(item => item.time),
    // labels: [measurements[0].timestamp,measurements[measurements.length/2].timestamp,measurements[measurements.length-1].timestamp],
    datasets : [
        {
            label: "Battery Charge",
            data: chart_array.map(item => item.charge),backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
        }
    ]
}

var options = {
    maintainAspectRatio: false,
    scales: {
    },
    legend: {
      labels: {
        fontSize: 25,
      },
    },
  }

  return (<div className='chart'>
    <Line data={data}
    />
    </div>
  )
}

export default Graph