import React from "react";
import ReactDOM from "react-dom";
import {App} from "./App";
import "./App.css";
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import '@popperjs/core/dist/umd/popper.min';

window.jQuery = $;
window.$ = $;
global.jQuery = $;

ReactDOM.render(<App />, document.getElementById('app'));
