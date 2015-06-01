'use strict';

const React = require('react');

const MapView = require('./mapview');
const transform = require('../lib/transform');

class MainComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.handleClick = this.handleClick.bind(this);
    this.fileSelected = this.fileSelected.bind(this);
    this.onNumberChanged = this.onNumberChanged.bind(this);

    this.state = {
      map: [],
      outX: 2048,
      outY: 2048,
      offsetX: 0,
      offsetY: 0
    };
  }

  onNumberChanged(evt){
    this.setState({
      [evt.target.name]: _.parseInt(evt.target.value)
    });
  }

  fileSelected(evt){
    const { offsetX, offsetY, outX, outY } = this.state;
    const files = evt.target.files;
    const self = this;
    _.forEach(files, function(file){
      console.log('file: ', file.name, file.size, file.type);
      var reader = new FileReader();
      reader.onload = function(){
        if(reader.readyState === 2){
          var newMap = transform.scaleMap(new Float32Array(reader.result), outX, outY, offsetX, offsetY);
          self.setState({
            map: newMap
          })
        }
      };
      reader.readAsArrayBuffer(file);
    });
  }

  handleClick(){
    console.log('clack');
  }

  render() {
    const { map, offsetX, offsetY } = this.state;
    return (
      <main>
        <MapView map={map} width={1024} height={1024} />
        <div className="file-control">
          <div className="file-input">
            <input type="file" id="upload" onChange={this.fileSelected} />
          </div>
          <div className="file-submit">
            <input type="text" name="offsetX" onChange={this.onNumberChanged} value={offsetX} />
            <input type="text" name="offsetY" onChange={this.onNumberChanged} value={offsetY} />
            <button onClick={this.handleClick}>Test</button>
          </div>
        </div>
      </main>
    );
  }
}

module.exports = MainComponent;