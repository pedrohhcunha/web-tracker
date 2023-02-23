export interface InputChangeEvent {
    path: string;
    target: string;
    dataTracker?: string;
    value: string;
    type: 'text';
    id?: string;
    name?: string;
}