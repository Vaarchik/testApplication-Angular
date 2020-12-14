export enum GAME_EVENT {
	NEW_ROUND = 'NEW_ROUND',
	GAME_FINISHED = 'GAME_FINISHED',
}

export enum CELL_STATUS {
	NOBODY = 'NOBODY',
	PC = 'PC',
	USER = 'USER',
}

export interface GAME_SCORE {
	userCount: number;
	pcCount: number;
	winner: CELL_STATUS.USER | CELL_STATUS.PC | null;
}
