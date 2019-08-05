import { api } from './api';
import { SummaryByProject } from './models';

export const client = (token: string, workspace: string, sinceDate: string, untilDate: string) => ({
  getSummaryGroupByClients: (): Promise<SummaryByProject[]> => api(token, workspace, sinceDate, untilDate).summaryByProjects
});
