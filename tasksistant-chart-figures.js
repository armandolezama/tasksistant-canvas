
const circleFunction = (context, width, height) => {
  const xAxisStartPoint = width/2;
  const yAxisStartPoint = height/2;
  const radius = (height/2) - 1
  context.beginPath();
  context.arc(xAxisStartPoint, yAxisStartPoint, radius, 0, Math.PI * 2, true);
  context.stroke();
};

const ovalFunction = (context, width, height) => {
  const xAxisStartPoint = width/2;
  const yAxisStartPoint = height/2;
  const radiusX = width * .40;
  const radiusY = height/4;
  context.beginPath();
  context.ellipse(xAxisStartPoint, yAxisStartPoint, radiusX, radiusY, Math.PI, 0, 2 * Math.PI);
  context.stroke();
}

export default new Map([
  ['circle', circleFunction],
  ['oval', ovalFunction]
]);