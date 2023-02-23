import { Schema, model } from 'mongoose';

const UtmParametersSchema = new Schema({
    term: { type: String, required: false },
    source: { type: String, required: false },
    medium: { type: String, required: false },
    content: { type: String, required: false },
    campaign: { type: String, required: false },
});

const ViewportSchema = new Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
});

const LocationSchema = new Schema({
    country: { type: String, required: false },
    city: { type: String, required: false },
    lat: { type: Number, required: false },
    lon: { type: Number, required: false },
});

const ClickEventSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    path: { type: String, required: true },
    target: { type: String, required: true },
    dataTracker: { type: String, required: false },
});

const ViewportResizeEventSchema = new Schema({
    width: { type: Number, required: true },
    height: { type: Number, required: true },
});

const InputChangeEventSchema = new Schema({
    path: { type: String, required: true },
    target: { type: String, required: true },
    dataTracker: { type: String, required: false },
    value: { type: String, required: true },
    type: { type: String, enum: ['text'], required: true },
    id: { type: String, required: false },
    name: { type: String, required: false },
});

const ScrollEventSchema = new Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
});

const EventSchema = new Schema({
    createdAt: { type: Date, required: true },
    type: { type: String, enum: ['resize', 'scroll', 'click', 'double-click', 'input-change'], required: true },
    click: { type: ClickEventSchema, required: false },
    doubleClick: { type: ClickEventSchema, required: false },
    rightClick: { type: ClickEventSchema, required: false },
    viewportResize: { type: ViewportResizeEventSchema, required: false },
    inputChange: { type: InputChangeEventSchema, required: false },
    scroll: { type: ScrollEventSchema, required: false },
});

const SessionSchema = new Schema({
    browserId: { type: String, required: true },
    deviceType: { type: String, required: true },
    utmParameters: { type: UtmParametersSchema, required: false },
    operationSystem: { type: String, enum: ['ios', 'android', 'windows', 'macos', 'linux'], required: false },
    browser: { type: String, enum: ['chrome', 'firefox', 'safari', 'edge', 'opera'], required: false },
    viewport: { type: ViewportSchema, required: true },
    language: { type: String, required: true },
    ipAddress: { type: String, required: false },
    location: { type: LocationSchema, required: false },
    landingPage: { type: String, required: true},
    originPage: { type: String, required: false},
    domain: { type: String, required: true},
    events: { type: [EventSchema], required: true, default: [] },
    createdAt: { type: Date, required: true },
    finishedAt: { type: Date, required: true },
});

export const SessionModel = model('Session', SessionSchema);