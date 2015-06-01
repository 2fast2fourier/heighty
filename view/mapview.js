'use strict';

const _ = require('lodash');
const React = require('react');

class MapViewComponent extends React.Component {
  constructor(...args) {
    super(...args);
  }

  componentDidMount() {
    this.renderMap();
  }

  componentDidUpdate() {
    this.renderMap();
  }

  renderMap(){
    console.log('start renderMap');
    const { width, height, map } = this.props;
    const columns = Math.ceil(Math.sqrt(map.length));
    const scale = width / columns;
    const size = Math.max(Math.floor(width / columns), 1);

    const canvas = this.refs.mapview.getDOMNode();
    const context = canvas.getContext('2d');

    console.log(columns, size, scale);
    context.clearRect(0, 0, width, height);

    context.scale(scale, scale);

    var color;
    _.forEach(map, function(value, ix){
      color = Math.floor(value / 256);
      context.fillStyle = "rgb("+color+","+color+","+color+")";
      context.fillRect(Math.floor(ix % columns) * size, Math.floor(ix / columns) * size, size, size);
    });

    context.setTransform(1, 0, 0, 1, 0, 0);
    console.log('finish renderMap');
  }

  render() {
    return (
      <canvas id="mapview" ref="mapview" width={this.props.width} height={this.props.height} />
    );
  }
}

module.exports = MapViewComponent;