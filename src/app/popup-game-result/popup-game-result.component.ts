import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {GameService} from '../common/service/game.service';
import {CELL_STATUS} from '../common/types/game';

@Component({
	selector: 'app-popup-game-result',
	templateUrl: './popup-game-result.component.html',
	styleUrls: ['./popup-game-result.component.css']
})
export class PopupGameResultComponent implements OnInit {

	public CELL_STATUS = CELL_STATUS;

	@Output() close = new EventEmitter<void>();

	constructor(public gameService: GameService) { }

	ngOnInit() {
	}

}
