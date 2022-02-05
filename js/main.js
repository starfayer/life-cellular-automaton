import '../scss/style.scss' 
import '../index.html' 
import { Canvas } from './canvas';
import { Settings } from './settings';


const widthInput = document.querySelector('#width');
const heightInput = document.querySelector('#height');
const cellInput = document.querySelector('#size');
const generationSelect = document.querySelector('#select');

const clearBtn = document.querySelector('#clear-btn');
const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');

const canvasElement = document.querySelector('canvas');

const canvas = new Canvas(canvasElement);
const settings = new Settings(widthInput, heightInput, cellInput, generationSelect);

settings.initSettings(canvasElement);
settings.events(canvasElement, canvas);

canvas.initGrid(parseInt(cellInput.value, 10));
canvas.genCheck(generationSelect.value);
canvas.connectButtons(clearBtn, startBtn, stopBtn);