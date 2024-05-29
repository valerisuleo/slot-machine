/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    AfterViewInit,
    Component,
    effect,
    ElementRef,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    signal,
    ViewChild,
    ViewChildren,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { first, Subscription } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { halfPrize, jackPot, readMe, reels } from './config';
import { MatDialog } from '@angular/material/dialog';
import { AlertModalComponent } from '../../common/components/material/modals/alert/alert-modal.component';
import { IModalAlert } from 'src/app/common/components/material/modals/alert/interfaces';

@Component({
    selector: 'app-game',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule],
    templateUrl: './game.component.html',
    styleUrl: './game.component.scss',
})
export class GameComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChildren('slotMachine') slotMachines!: QueryList<ElementRef>;
    @ViewChild('slotAudio') slotAudio!: ElementRef<HTMLAudioElement>;

    public slots = signal([reels, reels, reels, reels]);
    public playerWallet = signal(500);
    public slotMachineWallet = signal(1500);
    public freePlays = signal(0);
    public isSpinning = signal(false);
    public isPlayerWinning = signal(false);
    public isClosed = signal(false);
    private row = signal<string[]>([]);
    private modalPayload = signal({} as IModalAlert);
    private costOfSinglePlay = 1;
    private spinningTime: any;
    private slotMachines$!: Subscription;

    constructor(private renderer: Renderer2, private dialog: MatDialog) {
        effect(() => {
            if (!this.isSpinning() && this.isPlayerWinning()) {
                this.openDialog(this.modalPayload());
            }
        });
    }

    public ngOnInit(): void {
        setTimeout(() => {
            this.openDialog(readMe);
        }, 1000);
    }

    public ngAfterViewInit(): void {
        this.slotMachines.changes.subscribe(() => this.spinAnimation());
    }

    public ngOnDestroy(): void {
        if (this.slotMachines$) {
            this.slotMachines$.unsubscribe();
        }
    }

    public start(): void {
        this.row.set([]);
        this.handleCount();
        this.slotMachineInit();

        this.spinningTime = setInterval(() => {
            this.spinAnimation();
        }, 200);

        this.isSpinning.update(() => true);

        setTimeout(() => {
            if (this.spinningTime) {
                clearInterval(this.spinningTime);
                this.spinningTime = null;
                this.isSpinning.update(() => false);
            }
        }, 1500);

        const result = [...new Set(this.row())];

        if (result.length === 1) {
            // console.log('you won!');
            this.playerWallet.update((prev) => prev + this.slotMachineWallet());
            this.slotMachineWallet.set(0);
            this.modalPayload.update(() => jackPot);
            this.isPlayerWinning.update(() => true);
        } else if (result.length === this.row().length) {
            const halfSlotWallet = Math.ceil(this.slotMachineWallet() / 2);
            this.setPlayerReward(halfSlotWallet);
            this.slotMachineWallet.update((prev) => prev - halfSlotWallet);
            // console.log('you won half money');
        } else {
            this.checkAdjacentSlotsWithSameColour();
        }
    }

    public startAndPlayAudio(): void {
        this.slotAudio.nativeElement.play();
    }

    private slotMachineInit(): void {
        this.slots.update((prevState) => {
            const newState = prevState.map((slot) => this.shuffle([...slot]));
            return newState;
        });

        this.row.update(() => {
            const newState = this.slots().map((slot) => slot[1].label);
            return newState;
        });
    }

    private checkAdjacentSlotsWithSameColour(): void {
        for (let i = 0; i < this.row().length; i++) {
            for (let j = i + 1; j < this.row().length; j++) {
                if (this.row()[i] === this.row()[j]) {
                    if (j === i + 1) {
                        // console.log('adjacent slots');
                        const fiveTimesReward = 5 * this.costOfSinglePlay;
                        this.setPlayerReward(fiveTimesReward);

                        if (this.slotMachineWallet() >= fiveTimesReward) {
                            this.slotMachineWallet() &&
                                this.slotMachineWallet.update((prev) => prev - fiveTimesReward);
                        }
                    } else {
                        this.isPlayerWinning.update(() => false);
                    }
                }
            }
        }
    }

    private handleCount(): void {
        if (this.freePlays()) {
            this.freePlays.update((prev) => prev - 1);
        } else if (this.playerWallet()) {
            this.playerWallet.update((prev) => prev - this.costOfSinglePlay);
            this.slotMachineWallet.update((prev) => prev + this.costOfSinglePlay);
        }
    }

    private setPlayerReward(rewardType: number) {
        if (this.slotMachineWallet() > rewardType) {
            this.playerWallet.update((prev) => prev + rewardType);
            const clone = { ...halfPrize };
            clone.body = [`You just won £ ${rewardType}!`];
            this.modalPayload.update(() => clone);
            this.isPlayerWinning.update(() => true);
        } else {
            const result = rewardType - this.slotMachineWallet();
            this.freePlays.update((prev) => prev + result);
        }
    }

    private shuffle(array: any[]) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }

        return array;
    }

    private spinAnimation(): void {
        this.slotMachines.forEach((slotMachine) => {
            const ul = slotMachine.nativeElement.querySelector('ul');
            const slotItems = Array.from(ul.children) as HTMLElement[];

            if (slotItems.length === 0) return;

            const itemHeight = slotItems[0].clientHeight;

            // Move to the end of the list
            this.renderer.setStyle(ul, 'transition', 'none');
            this.renderer.setStyle(
                ul,
                'transform',
                `translateY(-${itemHeight * slotItems.length}px)`
            );

            // Force reflow
            ul.offsetHeight;

            // Reset and animate from the top
            setTimeout(() => {
                this.renderer.setStyle(ul, 'transition', 'transform 0.2s linear');
                this.renderer.setStyle(ul, 'transform', `translateY(0)`);
            });
        });
    }

    private openDialog(data: IModalAlert): void {
        this.dialog
            .open(AlertModalComponent, {
                data,
            })
            .afterClosed()
            .pipe(first())
            .subscribe(() => {
                this.isClosed.set(true);
            });
    }
}
