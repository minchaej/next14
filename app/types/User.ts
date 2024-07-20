export enum Status {
    PENDING = 'PENDING',
    REACHED_OUT = 'REACHED_OUT'
}
  
export interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    linkedin: string;
    visasInterested: string;
    resume: string;
    openInput: string;
    status: Status; 
}