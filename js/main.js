import { Canvas } from "./canvas.js";
import { Settings } from "./settings.js";

const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const cellInput = document.querySelector('#size');

const canvasElement = document.querySelector('canvas');

const canvas = new Canvas(canvasElement);
const settings = new Settings(widthInput, heightInput, cellInput);

settings.initSettings(canvasElement);
settings.events(canvasElement, canvas);

canvas.initGrid(parseInt(cellInput.value))