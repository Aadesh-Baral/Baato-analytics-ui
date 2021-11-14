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
                labelFontSize:"8",
				interval: 1,
				labelFontColor: '#fff'
            },
			axisY: {
				// title: "Number of iPhones ( in Million )",
                gridThickness: 0.3,
                labelFontFamily: "Poppins",
                labelFontColor: "white",
                labelFontSize:8,
			},
			dataPointWidth: 15,
			data: [
			{
				type: "splineArea",
                color: 'aqua',
				// xValueFormatString: "YYYY",
				// yValueFormatString: "#,##0.## Million",
				dataPoints: [
					{ label:'Sunday', y: 4.6},
					{ label:'Monday', y: 9.3},
					{ label:'Tuesday', y: 5.4},
					{ label:'Wednesday', y: 6.3},
					{ label:'Thursday', y: 4.5},
					{ label:'Friday', y: 7.8},
					{ label:'Saturday', y: 3.2},
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