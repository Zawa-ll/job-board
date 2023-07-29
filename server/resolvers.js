import { GraphQLError } from 'graphql';
import { getJob, getJobs, getJobsByCompany } from "./db/jobs.js";
import { getCompany } from './db/companies.js'

export const resolvers = {
    Query: {
        company: async (_root, args) => {
            const company = await getCompany(args.id);
            if (!company) {
                throw new notFoundError('No Company founded with id ' + args.id);
            }
            return company;
        },
        job: async (_root, args) => {
            const job = await getJob(args.id);
            if (!job) {
                throw new notFoundError('No Job founded with id ' + args.id);
            }
            return job;
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

function notFoundError(message) {
    return new GraphQLError(message, {
        extensions: { code: 'NOT_FOUND' },
    })
}

function toIsoDate(value) {
    return value.slice(0, 'yyyy-mm-dd'.length);
}