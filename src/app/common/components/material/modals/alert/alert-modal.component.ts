/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { IModalAlert } from './interfaces';

@Component({
    selector: 'alert-modal',
    standalone: true,
    imports: [CommonModule, MatDialogModule, MatButtonModule, MatButton],
    templateUrl: './alert-modal.component.html',
    styleUrl: './alert-modal.component.scss',
})
export class AlertModalComponent {
    public props = {} as IModalAlert;
    constructor(@Inject(MAT_DIALOG_DATA) data: IModalAlert) {
        this.props = data;
    }
}
