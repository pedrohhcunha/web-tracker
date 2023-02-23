import {EventType} from "./EventType";
import {ClickEvent} from "./ClickEvent";
import {ViewportResizeEvent} from "./ViewportResizeEvent";
import {InputChangeEvent} from "./InputChangeEvent";
import {ScrollEvent} from "./ScrollEvent";

export interface Event {
    type: EventType;
    createdAt: Date;
    click?: ClickEvent;
    viewportResize?: ViewportResizeEvent;
    doubleCLick?: ClickEvent;
    rightClick?: ClickEvent;
    inputChange?: InputChangeEvent;
    scroll?: ScrollEvent;
}