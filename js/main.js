import { Canvas } from "./canvas.js";
import { Field, Game } from "./counter.js";
import { Settings } from "./settings.js";

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
const field = new Field()

settings.initSettings(canvasElement);
settings.events(canvasElement, canvas);

canvas.initGrid(parseInt(cellInput.value));
canvas.genCheck(generationSelect.value);
canvas.connectButtons(clearBtn, startBtn, stopBtn);

