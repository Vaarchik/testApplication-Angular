import {Component, OnInit} from '@angular/core';
import {GameService} from '../common/service/game.service';
import {GAME_EVENT, CELL_STATUS} from '../common/types/game';

@Component({
	selector: 'app-game-screen',
	templateUrl: './game-screen.component.html',
	styleUrls: ['./game-screen.component.css']
})
export class GameScreenComponent implements OnInit {

	public CELL_STATUS = CELL_STATUS;
	public isShowPopup = false;
	public isStarted = false;
	public roundIntervalInput: any;
	public roundRows = 10;
	public roundCells = 10;
	public cellWidth = 80;


	constructor(public gameService: GameService) {
	}

	ngOnInit() {
		this.gameService.gameEvents$.subscribe((e: GAME_EVENT) => {
			if (e === GAME_EVENT.GAME_FINISHED) {
				this.isShowPopup = true;
			}
		});
	}


	startNewGame() {
		let winCount = this.roundRows * this.roundCells / 10;

		const options = {
			roundIntervalMS: parseFloat(this.roundIntervalInput),
			xSize: this.roundRows,
			ySize: this.roundCells,
			winCount: winCount
		};

		this.isStarted = true;

		this.cellWidth = ( (800 - this.roundCells * 2 * 5) / Math.max(this.roundRows, this.roundCells) );

		this.gameService.createNewGame(options);
	}

	closePopup() {
		this.isShowPopup = false;
	}
}
