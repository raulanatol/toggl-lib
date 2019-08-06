import { api } from './api';
import { SummaryByProject } from './models';

export const client = (token: string, workspace: string) => ({
  getSummaryGroupByClients: (sinceDate: string): Promise<SummaryByProject[]> => api(token, workspace).summaryByProjects(sinceDate)
});
