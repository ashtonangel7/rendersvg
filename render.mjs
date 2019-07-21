import { functions } from "./functions.mjs";

const canvas = document.getElementById("canvas");
const addRectangle = document.getElementById("addRectangle");

const addRectangleFn = () => {
    const x = Math.floor((Math.random() * canvas.clientWidth) + 1);
    const y = Math.floor((Math.random() * canvas.clientHeight) + 1);
    const newId = vectorStore.length;
    vectorStore.push(new functions.Vector2(x, y, newId));
    const rectangle = functions.rectangle(data.rectangleHeight)(data.rectangleWidth)(x)(y)("black")("blue")(newId);
    canvas.appendChild(rectangle);
}

addRectangle.onclick = addRectangleFn;

const onMouseDownFn = (event) => {
    data.dragRect = event.path[0];
    canvas.onmousemove = onMouseMoveFn;
}

const onMouseMoveFn = (event) => {
    const vectorStoreItem = vectorStore.filter(o => o.id == data.dragRect.id);
    const moveVector = new functions.Vector2(event.clientX, event.clientY);
    functions.moveRectangle(data.dragRect)(moveVector);
    vectorStoreItem[0].x = moveVector.x;
    vectorStoreItem[0].y = moveVector.y;
}

const onMouseUpFn = () => {
    data.dragRect = null;
    canvas.onmousemove = null;
}

canvas.onmousedown = onMouseDownFn;
canvas.onmouseup = onMouseUpFn;

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

let vectorId = vectorStore.length;
vectorStore.push(new functions.Vector2(25, 45, vectorId));
const rectangle = functions.rectangle(data.rectangleHeight)(data.rectangleWidth)(vectorStore[0].x)(vectorStore[0].y)("black")("blue")(vectorId);
canvas.appendChild(rectangle);

vectorId = vectorStore.length;
vectorStore.push(new functions.Vector2(200, 250, vectorId));
const rectangle2 = functions.rectangle(data.rectangleHeight)(data.rectangleWidth)(vectorStore[1].x)(vectorStore[1].y)("black")("blue")(vectorId);
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
        const centreDiffX = (vector.x + (data.rectangleWidth / 2)) - data.circleVector.x;
        const centreDiffXAbs = Math.abs(centreDiffX);
        const expectedX = data.circleRadius + (data.rectangleWidth / 2);
        const xCollide = centreDiffXAbs <= expectedX;
        if (!xCollide) continue;
        const centreDiffY = (vector.y + (data.rectangleHeight / 2)) - data.circleVector.y;
        const centreDiffYAbs = Math.abs(centreDiffY);
        const expectedY = data.circleRadius + (data.rectangleHeight / 2);
        const yCollide = centreDiffYAbs <= expectedY;
        if (!yCollide) continue;

        const xDiff = expectedX - centreDiffXAbs;
        const yDiff = expectedY - centreDiffYAbs;

        if (xDiff < yDiff) return { axis: "x", centreDiffX };
        return { axis: "y", centreDiffY };
    }

    return null;
}

const mainLoop = () => {
    functions.moveBall(circle)(data.circleVector);
    const collisionData = checkCollisions();

    if (collisionData != null && collisionData.axis === "x") {
        data.xDirection = collisionData.centreDiffX < 0 ? true : false;
    }
    if (collisionData != null && collisionData.axis === "y") {
        data.yDirection = collisionData.centreDiffY < 0 ? true : false;
    }
    data.xDirection ? data.circleVector.addX(data.velocity) : data.circleVector.subtractX(data.velocity);
    data.yDirection ? data.circleVector.addY(data.velocity) : data.circleVector.subtractY(data.velocity);
}

const mainInterval = setInterval(mainLoop, data.interval);

