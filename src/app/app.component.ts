import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { GameComponent } from './pages/home/game.component';

@Component({
    standalone: true,
    imports: [GameComponent, RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent {
    title = 'war-game';
}
