import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import bindAll from 'lodash/bindAll';
import Svg, { G, Line, Rect } from 'react-native-svg';

const styles = StyleSheet.create({
  labelsContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  label: {
    fontSize: 7,
  },
  yLabel: {
    fontSize: 7,
    alignItems: 'flex-start',
    marginLeft: 3,
  },
  legendsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 15,
    flexWrap: 'wrap',
  },
  legendIcon: {
    width: 15,
    height: 15,
    borderRadius: 2,
    marginRight: 8,
  },
  legend: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  legendText: {
    fontSize: 12,
  },
});

class BarChart extends Component {
  constructor() {
    super();
    bindAll(
      this,
      'calculateGroupWidth',
      'calculateMaxHeight',
      'calculateMaxValue',
      'yValues'
    );
  }

  yValues() {
    const maxValue = this.calculateMaxValue();
    const yValues = [maxValue];
    const yDiff = Math.round(maxValue / this.props.yValuesQty);
    let value = maxValue - yDiff;
    while (value > 0 && yValues.length < this.props.yValuesQty) {
      yValues.push(value);
      value = value - yDiff;
    }

    return yValues;
  }

  calculateMaxValue() {
    let maxValue = 0;
    this.props.bars.forEach((bar) => {
      bar.values.forEach((value) => {
        if (value > maxValue) {
          maxValue = value;
        }
      });
    });

    return maxValue;
  }

  calculateMaxHeight() {
    const maxValue = this.calculateMaxValue();

    return maxValue > this.props.height ? this.props.height : maxValue;
  }

  calculateGroupWidth() {
    return (this.props.width - this.props.barSpace * (this.props.bars.length + 1)) / this.props.bars.length;
  }

  xLabels(showAllLabels) {
    const labels = this.props.bars.map((bar) => (bar.label));

    if (showAllLabels) {
      return labels;
    }

    return labels.filter((label, i) => (i % 2 === 0));
  }

  render() {
    const groupWidth = this.calculateGroupWidth();
    const maxHeight = this.calculateMaxHeight();
    const yValues = this.yValues();

    let labelWidth = groupWidth;
    let showAllLabels = true;

    if (labelWidth < 12) {
      labelWidth = groupWidth * 2;
      showAllLabels = false;
    }

    return (
      <View>
        <Svg
          height={this.props.height}
          width={this.props.width}
          viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
          {this.props.bars.map((bar, i) => {
            const barWidth = groupWidth / bar.values.length;

            return (
              <G key={i}>
                {bar.values.map((barValue, barIndex) => {
                  const barX = (groupWidth + this.props.barSpace) * i + this.props.barSpace + (barWidth * barIndex);
                  const barY = this.props.height * barValue / maxHeight;

                  return (
                    <Rect
                      key={`${i}-${barIndex}`}
                      height={-barY}
                      width={barWidth}
                      y={this.props.height}
                      x={barX}
                      fill={this.props.colors[barIndex]}
                    />
                  );
                })}
              </G>
            );
          })}
          <G>
            <Line
              stroke="rgb(0, 0, 0)"
              x1="0"
              x2="0"
              y1="0"
              y2={this.props.height}
            />
          </G>

          <G>
            <Line
              stroke="rgb(0, 0, 0)"
              x1="0"
              x2={this.props.width}
              y1={this.props.height}
              y2={this.props.height}
            />
          </G>
          <View style={styles.yValuesContainer}>
            {yValues.map((yValue, i) => (
              <Text
                key={i}
                style={[styles.yLabel, {
                  height: this.props.height / this.props.yValuesQty,
                }]}
              >
                {yValue}
              </Text>
            ))}
          </View>
        </Svg>
        <View>
          {this.props.showLabels &&
            <View style={styles.labelsContainer}>
              {this.xLabels(showAllLabels).map((label, i) => (
                <Text
                  key={i}
                  style={[styles.label, {
                    width: labelWidth,
                    marginLeft: this.props.barSpace,
                    marginRight: showAllLabels ? 0 : this.props.barSpace,
                  }]}
                >
                  {label}
                </Text>
              ))}
            </View>
          }
          {this.props.legends.length > 0 &&
            <View style={styles.legendsContainer}>
              {this.props.legends.map((legend, i) => (
                <View key={i} style={styles.legend}>
                  <View
                    style={[styles.legendIcon, {
                      backgroundColor: this.props.colors[i],
                    }]}
                  />
                  <Text style={styles.legendText}>{legend}</Text>
                </View>
              ))}
            </View>
          }
        </View>
      </View>
    );
  }
}

BarChart.propTypes = {
  bars: React.PropTypes.array.isRequired,
  colors: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
  height: React.PropTypes.number,
  width: React.PropTypes.number,
  showLabels: React.PropTypes.bool,
  yValuesQty: React.PropTypes.number,
  barSpace: React.PropTypes.number,
  legends: React.PropTypes.arrayOf(React.PropTypes.string),
};

BarChart.defaultProps = {
  height: 200,
  width: 300,
  showLabels: true,
  yValuesQty: 5,
  barSpace: 10,
  legends: [],
};

export default BarChart;
