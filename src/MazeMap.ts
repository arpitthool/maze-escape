import { Direction } from './Player.ts';

export default class MazeMap {
    private map: number[][];
    private tileSize: number;
    private ctx: CanvasRenderingContext2D;
    private mapString: string;
    private startX: number = 0;
    private startY: number = 0;
    private endX: number = 0;
    private endY: number = 0;

    constructor(tileSize: number, ctx: CanvasRenderingContext2D) {
        this.mapString = `┌────────────┐┌────────────┐
│············││············│
│·┌──┐·┌───┐·││·┌───┐·┌──┐·│
│.│  │·│   │·││·│   │·│  │○│
│·└──┘·└───┘·└┘·└───┘·└──┘·│
│··························│
│·┌──┐·┌┐·┌──────┐·┌┐·┌──┐·│
│·└──┘·││·└──┐┌──┘·││·└──┘·│
│······││····││····││······│
└────┐·│└──┐ ││ ┌──┘│·┌────┘
     │·│┌──┘ └┘ └──┐│·│
     │·││    B     ││·│
     │·││ ┌──==──┐ ││·│
─────┘·└┘ │      │ └┘·└─────
||    ·   │      │   ·     |
─────┐·┌┐ │      │ ┌┐·┌─────
     │·││ └──────┘ ││·│
     │·││          ││·│
     │·││ ┌──────┐ ││·│
┌────┘·└┘ └──┐┌──┘ └┘·└────┐
│············││············│
│·┌──┐·┌───┐·││·┌───┐·┌──┐·│
│·└─┐│·└───┘·└┘·└───┘·│┌─┘·│
│○··││·······X ·······││··E│
└─┐·││·┌┐·┌──────┐·┌┐·││·┌─┘
┌─┘·└┘·││·└──┐┌──┘·││·└┘·└─┐
│······││····││····││······│
│·┌────┘└──┐·││·┌──┘└────┐·│
│·└────────┘·└┘·└────────┘·│
│··························│
└──────────────────────────┘`;
        this.tileSize = tileSize;
        this.ctx = ctx;
        this.map = this.loadMap();
    }

    private loadMap() {
        let map: number[][] = [];
        // convert mapString to 2d array
        const rows = this.mapString.split('\n');
        for (let y = 0; y < rows.length; y++) {
            let line = [];
            for (let x = 0; x < rows[y].length; x++) {
                const char = rows[y][x];
                if (char === '○') {
                    line.push(2); // Path marker
                } else if (char === '·') {
                    line.push(0); // Empty path
                } else if (char === '┌' || char === '┐' || char === '┘' || char === '└' || char === '│' || char === '─' || char === '=') {
                    line.push(1); // Wall
                } else if (char === 'X') {
                    this.startX = x * this.tileSize + this.tileSize / 2;
                    this.startY = y * this.tileSize;
                    line.push(0); // Start position
                } else if (char === 'E') {
                    this.endX = x * this.tileSize + this.tileSize / 2;
                    this.endY = y * this.tileSize;
                    line.push(3); // End position
                } else {
                    line.push(0);
                }
            }
            map.push(line); 
        }
        // If no end position was found, set it to the bottom right corner
        if (this.endX === 0 && this.endY === 0) {
            const lastRow = map.length - 1;
            const lastCol = map[0].length - 1;
            // Find a valid end position (not a wall)
            for (let y = lastRow; y >= 0; y--) {
                for (let x = lastCol; x >= 0; x--) {
                    if (map[y][x] === 0 || map[y][x] === 2) {
                        this.endX = x * this.tileSize + this.tileSize / 2;
                        this.endY = y * this.tileSize;
                        map[y][x] = 3;
                        break;
                    }
                }
                if (this.endX !== 0 || this.endY !== 0) break;
            }
        }
        return map;
    }

    getStartPosition() {
        return { x: this.startX, y: this.startY };
    }

    getEndPosition() {
        return { x: this.endX, y: this.endY };
    }

    setCanvasSize() {
        this.ctx.canvas.width = this.map[0].length * this.tileSize;
        this.ctx.canvas.height = this.map.length * this.tileSize;
    }

    draw() {
        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                const tile = this.map[y][x];
                switch (tile) {
                    case 0:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        break;
                    case 1:
                        this.ctx.fillStyle = '#1a1a2e';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        break;
                    case 2:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        // Draw a small marker
                        this.ctx.fillStyle = '#444';
                        this.ctx.fillRect(x * this.tileSize + this.tileSize / 3, y * this.tileSize + this.tileSize / 3, this.tileSize / 3, this.tileSize / 3);
                        break;
                    case 3:
                        // End position - draw with a different color
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        // Draw end marker
                        this.ctx.fillStyle = '#ff6b6b';
                        this.ctx.beginPath();
                        this.ctx.arc(x * this.tileSize + this.tileSize / 2, y * this.tileSize + this.tileSize / 2, this.tileSize / 3, 0, 2 * Math.PI);
                        this.ctx.fill();
                        break;
                    default:
                        this.ctx.fillStyle = 'black';
                        this.ctx.fillRect(x * this.tileSize, y * this.tileSize, this.tileSize, this.tileSize);
                        break;
                }
            }
        }
    }

    wallCollision(col: number, row: number, direction: Direction) {
        if(direction === Direction.UP) {
            return this.map[row - 1] && this.map[row - 1][col] === 1;
        } else if(direction === Direction.DOWN) {
            return this.map[row + 1] && this.map[row + 1][col] === 1;
        } else if(direction === Direction.LEFT) {
            return this.map[row] && this.map[row][col - 1] === 1;
        } else if(direction === Direction.RIGHT) {
            return this.map[row] && this.map[row][col + 1] === 1;
        }
        return false;
    }

    getTile(col: number, row: number) {
        if(row < 0 || col < 0 || row >= this.map.length || col >= this.map[0].length) {
            return -1;
        }
        return this.map[row][col];
    }

    isEndPosition(col: number, row: number): boolean {
        if(row < 0 || col < 0 || row >= this.map.length || col >= this.map[0].length) {
            return false;
        }
        return this.map[row][col] === 3;
    }
}

