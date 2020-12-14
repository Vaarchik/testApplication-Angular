import {Injectable} from '@angular/core';
import {GAME_EVENT, GAME_SCORE, CELL_STATUS} from '../types/game';
import {Subject} from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class GameService {

	public gameMap: CELL_STATUS [] [];
	public drawingCell: { x: number; y: number; } = { x : 0, y : 0 };
	public gameScore: GAME_SCORE;
	public isStarted = false;
	private roundIntervalMS: number | undefined;
	private winCount: number = 0;

	public gameEvents$ = new Subject<GAME_EVENT>();

	private roundTimeoutID: number = 0;

	constructor() {
		this.gameMap = this.createNewGameMap(10, 10);  // 10 x 10 according to the technical task
		this.gameScore = {
			winner: null,
			userCount: 0,
			pcCount: 0,
		};
	}

	public createNewGame(options: { roundIntervalMS: number, xSize: number, ySize: number, winCount: number }) {
		this.gameMap = this.createNewGameMap(options.xSize, options.ySize);
		this.roundIntervalMS = options.roundIntervalMS;
		this.winCount = options.winCount;

		this.drawingCell = { x: 0, y: 0 };
		this.gameScore = {
			winner: null,
			userCount: 0,
			pcCount: 0,
		};

		this.isStarted = true;

		this.startNewRound();
	}

	private startNewRound() {
		this.calcNewRound(this.gameMap);

		this.gameEvents$.next(GAME_EVENT.NEW_ROUND);

		this.roundTimeoutID = setTimeout(() => {
			this.handlePlayerAction(this.drawingCell.x, this.drawingCell.y, CELL_STATUS.PC);
		}, this.roundIntervalMS);
	}

	private createNewGameMap(x: number, y: number): CELL_STATUS [] [] {
		const ar = [];

		for (let i = 0; i < x; i++) {
			ar.push(new Array(y).fill(CELL_STATUS.NOBODY));
		}

		return ar;
	}

	public handlePlayerAction(x: number, y: number, player: CELL_STATUS) {
		if (x !== this.drawingCell.x || y !== this.drawingCell.y) {
			return false;
		}

		clearTimeout(this.roundTimeoutID);

		this.gameMap[x][y] = player;

		this.updateScore(player);

		this.gameScore.winner = this.checkWinner(this.gameScore, this.winCount);

		if (this.gameScore.winner) {
			this.gameEvents$.next(GAME_EVENT.GAME_FINISHED);

			this.isStarted = false;

			return false;
		}

		this.startNewRound();

		return true;
	}

	private updateScore(player: CELL_STATUS) {
		if (player === CELL_STATUS.USER) {
			this.gameScore.userCount++;
		}
		if (player === CELL_STATUS.PC) {
			this.gameScore.pcCount++;
		}
	}


	private calcNewRound(gameMap: CELL_STATUS [] []) {
		const cellNum = gameMap.length * gameMap[0].length;
		const randomNum = Math.floor(Math.random() * cellNum) + 1;

		this.drawingCell = this.getDrawCell(randomNum, gameMap);
	}

	private getDrawCell(num: number, gameMap: CELL_STATUS [] []): { x: number, y: number } {
		let result;

		do {

			result = this.calcXY(num - 1, gameMap[0].length);
			num++;
			if (num >= (gameMap.length * gameMap[0].length)) {
				num = 0;
			}

		} while (gameMap[result.x][result.y] !== CELL_STATUS.NOBODY);

		return result;
	}

	private calcXY(num: number, colSize: number): { x: number, y: number } {
		const x = Math.trunc(num / colSize);
		const y = num - (colSize * x);

		return {x, y};
	}

	private checkWinner(gameScore: GAME_SCORE, winCount: number) {
		if (gameScore.userCount >= winCount) {
			return CELL_STATUS.USER;
		}

		if (gameScore.pcCount >= winCount) {
			return CELL_STATUS.PC;
		}

		return null;
	}
}
