
export interface IModalAlert {
    title: string;
    body: string[];
    footer?: string[];
    actions: IAction[];
}
interface IAction {
    isVisible: boolean;
    value: boolean;
    color?: string;
    label: string;
}
