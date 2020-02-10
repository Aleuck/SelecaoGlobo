import React from 'react';
import * as d3 from 'd3';
import { color } from 'd3';

class DonutChart extends React.Component {

  componentDidMount() {
    this.createDonutChart();
  }

  componentDidUpdate() {
    this.createDonutChart();
  }

  createDonutChart = () => {
    const {
      radius,
      width,
    } = this.props;
    const scale = d3.scaleLinear()
      .domain([0,100])
      .range([25,75]);

    const dataSum = this.props.data.reduce((a, b) => a + b);
    const data = this.props.data.map(value => ({
      value: scale((value / dataSum) * 100),
      name: `${((value / dataSum) * 100).toFixed(0)}%`,
    }));
    data.columns = ['name', 'value'];

    const arcs = d3.pie()
      .value(d => d.value)
      .sort(null)(data);


    const range = (data[0].value <= data[1].value) ? ["#ff9516", "#c6c6c6"] : ["#c6c6c6", "#ff9516"]
    const color = d3.scaleOrdinal()
      .domain(data)
      .range(range);


    const svg = d3.select(this.node)
        .attr('height', radius * 2)
        .attr('width', radius * 2)
      .append('g')
        .attr('transform', `translate(${radius},${radius})\nrotate(180)`);


    const arc = d3.arc()
      .innerRadius(radius)
      .outerRadius(radius - width);

    svg.selectAll('path')
      .data(arcs)
      .join('path')
        .attr('fill', d => {console.log(d); return color(d.data.value);})
        .attr('stroke', 'white')
        .attr('d', arc)
    svg.append('g')
      .attr("font-family", "Raleway, sans-serif")
      .attr("font-size", 20)
      .attr("text-anchor", "middle")
    .selectAll('text')
    .data(arcs)
    .join('text')
      .attr("transform", d => [
        `rotate(${180 * (d.index ? d.startAngle + 0.3 : d.endAngle - 0.3)/Math.PI})`,
      ])
      .call(text => text.append("tspan")
        .attr("y", `-${radius - 6 - width / 2}px`)
        .attr("fill", "#ffffff")
        .attr("style", "text-shadow: -1px 1px 1px rgba(0, 0, 0, 0.35);")
        .attr("font-weight", "bold")
        .text(d => d.data.name))
  };

  render() {
    const { radius } = this.props;
    return <svg
      ref={node => this.node = node}
      width={radius * 2} height={radius * 2}
    />
  }
}

export default DonutChart;
