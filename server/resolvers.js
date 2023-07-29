import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from './db/companies.js'

export const resolvers = {
    Query: {
        job: (_root, args) => {
            return getJob(args.id);
        },
        company: (_root, args) => {
            return getCompany(args.id);
        },
        jobs: () => getJobs(),
    },

    Company: {
        jobs: (company) => getJobsByCompany(company.id),
        //company here is the parent object
    },

    Job: {
        company: (job) => {
            return getCompany(job.companyId);
        },
        date: (job) => toIsoDate(job.createdAt),
    },
};

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}