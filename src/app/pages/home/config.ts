import { IModalAlert } from 'src/app/common/components/material/modals/alert/interfaces';
import { ISlotItem } from './interfaces';

export const reels: ISlotItem[] = [
    {
        label: 'diamond',
        icon: 'diamond',
    },
    {
        label: 'bar',
        icon: 'local_bar',
    },
    {
        label: 'bunny',
        icon: 'cruelty_free',
    },
    {
        label: 'heart',
        icon: 'favorite',
    },
    {
        label: 'mood',
        icon: 'mood',
    },
];

export const readMe: IModalAlert = {
    title: 'Slot Machine Code Challange',
    body: [
        'Prize System: If each slot has a different symbol, the machine pays out half the current money in the machine.',
        'If two or more adjacent slots contain the same symbol, the machine pays out a prize of 5 times the cost of a single play',
        'If the machine does not have enough money to pay a prize, it should credit the player with a number of free plays equal to the difference between the full prize and the amount of money available (This does not affect a jackpot win).',
    ],
    footer: [],
    actions: [
        {
            isVisible: true,
            value: true,
            color: 'primary',
            label: 'Start play',
        },
    ],
};

export const jackPot: IModalAlert = {
    title: 'BingPot!',
    body: ['You did just empty our till...congrats!'],
    actions: [
        {
            isVisible: true,
            value: true,
            color: 'primary',
            label: 'Continue',
        },
    ],
};

export const halfPrize: IModalAlert = {
    title: 'Nice one!',
    body: [],
    actions: [
        {
            isVisible: true,
            value: true,
            color: 'primary',
            label: 'Continue',
        },
    ],
};
