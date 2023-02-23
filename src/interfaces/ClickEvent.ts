export interface ClickEvent {
    x: number;
    y: number;
    path: string; // tag.class#id>tag.class#id
    target: string; // tag.class#id
    dataTracker?: string; // data-tracker attribute
}