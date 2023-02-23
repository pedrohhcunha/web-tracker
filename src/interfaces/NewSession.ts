import {Session} from "./Session";

export interface NewSession {
    browserId?: Session["browserId"];
    deviceType: Session["deviceType"];
    utmParameters: Session["utmParameters"];
    operationSystem?: Session["operationSystem"];
    browser?: Session["browser"];
    viewport: Session["viewport"];
    language: Session["language"];
    ipAddress: Session["ipAddress"];
    location: Session["location"];
    landingPage: Session["landingPage"];
    originPage?: Session["originPage"];
    domain: Session["domain"];
}