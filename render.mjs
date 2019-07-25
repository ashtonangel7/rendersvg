import { functions } from "./functions.mjs";

const canvas = document.getElementById("canvas");
const addRectangle = document.getElementById("addRectangle");

const addRectangleFn = () => {
    const newId = vectorStore.length;
    vectorStore.push(new functions.Vector2(0, 0, newId));
    const rectangle = functions.rectangle(data.rectangleHeight, data.rectangleWidth, 0, 0, "black", "blue", newId);
    canvas.appendChild(rectangle);
}

addRectangle.onclick = addRectangleFn;

const onMouseDownFn = (event) => {
    const element = event.path[0];
    if (element.nodeName !== "rect") return;
    data.dragRect = event.path[0];
    data.dragRectId = data.dragRect.id;
    canvas.onmousemove = onMouseMoveFn;
}

const onMouseMoveFn = (event) => {
    const vectorStoreItem = vectorStore.filter(o => o.id == data.dragRectId);
    const moveVector = new functions.Vector2(event.clientX, event.clientY);
    functions.moveRectangle(data.dragRect)(moveVector);
    vectorStoreItem[0].x = moveVector.x;
    vectorStoreItem[0].y = moveVector.y;
}

const onMouseUpFn = () => {
    data.dragRect = null;
    data.dragRectId = null;
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
    circleVector: new functions.Vector2(0, 0),
    circleRadius: 10,
    rectangleHeight: 20,
    rectangleWidth: 40
};

const circle = functions.circle(data.circleVector.x, data.circleVector.y, data.circleRadius, "black", "red");
canvas.appendChild(circle);

const vectorId = vectorStore.length;
vectorStore.push(new functions.Vector2(0, 0, vectorId));
const rectangle = functions.rectangle(data.rectangleHeight, data.rectangleWidth,
    vectorStore[0].x, vectorStore[0].y, "black", "blue", vectorId);
canvas.appendChild(rectangle);

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

