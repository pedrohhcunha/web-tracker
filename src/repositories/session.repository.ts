import {Session} from "../interfaces/Session";
import {randomUUID} from "crypto";
import {SessionModel} from "../models/session.model";

interface createSessionProps {
    id: Session["id"];
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

const sessionRepository: Session[] = [];

export async function createSession(newSession: createSessionProps): Promise<Session> {
    const sessionsFromBrowserId = newSession.browserId
        ? await findSessionByBrowserId(newSession.browserId)
        : undefined;

    const session: Session = {
        ...newSession,
        browserId: sessionsFromBrowserId && newSession.browserId
            ? newSession.browserId
            : randomUUID(),
        createdAt: new Date(),
        events: [],
    };

    sessionRepository.push(session);

    return session;
}

export async function findSessionByBrowserId(browserId: string): Promise<Session[]> {
    return sessionRepository.filter(session => session.browserId === browserId);
}

export async function findSessionById(id: string): Promise<Session | undefined> {
    return sessionRepository.find(session => session.id === id);
}

export async function addEventsToSession(sessionId: string, events: Session["events"]): Promise<void> {
    const session = await findSessionById(sessionId);

    if (!session) {
        throw new Error(`Session with id ${sessionId} not found`);
    }

    session.events.push(...events);
}

export async function finishSession(sessionId: string): Promise<void> {
    const session = await findSessionById(sessionId);

    if (!session) {
        throw new Error(`Session with id ${sessionId} not found`);
    }

    session.finishedAt = new Date();
    console.log(`Session ${sessionId} finished`);

    await saveSessionOnDatabase(session);
}

export async function saveSessionOnDatabase(session: Session): Promise<void> {
    try {
        await SessionModel.create(session);
        console.log(`Session ${session.id} saved on database`);
    }
    catch (err) {
        console.error(err);
    }
}