import React from 'react';
import CanvasJSReact from '../../canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class AreaChart extends React.Component {
	render() {
		const options = {
			theme: "light1",
			animationEnabled: false,
			exportEnabled: false,
            backgroundColor: 'rgba(10, 25, 58, 0.603)',
            height:150,
			width: 850,
			title: {
				// text: "Number of iPhones Sold"
			},
            axisX:{
                labelFontFamily: "Poppins",
                labelFontColor: "white",
                labelFontSize:"8"
            },
			axisY: {
				// title: "Number of iPhones ( in Million )",
                gridThickness: 0.3,
                labelFontFamily: "Poppins",
                labelFontColor: "white",
                labelFontSize:8,
			},
			data: [
			{
				type: "column",
                color: 'aqua',
				// xValueFormatString: "YYYY",
				yValueFormatString: "#,##0.## Million",
				dataPoints: [
					{ label:'0', y: 4.6},
					{ label:'1', y: 9.3},
					{ label:'2', y: 5.4},
					{ label:'3', y: 6.3},
					{ label:'4', y: 4.5},
					{ label:'5', y: 7.8},
					{ label:'6', y: 3.2},
					{ label:'7', y: 4.6},
					{ label:'8', y: 9.3},
					{ label:'9', y: 5.4},
					{ label:'10', y: 6.3},
					{ label:'11', y: 4.5},
					{ label:'12', y: 7.8},
					{ label:'13', y: 3.2},
					{ label:'14', y: 4.6},
					{ label:'15', y: 9.3},
					{ label:'16', y: 5.4},
					{ label:'17', y: 6.3},
					{ label:'18', y: 4.5},
					{ label:'19', y: 7.8},
					{ label:'20', y: 3.2},
					{ label:'21', y: 6.3},
					{ label:'22', y: 4.5},
					{ label:'23', y: 7.8},
					{ label:'24', y: 3.2}

				]
			}
			]
		}
		return (
		<div className='AreaChart'>
			<CanvasJSChart options = {options}
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
        // <div className='column left'>
        //     I am Line Chart
        // </div>
		);
	}
}
export default AreaChart;                              