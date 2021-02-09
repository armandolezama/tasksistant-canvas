const tasksistantCanvas = document.querySelector('tasksistant-canvas');
const figureComplementButtons = document.querySelectorAll('.figure-complement-button');
const figureButtons = document.querySelectorAll('.figure-button');
const stripesButtons = document.querySelectorAll('.stripe-button');

const figureComplements = {
  up: '',
  down: '',
  left: '',
  right: ''
};

const stripes = {
  up: false,
  down: false,
  left: false,
  right: false
};

const setFigure = e => {
  const button = e.currentTarget;
  tasksistantCanvas.figure = button.getAttribute('id');
};

const setFigureComplements = e => {
  const button = e.currentTarget;
  const complementData = button.getAttribute('id');
  const splitedData = complementData.split('-');
  if(splitedData[1] === 'delete'){
    figureComplements[splitedData[0]] = '';
  } else {
    figureComplements[splitedData[0]] = splitedData[1];
  };
  tasksistantCanvas.drawFigureComplements(figureComplements);
};

const setStripes = e => {
  const button = e.currentTarget;
  const complementData = button.getAttribute('id');
  const splitedData = complementData.split('-');
  if(stripes[splitedData[0]]) {
    stripes[splitedData[0]] = false;
  } else {
    stripes[splitedData[0]] = true;
  }
  tasksistantCanvas.drawStripes(stripes);
};

const addAllListeners = (setOfButtons, listener) => {
  for(const button of setOfButtons){
    button.addEventListener('click', listener);
  };
};

const loadFunctions = () => {
  addAllListeners(figureComplementButtons, setFigureComplements);
  addAllListeners(figureButtons, setFigure);
  addAllListeners(stripesButtons, setStripes);
};