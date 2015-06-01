'use strict';

module.exports = {
  scaleMap: function(data, outputX, outputY, offsetX, offsetY){
    const sizeX = Math.ceil(Math.sqrt(data.length));
    console.log(data.length, outputX, outputY, offsetX, offsetY, sizeX);
    let max = Number.MIN_VALUE;
    let min = Number.MAX_VALUE;

    _.forEach(data, function(value){
      if(value > max){
        max = value;
      }
      if(value < min){
        min = value;
      }
    });
    var scale = (max - min) / 65535;
    console.log('max/min:', max, min, scale);

    console.log('creating scaled map...');
    var scaledMap = new Uint16Array(outputX*outputY);
    console.log('map created! calculating scaled data');

    var ix, iy;
    for(iy = 0; iy<outputY; iy++){
      for(ix = 0; ix<outputX; ix++){
        scaledMap[iy*outputX+ix] = Math.floor((data[(iy+offsetY)*sizeX+ix+offsetX] - min) / scale);
      }
    }
    console.log('scaled!');
    return scaledMap;
  }
};