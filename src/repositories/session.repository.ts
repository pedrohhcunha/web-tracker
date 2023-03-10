import {Session} from "../interfaces/Session";
import {randomUUID} from "crypto";
import {SessionModel} from "../models/session.model";

interface createSessionProps {
    socketId: Session["socketId"];
    browserId?: Session["browserId"];
    deviceType: Session["deviceType"];
    utmParameters: Session["utmParameters"];
    operationSystem?: Session["operationSystem"];
    browser?: Session["browser"];
    viewport: Session["viewport"];
    language: Session["language"];
    location?: Session["location"];
    ipAddress?: Session["ipAddress"];
    landingPage: Session["landingPage"];
    originPage?: Session["originPage"];
    domain: Session["domain"];
}

export async function createSession(newSession: createSessionProps): Promise<Session> {
    const sessionsFromBrowserId = newSession.browserId
        ? await SessionModel.find({browserId: newSession.browserId})
        : undefined;
    const session: Session = {
        ...newSession,
        browserId: sessionsFromBrowserId && newSession.browserId
            ? newSession.browserId
            : randomUUID(),
        createdAt: new Date(),
        events: [],
    };
    await SessionModel.create(session);

    return session;
}

export async function addEventsToSession(sessionId: string, events: Session["events"]): Promise<void> {
    try {
        await SessionModel.updateOne({id: sessionId}, {$push: {events: {$each: events}}});
    } catch (err) {
        console.error(err);
    }
}

export async function finishSession(sessionId: string): Promise<void> {
    try {
        await SessionModel.updateOne({id: sessionId}, {finishedAt: new Date()});
    } catch (err) {
        console.error(err);
    }
}