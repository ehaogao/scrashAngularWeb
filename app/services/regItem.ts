import { Image } from './image';

export class RegItem {
    id: number;
    team: string;
    totalCase: number;
    passedCase: number;
    failedCase: number;
    comments: string;
    status: number;
    duration: string;
    exceptionTestScript: number;
    endDate: string;
    startDate: string;
    newIssue: string;
    jobLink: string;
    regType: string;
    featureArea: string;
    featureName: string;
    utb: string;
    jobStartPlan: string;
    targetTotalTC: number;
    image: Image;
}
