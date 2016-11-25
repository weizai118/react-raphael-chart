require('./index.less');
var React = require('react');
var ReactDOM = require('react-dom');
var {LineChart,BarChart,PieChart,DoughnutChart , VoronoiLineChart} = require('../lib/index');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');

var lineSerise = {
	color: "#74C93C",
	thickness: 2,
	data: [{x:0,y:90},{x:1,y:83},{x:2,y:80},{x:3,y:45},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}
var lineSerise1 = {
	color: "#9e9298",
	thickness: 2,
	data: [{x:0,y:73},{x:1,y:68},{x:2,y:71},{x:3,y:55},{x:4,y:89},{x:5,y:91},{x:6,y:72},{x:7,y:76},{x:8,y:78},{x:9,y:78},{x:10,y:90}]
}
var lineSerise2 = {
	color: "#FF7E60",
	thickness: 2,
	data: []
}

var lineSerise3 = {
	color: "#9802fe",
	thickness: 2,
	data: [{x:0,y:83},{x:1,y:68},{x:2,y:71},{x:3,y:50},{x:4,y:89,color: "#03A9F4"},{x:5,y:71},{x:6,y:72},{x:7,y:76},{x:8,y:78},{x:9,y:78},{x:10,y:90}]
}

var barSerise = {
	color: "#74C93C",
	hoverColor: "#FF7E60",
	maxWidth: 20,
	data: [{x:1,y:83},{x:2,y:80,color: "#03A9F4"},{x:3,y:45},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}

var barSerise2 = {
	color: "#DDDDDD",
	hoverColor: "#FF7E60",
	maxWidth: 20,
	data: [{x:1,y:83},{x:2,y:80},{x:3,y:45},{x:4,y:82},{x:5,y:75},{x:6,y:95},{x:7,y:100},{x:8,y:98},{x:9,y:92},{x:10,y:94}]
}

var pieSerise = {
	color: "#74C93C",
	background: "#DDD",
	radius: 48,
	center: { x: 50,y: 50},
	label: "0%",
	value: 0,
	total: 100,
	width: 100,
	height: 100,
	style: {width: 150,height: 150, textAlign: "center"},
	onClick: function(e){ console.log(e); }
}

const SampleLineChart = ()=> <LineChart width={500} height={360} serises={[lineSerise]} />;
class ExtendLineChart extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			serises: []
		}
	}
	componentDidMount(){
		var _self = this;
		setTimeout(function(){
			setInterval(function(){
				_self.setState({
					serises: [lineSerise,lineSerise1]
				})
			},4000)
		},2000)
//		setInterval(function(){
//			_self.setState({
//				serises: [lineSerise,lineSerise1]
//			})
//		},4000)
		setInterval(function(){
			_self.setState({
				serises: [lineSerise2,lineSerise3]
			})
		},4000)
	}
	render(){
		return (<VoronoiLineChart width={500} height={360} serises={this.state.serises} />)
	}
}

const SampleBarChart = ()=> <BarChart width={500} height={360} serises={[barSerise,barSerise2]} />;
const SamplePieChart = () => <PieChart {...pieSerise} />;
const SampleDoughnutChart = () => <DoughnutChart {...pieSerise} />;

class ExtendPieChart extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			data : pieSerise
		}
	}
	componentDidMount(){
		var data = this.state.data;
		data.value = 90;
		data.label = "90%";
		this.setState({
			data: data
		})
	}
	render(){
		return (<PieChart {...this.state.data} />)
	}
}	
	
ReactDOM.render(<div>
                <SampleLineChart />
                <ExtendLineChart />
				<SampleBarChart />
				<SamplePieChart />
				<ExtendPieChart />
                <SampleDoughnutChart />
                </div>,document.getElementById("react-container"));