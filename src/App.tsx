import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import deepcopy from 'deepcopy';
import { Line } from 'react-chartjs-2';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import moment from 'moment';

import {ChartType, TableType} from './types/componentTypes';
import './App.css';



function App() {
  let chartData : ChartType = {
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: ' ',
        data: [],
        fill: false,
        borderColor: '#742774',
      },
    ],
    options: {
      stroke: {
        curve: 'smooth',
      },
    },
  }

  let tableDataValue : TableType = [];
  let startDateValue = new Date().setDate(new Date().getDate() - 5);
  let endDateValue = new Date().setDate(new Date().getDate() + 5);
  
  const [startDate, setStartDate] = useState(moment(startDateValue).format('yyyy-MM-DD'));
  const [endDate, setEndDate] = useState(moment(endDateValue).format('yyyy-MM-DD'));
  const [tableData, setTableData] = useState(tableDataValue);
  const [product, setProduct] = useState('product-a');
  const [data, setChartData] = useState(chartData);

  function randomize(range : number){
    console.log('------product',product)
    let multipler = (product == 'product-a') ? 100 : 1000;
  
    let arr = [];
    while (arr.length <= range) {
      var r = Math.floor(Math.random() * multipler) + 1;
      if (arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
  };

  function randomizeData() {
    // Get number of days
    let oned = 24 * 60 * 60 * 1000;
    let days = Math.ceil(
      (new Date(endDate).getTime() -
        new Date(startDate).getTime()) /
        oned
    );

    // Create data set of all the days
    let rangeValues = randomize(days);

    // create Dataset for chart.
    let startTempDate = new Date(startDate);

    let labels = [];
    let tableData = [];
    let lowerRange = deepcopy(rangeValues),
      upperRange = deepcopy(rangeValues);

    for (let i = 0; i <= days; i++) {
      let date : Date = deepcopy(startTempDate);
      // date = date.setDate(startTempDate.getDate() + i);
      labels.push(moment(date.setDate(startTempDate.getDate() + i)).format('yyyy-MM-DD'));

      tableData.push({
        id: i,
        date: new Date(date).getDate(),
        value: rangeValues[i],
      });
    }

    let todaysIndex = labels.indexOf(moment(new Date()).format('yyyy-MM-DD'));

    for (let j = 0; j < rangeValues.length; j++) {
      if (j > todaysIndex) {
        lowerRange[j] = rangeValues[j] * 0.95;
        upperRange[j] = rangeValues[j] * 1.05;
      }
    }

    let chartData = deepcopy(data);
    chartData.labels = labels;
    chartData.datasets[0].data = lowerRange;
    chartData.datasets[1].data = upperRange;

    setTableData(tableData)
    setChartData(chartData)

  }

  useEffect(() => {
    randomizeData();
  }, [product, startDate, endDate])

  let columns = [
    { field: 'id', headerName: 'Sr no.' },
    {
      headerName: 'Date',
      width: 150,
      field: 'date', // accessor is the "key" in the data
    },
    {
      headerName: 'Value',
      width: 150,
      field: 'value', // accessor is the "key" in the data
    },
  ];
  return (
    <div className='App'>
      <div className='row'>
        <div
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
            margin: '2em',
          }}
        >
          <TextField
            id='startDate'
            label=''
            type='date'
            inputProps={{ max: moment(new Date()).format('yyyy-MM-DD') }}
            defaultValue={startDate}
            onChange={(e) => {
              setStartDate(e.target.value)  
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id='endDate'
            label=''
            type='date'
            inputProps={{ min: moment(new Date()).format('yyyy-MM-DD') }}
            defaultValue={endDate}
            onChange={(e) => {
              setEndDate(e.target.value)
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
      </div>
      <br />
      <div className='row'>
        <div className='col-md-6'>
          <Line data={data} />
        </div>
        <div className='col-md-6' style={{ height: 300, width: '100%' }}>
          <DataGrid
            columns={columns}
            rows={tableData}
            pageSize={5}
          />
        </div>
      </div>
      <div className='row'>
        <div
          style={{
            justifyContent: 'space-evenly',
            display: 'flex',
            width: '100%',
            margin: '2em',
          }}
        >
      
          <Select
            native
            value={product}
            onChange={(event) => {
              setProduct(event.target.value as string)
            }}
          >
            <option aria-label='None' value='' />
            <option value={'product-a'}>Product A</option>
            <option value={'product-b'}>Product B</option>
          </Select>
          <Button
            variant='contained'
            color='primary'
            onClick={() => {
              randomizeData();
            }}
          >
            Randomize
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
