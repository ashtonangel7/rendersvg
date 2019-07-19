import { functions } from "./functions.mjs";

const canvas = document.getElementById("canvas");
const vectorStore = [];
const data = {
    interval: 5, // millisecond
    velocity: new functions.Vector2(1, 1),
    xDirection: true,
    yDirection: true,
    canvasWidth: canvas.clientWidth,
    canvasHeight: canvas.clientHeight,
    circleVector: new functions.Vector2(100, 200),
    circleRadius: 10,
    rectangleHeight: 20,
    rectangleWidth: 40
};

const circle = functions.circle(data.circleVector.x)(data.circleVector.y)(data.circleRadius)("black")("red");
canvas.appendChild(circle);

vectorStore.push(new functions.Vector2(25, 45));
const rectangle = functions.rectangle(data.rectangleHeight)(data.rectangleWidth)(vectorStore[0].x)(vectorStore[0].y)("black")("blue");
canvas.appendChild(rectangle);

vectorStore.push(new functions.Vector2(200, 250));
const rectangle2 = functions.rectangle(data.rectangleHeight)(data.rectangleWidth)(vectorStore[1].x)(vectorStore[1].y)("black")("blue");
canvas.appendChild(rectangle2);

const checkCollisions = () => {
    if (data.circleVector.x >= data.canvasWidth - data.circleRadius)
        data.xDirection = false;
    if (data.circleVector.y >= data.canvasHeight - data.circleRadius)
        data.yDirection = false;
    if (data.circleVector.x <= data.circleRadius)
        data.xDirection = true;
    if (data.circleVector.y <= data.circleRadius)
        data.yDirection = true;

    for (const vector of vectorStore) {
        const centreDiffX = Math.abs((vector.x + (data.rectangleWidth / 2)) - data.circleVector.x);
        const xCollide = centreDiffX <= data.circleRadius + (data.rectangleWidth / 2);
        if (!xCollide) continue;
        const centreDiffY = Math.abs((vector.y + (data.rectangleHeight / 2)) - data.circleVector.y);
        const yCollide = centreDiffY <= data.circleRadius + (data.rectangleHeight / 2);
        if (!yCollide) continue;
        if (centreDiffX >= centreDiffY) data.xDirection = !data.xDirection;
        else data.yDirection = !data.yDirection;
    }

    data.xDirection ? data.circleVector.addX(data.velocity) : data.circleVector.subtractX(data.velocity);
    data.yDirection ? data.circleVector.addY(data.velocity) : data.circleVector.subtractY(data.velocity);
}

const mainLoop = () => {
    functions.moveBall(circle)(data.circleVector);
    checkCollisions();
}

const mainInterval = setInterval(mainLoop, data.interval);

