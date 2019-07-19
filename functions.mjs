const createElement = (tag) => {
    return document.createElementNS('http://www.w3.org/2000/svg', tag);
}

const circle = cx => cy => r => stroke => fill => {
    const element = createElement("circle");
    setAttribute(element)("cx")(cx);
    setAttribute(element)("cy")(cy);
    setAttribute(element)("r")(r);
    setAttribute(element)("stroke")(stroke);
    setAttribute(element)("fill")(fill);
    return element;
}

const rectangle = height => width => x => y => stroke => fill => {
    const element = createElement("rect");
    setAttribute(element)("height")(height);
    setAttribute(element)("width")(width);
    setAttribute(element)("stroke")(stroke);
    setAttribute(element)("fill")(fill);
    setAttribute(element)("x")(x);
    setAttribute(element)("y")(y);
    return element;
}

const setAttribute = element => attribute => value  => {
    element.setAttribute(attribute, value);
    return element;
}

const moveBall = element => vector => {
   setAttribute(element)("cx")(vector.x);
   setAttribute(element)("cy")(vector.y);
   return element; 
}

class Vector2 {
    x;
    y;

    constructor(x,y) {
        this.x = x;
        this.y = y;
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
    Vector2
};