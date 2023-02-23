import {DeviceType} from "./DeviceType";
import {UtmParameters} from "./UtmParameters";
import {OperationSystem} from "./OperationSystem";
import {Browser} from "./Browser";
import {Viewport} from "./Viewport";
import {Event} from "./Event";
import {Location} from "./Location";
export interface Session {
    id: string;
    browserId: string;
    deviceType: DeviceType;
    utmParameters?: UtmParameters;
    operationSystem?: OperationSystem;
    browser?: Browser;
    viewport: Viewport;
    language: string;
    ipAddress?: string;
    location?: Location;
    events: Event[];
    createdAt: Date;
    finishedAt?: Date;
}