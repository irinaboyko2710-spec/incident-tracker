export interface IncidentDTO {
    readonly id?: number; 
    date: string;
    tag: string;
    severity: 'Low' | 'Medium' | 'High' | 'Critical';
    comments: string;
    user_id: number;
    user_name?: string;
    reporter?: string; 
}

export interface ApiError {
    status: number;
    title: string;
    detail: string;
    message?: string; 
}