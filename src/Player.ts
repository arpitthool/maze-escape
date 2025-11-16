import MazeMap from './MazeMap.ts';

export enum Direction {
    UP = 'UP',
    DOWN = 'DOWN',
    LEFT = 'LEFT',
    RIGHT = 'RIGHT',
}

export default class Player {
    private x: number;
    private y: number;
    private speed: number;
    private direction: Direction;
    private requestedDirection: Direction;
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;
    private mazeMap: MazeMap;

    constructor(x: number, y: number, tileSize: number, ctx: CanvasRenderingContext2D, mazeMap: MazeMap) {
        this.x = x;
        this.y = y;
        this.speed = 2;
        this.ctx = ctx;
        this.tileSize = tileSize;
        this.direction = Direction.RIGHT;
        this.requestedDirection = Direction.RIGHT;
        this.mazeMap = mazeMap;
    }

    draw() {
        // draw a circle and fill it with green (player color)
        this.ctx.beginPath();
        this.ctx.arc(this.x + this.tileSize / 2, this.y + this.tileSize / 2, this.tileSize / 2, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#00ff00';
        this.ctx.fill();
    }

    move() {
        const col = this.x / this.tileSize;
        const row = this.y / this.tileSize;

        if(this.requestedDirection !== this.direction) {
            if((this.direction === Direction.DOWN && this.requestedDirection === Direction.UP) ||
            (this.direction === Direction.UP && this.requestedDirection === Direction.DOWN) || 
            (this.direction === Direction.RIGHT && this.requestedDirection === Direction.LEFT) ||
            (this.direction === Direction.LEFT && this.requestedDirection === Direction.RIGHT)){
                this.direction = this.requestedDirection;
            } else if(Number.isInteger(col) && Number.isInteger(row) && !this.mazeMap.wallCollision(col, row, this.requestedDirection)) {
                this.direction = this.requestedDirection;
            }
        }

        if (this.direction) {
            if(!(Number.isInteger(col) && Number.isInteger(row) && this.mazeMap.wallCollision(col, row, this.direction))) {
                if (this.direction === Direction.UP) {
                    this.y -= this.speed;
                } else if (this.direction === Direction.DOWN) {
                    this.y += this.speed;
                } else if (this.direction === Direction.LEFT) {
                    this.x -= this.speed;
                } else if (this.direction === Direction.RIGHT) {
                    this.x += this.speed;
                }
            }
        } 
    }

    changeDirection(direction: Direction) {
        this.requestedDirection = direction;
    }

    checkWinCondition(): boolean {
        // Check if player is close enough to the end position
        const row = Math.floor(this.y / this.tileSize);
        const col = Math.floor(this.x / this.tileSize);
        
        // Check current tile and adjacent tiles
        if (this.mazeMap.isEndPosition(col, row)) return true;
        if (this.mazeMap.isEndPosition(col + 1, row)) return true;
        if (this.mazeMap.isEndPosition(col - 1, row)) return true;
        if (this.mazeMap.isEndPosition(col, row + 1)) return true;
        if (this.mazeMap.isEndPosition(col, row - 1)) return true;
        
        return false;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}

