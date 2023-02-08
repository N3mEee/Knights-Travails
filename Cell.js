export default class Cell {
    constructor(x, y, dis = 0, previous = null) {
        this.x = x;
        this.y = y;
        this.dis = dis;
        this.previous = previous;
    }
}
