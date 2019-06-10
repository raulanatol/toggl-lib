import axios, { AxiosRequestConfig } from 'axios';
import { humanizeMilliseconds } from './utils';
import { SummaryByProject } from './models';

const VERSION = require('../package.json').version;

const base = token => workspace => endpoint => {
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
      workspace_id: workspace
    }
  };
  return axios.request(config).catch(console.error);
};

const toProjectSummary = (summary): SummaryByProject => ({
  client: summary.title.client,
  project: summary.title.project,
  time: humanizeMilliseconds(summary.time)
});

const parseSummaryByProjects = result => result.data.data.map(toProjectSummary);

export const api = (token, workspace) => ({
  summaryByProjects: base(token)(workspace)('reports/api/v2/summary?grouping=projects').then(parseSummaryByProjects)
});
