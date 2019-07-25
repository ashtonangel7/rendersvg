const createElement = (tag) => {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

const circle = (cx, cy, r, stroke, fill) => {
    const element = createElement("circle");
    setAttribute(element)("cx")(cx);
    setAttribute(element)("cy")(cy);
    setAttribute(element)("r")(r);
    setAttribute(element)("stroke")(stroke);
    setAttribute(element)("fill")(fill);
    element.style.willChange = "transform";
    return element;
}

const rectangle = (height, width, x, y, stroke, fill, id) => {
    const element = createElement("rect");
    setAttribute(element)("height")(height);
    setAttribute(element)("width")(width);
    setAttribute(element)("stroke")(stroke);
    setAttribute(element)("fill")(fill);
    setAttribute(element)("x")(x);
    setAttribute(element)("y")(y);
    setAttribute(element)("id")(id);
    element.style.willChange = "transform";
    return element;
}

const setAttribute = element => attribute => value => {
    element.setAttribute(attribute, value);
    return element;
}

const moveBall = element => vector => {
    element.style.transform = `translate(${vector.x}px,${vector.y}px)`;
    return element;
}

const moveRectangle = element => vector => {
    element.style.transform = `translate(${vector.x}px,${vector.y}px)`;
    return element;
}

class Vector2 {
    x;
    y;
    id;

    constructor(x, y, id) {
        this.x = x;
        this.y = y;
        this.id = id;
    }

    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
    }
    addX(vector) {
        this.x += vector.x;
    }
    subtractX(vector) {
        this.x -= vector.x;
    }
    addY(vector) {
        this.y += vector.y;
    }
    subtractY(vector) {
        this.y -= vector.y;
    }
}

export const functions = {
    setAttribute,
    createElement,
    circle,
    rectangle,
    moveBall,
    moveRectangle,
    Vector2
};