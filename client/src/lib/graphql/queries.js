import { GraphQLClient, gql } from 'graphql-request';
import CompanyPage from '../../pages/CompanyPage';

const client = new GraphQLClient('http://localhost:9001/graphql');

export async function getCompany(id) {
    const query = gql`
        query CompanyById($id: ID!) {
            company(id: $id) {
                id,
                name,
                description
                jobs {
                    id
                    date
                    title
                }
            }
        }
    `;
    const data = await client.request(query, { id });
    return data.company;
}

export async function getJob(id) {
    const query = gql`
        query JobById($id: ID!) {
            job(id: $id) {
                id
                date
                title
                company {
                    id
                    name
                }
                description
            }
        }
    `;
    const data = await client.request(query, { id });
    return data.job;
}

export async function getJobs() {
    const query = gql`
        query {
            jobs {
                id
                date
                title
                company {
                    id
                    name
                }
            }
        }
    `;

    const data = await client.request(query);
    return data.jobs;
}

