'use strict';

var Main = require('./view/main');
var React = require('react');

React.render(<Main />, document.getElementById('appmain'));

console.log('loaded');