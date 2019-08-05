import axios, { AxiosRequestConfig } from 'axios';
import { SummaryByProject } from './models';

const VERSION = require('../package.json').version;

const base = token => workspace => (endpoint: string, params?: unknown) => {
  const config: AxiosRequestConfig = {
    url: `https://toggl.com/${endpoint}`,
    method: 'GET',
    headers: {
      'User-Agent': `toggl-lib-${VERSION}`
    },
    auth: {
      username: token,
      password: 'api_token'
    },
    params: {
      user_agent: `toggl-lib-${VERSION}`,
      workspace_id: workspace,
      ...params
    }
  };
  return axios.request(config).catch(console.error);
};

const totalHours = summary => summary.totals[summary.totals.length - 1];

const toProjectSummary = (summary): SummaryByProject => ({
  client: summary.title.client.toUpperCase(),
  project: summary.title.project.toUpperCase(),
  time: totalHours(summary)
});

const parseSummaryByProjects = result => result.data.data.map(toProjectSummary);

export const api = (token, workspace) => ({
  summaryByProjects: (sinceDate, untilDate) => base(token)(workspace)('reports/api/v2/weekly?grouping=projects', {
    sinceDate,
    untilDate
  }).then(parseSummaryByProjects)
});
