const React = require('react');
const { Raphael, Paper, Set, Text, Rect,Path, Circle } = require('react-raphael');
const Axis = require('./base/Axis');
const Utils = require('./utils');

const { Component, PropTypes } = React;

class BarSerise extends Component{
	getDefaultPath(){
		var { width,height,xAxis,yAxis} = this.props;
		return ["M",yAxis.width,height-xAxis.height+15,"L",width, height-xAxis.height+15 ];
	}
	getBarPath(){
        var data = this.getDrawPoints();
		var path = [];
		if(data.length>=1){
			path.push([ "M", data[0]._x, data[0]._y ]);
			for(var i=1;i<_data.length;i++){
				path.push(["L", data[i]._x, data[i]._y ]);
			}
		}else{
			path.push([ "M", data[0]._x || 0, data[0]._y || 0 ]);
		}
		return path;
	}
    getDrawPoints(){
	   var { width,height,serise,xAxis,yAxis,index,count,barWidth,fontSize} = this.props;
		serise._index = index; 
		serise._count = count;
       var data = Utils.getBarData({width,height,xAxis,yAxis,barWidth,fontSize},serise);
       return data.Values;
    }
	handleMouseOut(){
		var data = this.items;
		this.attr({"fill": data.color});
		if(data.textAutoHide){
			this.set[1].hide();
		}else{
			this.set[1].attr({"fill": data.color});
		}
	}
	handleMouseOver(){
		var data = this.items;
		data.color = this.attr("fill");
		this.attr({"fill":data.hoverColor}).toFront();
		if(data.textAutoHide){
			this.set[1].show().toFront();
		}
		else{
			this.set[1].attr({"fill":data.hoverColor}).toFront();
		}
	}
    render(){
	    var {serise,height,xAxis, yAxis,fontSize,textAutoHide} = this.props;
		serise.textAutoHide = textAutoHide;
		var data = this.getDrawPoints();
		var defaultX = ((yAxis.width || 60) - 15);
		var handleMouseOut = this.handleMouseOut;
		var handleMouseOver = this.handleMouseOver;
        return (<Set>
			{
				data.map(function(ele,pos){
					return (<Set key={pos}>
						<Rect key={"path"+pos} x={defaultX} y={ele._y - ele._height /2} width={0} height={ele._height} data={{...serise}}
							attr={{"fill": ele.color || serise.color,"stroke": "none"}} mouseout={handleMouseOut} mouseover={handleMouseOver}
							animate={Raphael.animation({"width":ele._width},500,"<>")} />
						<Text key={"text"-pos} x={defaultX + ele._width + fontSize/2 } y={ele._y} text={String(ele.x)} attr={{"text-anchor": "start", "fill": textAutoHide? serise.hoverColor : (ele.color || serise.color),"font-size": fontSize}} hide={textAutoHide}/>
						</Set>)
				})
			}
        </Set>)
    }
}

class BarChart extends Component{
    render(){
        var {width,height,serises,xAxis,yAxis,grid,fontSize,barWidth,textAutoHide,children} = this.props;
        return (<Paper width={width} height={height}>
            <Axis type="bar" width={width} height={height} xAxis={xAxis} yAxis={yAxis} grid={grid} />
            {
                serises.map(function(ele,pos){
                    return (<BarSerise key={pos} ref={"serise"+pos} index={pos} count={serises.length+1} width={width} height={height} barWidth={barWidth} fontSize={fontSize}
							textAutoHide={textAutoHide} serise={ele} xAxis={xAxis} yAxis={yAxis} />)
                })
            }
            {
                children
            }
        </Paper>)
    }
}

BarChart.propTypes = { 
	width: PropTypes.number, 
	height: PropTypes.number,
	serises: PropTypes.arrayOf(PropTypes.object),
	xAxis: PropTypes.shape({
		min: PropTypes.number, 
		max: PropTypes.number, 
		interval: PropTypes.number, 
		formatter: PropTypes.func, 
		width: PropTypes.number, 
	}),
	yAxis: PropTypes.shape({
		min: PropTypes.number, 
		max: PropTypes.number, 
		interval: PropTypes.number, 
		formatter: PropTypes.func, 
		width: PropTypes.number, 
	}),
	grid:  PropTypes.shape({
		color: PropTypes.string, 
		thickness: PropTypes.number,
		showYGrid: PropTypes.bool,
		showXGrid: PropTypes.bool
	}),
	barWidth: PropTypes.number,
	fontSize: PropTypes.number,
	textAutoHide: PropTypes.bool
};
BarChart.defaultProps = { 
	width: 600, 
	height: 400, 
	serises: [], 
	xAxis: {
		min: 0,
		max: 10000,
		interval: 200,
		formatter: null,
		height: 60
	}, 
	yAxis: {
		min: 0,
		max: 4,
		interval: 10,
		formatter: null,
		width: 60
	}, 
	grid:{
		color: "#ccc",
		thickness: 1,
		showYGrid: false,
		showXGrid: true
	},
	barWidth: 20,
	fontSize: 14,
	textAutoHide: false
};
                
module.exports = BarChart;