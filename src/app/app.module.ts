import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GameScreenComponent } from './game-screen/game-screen.component';
import { PopupGameResultComponent } from './popup-game-result/popup-game-result.component';
import { FormsModule } from '@angular/forms';
import { ScoreComponent } from './score/score.component';

@NgModule({
	declarations: [
		AppComponent,
		GameScreenComponent,
		PopupGameResultComponent,
		ScoreComponent
	],
	imports: [
		BrowserModule,
		FormsModule
	],
	providers: [],
	bootstrap: [
		AppComponent
	]
})
export class AppModule { }
