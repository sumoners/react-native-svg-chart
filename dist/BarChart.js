Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');
var _bindAll=require('lodash/bindAll');var _bindAll2=_interopRequireDefault(_bindAll);
var _reactNativeSvg=require('react-native-svg');var _reactNativeSvg2=_interopRequireDefault(_reactNativeSvg);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var styles=_reactNative.StyleSheet.create({
labelsContainer:{
flex:1,
flexDirection:'row'},

label:{
fontSize:7},

yLabel:{
fontSize:7,
alignItems:'flex-start',
marginLeft:3},

legendsContainer:{
flexDirection:'row',
justifyContent:'space-between',
marginVertical:15,
flexWrap:'wrap'},

legendIcon:{
width:15,
height:15,
borderRadius:2,
marginRight:8},

legend:{
flexDirection:'row',
alignItems:'center',
justifyContent:'flex-start'},

legendText:{
fontSize:12}});var



BarChart=function(_Component){_inherits(BarChart,_Component);
function BarChart(){_classCallCheck(this,BarChart);var _this=_possibleConstructorReturn(this,(BarChart.__proto__||Object.getPrototypeOf(BarChart)).call(this));

(0,_bindAll2.default)(_this,

'calculateGroupWidth',
'calculateMaxHeight',
'calculateMaxValue',
'yValues');return _this;

}_createClass(BarChart,[{key:'yValues',value:function yValues()

{
var maxValue=this.calculateMaxValue();
var yValues=[maxValue];
var yDiff=Math.round(maxValue/this.props.yValuesQty);
var value=maxValue-yDiff;
while(value>0&&yValues.length<this.props.yValuesQty){
yValues.push(value);
value=value-yDiff;
}

return yValues;
}},{key:'calculateMaxValue',value:function calculateMaxValue()

{
var maxValue=0;
this.props.bars.forEach(function(bar){
bar.values.forEach(function(value){
if(value>maxValue){
maxValue=value;
}
});
});

return maxValue;
}},{key:'calculateMaxHeight',value:function calculateMaxHeight()

{
var maxValue=this.calculateMaxValue();

return maxValue>this.props.height?this.props.height:maxValue;
}},{key:'calculateGroupWidth',value:function calculateGroupWidth()

{
return(this.props.width-this.props.barSpace*(this.props.bars.length+1))/this.props.bars.length;
}},{key:'xLabels',value:function xLabels(

showAllLabels){
var labels=this.props.bars.map(function(bar){return bar.label;});

if(showAllLabels){
return labels;
}

return labels.filter(function(label,i){return i%2===0;});
}},{key:'render',value:function render()

{var _this2=this;
var groupWidth=this.calculateGroupWidth();
var maxHeight=this.calculateMaxHeight();
var yValues=this.yValues();

var labelWidth=groupWidth;
var showAllLabels=true;

if(labelWidth<12){
labelWidth=groupWidth*2;
showAllLabels=false;
}

return(
_react2.default.createElement(_reactNative.View,null,
_react2.default.createElement(_reactNativeSvg2.default,{
height:this.props.height,
width:this.props.width,
viewBox:'0 0 '+this.props.width+' '+this.props.height},

this.props.bars.map(function(bar,i){
var barWidth=groupWidth/bar.values.length;

return(
_react2.default.createElement(_reactNativeSvg.G,{key:i},
bar.values.map(function(barValue,barIndex){
var barX=(groupWidth+_this2.props.barSpace)*i+_this2.props.barSpace+barWidth*barIndex;
var barY=_this2.props.height*barValue/maxHeight;

return(
_react2.default.createElement(_reactNativeSvg.Rect,{
key:i+'-'+barIndex,
height:-barY,
width:barWidth,
y:_this2.props.height,
x:barX,
fill:_this2.props.colors[barIndex]}));


})));


}),
_react2.default.createElement(_reactNativeSvg.G,null,
_react2.default.createElement(_reactNativeSvg.Line,{
stroke:'rgb(0, 0, 0)',
x1:'0',
x2:'0',
y1:'0',
y2:this.props.height})),



_react2.default.createElement(_reactNativeSvg.G,null,
_react2.default.createElement(_reactNativeSvg.Line,{
stroke:'rgb(0, 0, 0)',
x1:'0',
x2:this.props.width,
y1:this.props.height,
y2:this.props.height})),


_react2.default.createElement(_reactNative.View,{style:styles.yValuesContainer},
yValues.map(function(yValue,i){return(
_react2.default.createElement(_reactNative.Text,{
key:i,
style:[styles.yLabel,{
height:_this2.props.height/_this2.props.yValuesQty}]},


yValue));}))),




_react2.default.createElement(_reactNative.View,null,
this.props.showLabels&&
_react2.default.createElement(_reactNative.View,{style:styles.labelsContainer},
this.xLabels(showAllLabels).map(function(label,i){return(
_react2.default.createElement(_reactNative.Text,{
key:i,
style:[styles.label,{
width:labelWidth,
marginLeft:_this2.props.barSpace,
marginRight:showAllLabels?0:_this2.props.barSpace}]},


label));})),




this.props.legends.length>0&&
_react2.default.createElement(_reactNative.View,{style:styles.legendsContainer},
this.props.legends.map(function(legend,i){return(
_react2.default.createElement(_reactNative.View,{key:i,style:styles.legend},
_react2.default.createElement(_reactNative.View,{
style:[styles.legendIcon,{
backgroundColor:_this2.props.colors[i]}]}),


_react2.default.createElement(_reactNative.Text,{style:styles.legendText},legend)));})))));







}}]);return BarChart;}(_react.Component);


BarChart.propTypes={
bars:_react2.default.PropTypes.array.isRequired,
colors:_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string).isRequired,
height:_react2.default.PropTypes.number,
width:_react2.default.PropTypes.number,
showLabels:_react2.default.PropTypes.bool,
yValuesQty:_react2.default.PropTypes.number,
barSpace:_react2.default.PropTypes.number,
legends:_react2.default.PropTypes.arrayOf(_react2.default.PropTypes.string)};


BarChart.defaultProps={
height:200,
width:300,
showLabels:true,
yValuesQty:5,
barSpace:10,
legends:[]};exports.default=


BarChart;