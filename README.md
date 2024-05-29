# Slot Machine Game

This repository contains the source code for a slot machine game built using Angular. The game leverages Angular's standalone components and signals for efficient state management and modular design.


## Features

- **Interactive Slot Machine**: Players can spin the slot machine to try their luck.
- **Player and Machine Wallets**: Track the coins of the player and the slot machine.
- **Free Plays**: Earn free plays based on game results.
- **Visual and Audio Effects**: Engaging animations and sound effects enhance the user experience.
- **Modular and Scalable**: Built with Angular's standalone components and signal-based state management.


## Components

### GameComponent

The `GameComponent` is the core component of the application, implemented as a standalone component. It handles the game logic, including spinning the slot machine, updating wallets, and managing the game state.

#### Key Angular Features

- **Standalone Component**: `GameComponent` is a standalone component, making it modular and easier to manage.
- **Signals**: The component uses Angular's signal-based state management for reactive and efficient state updates.

#### Key Properties

- `slots`: A signal representing the current state of the slot machine reels.
- `playerWallet`: A signal representing the player's coin balance.
- `slotMachineWallet`: A signal representing the slot machine's coin balance.
- `freePlays`: A signal representing the number of free plays available to the player.
- `isSpinning`: A signal indicating whether the slot machine is currently spinning.
- `isPlayerWinning`: A signal indicating if the player has won.
- `isClosed`: A signal for managing dialog state.

#### Key Methods

- `start()`: Initiates a spin of the slot machine.
- `startAndPlayAudio()`: Starts the spin and plays the slot machine sound.
- `slotMachineInit()`: Initializes the slot machine reels.
- `checkAdjacentSlotsWithSameColour()`: Checks for adjacent slots with the same color and awards prizes.
- `handleCount()`: Manages the cost of each spin and updates the wallets.
- `setPlayerReward(rewardType: number)`: Awards the player with the specified reward.
- `shuffle(array: any[])`: Shuffles an array using the Fisher-Yates algorithm.
- `spinAnimation()`: Handles the animation for spinning the slot machine.
- `openDialog(data: IModalAlert)`: Opens a modal dialog with the specified data.


## Game Mechanics

The game involves spinning the slot machine and trying to match symbols. Different outcomes result in different rewards:

- **Jackpot**: All symbols match, and the player wins all coins from the slot machine wallet.
- **Half Prize**: All symbols are unique, and the player wins half of the slot machine wallet.
- **Adjacent Slots**: Adjacent slots with the same symbol award five times the cost of a single play.


#### Usage

Once the application is running, you can interact with the slot machine through the web interface. Click the lever knob to spin the slot machine and see if you win!

## Interesting Techniques

### Signal-Based State Management

Angular's signal-based state management is used to efficiently manage and reactively update the state:

- Signals are used for properties like `slots`, `playerWallet`, `slotMachineWallet`, `freePlays`, `isSpinning`, `isPlayerWinning`, and `isClosed`.
- The use of `signal` ensures that state changes are automatically tracked and updated in the UI.


### Effects for State Reactions

Angular's `effect` is used to create side effects that react to state changes:

```typescript
effect(() => {
    if (!this.isSpinning() && this.isPlayerWinning()) {
        this.openDialog(this.modalPayload());
    }
});
```


