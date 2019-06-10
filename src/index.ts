import { api } from './api';
import { SummaryByProject } from './models';

export const client = (token: string, workspace: string) => ({
  getSummaryGroupByClients: (): Promise<SummaryByProject[]> => api(token, workspace).summaryByProjects
});
