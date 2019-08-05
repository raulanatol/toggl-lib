import axios, { AxiosRequestConfig } from 'axios';
import { humanizeMilliseconds } from './utils';
import { SummaryByProject } from './models';

const VERSION = require('../package.json').version;

const base = token => workspace => sinceDate => untilDate =>  endpoint => {
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
      since: sinceDate,
      until: untilDate
    }
  };
  return axios.request(config).catch(console.error);
};

const toProjectSummary = (summary): SummaryByProject => ({
  client: summary.title.client && summary.title.client.toUpperCase(),
  project: summary.title.project && summary.title.project.toUpperCase(),
  time: summary.totals[summary.totals.length -1]
});

const parseSummaryByProjects = result => result.data.data.map(toProjectSummary);

export const api = (token, workspace, sinceDate, untilDate) => ({
  summaryByProjects: base(token)(workspace)(sinceDate)(untilDate)('reports/api/v2/weekly?grouping=projects').then(parseSummaryByProjects)
});
