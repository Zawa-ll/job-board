import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import JobList from '../components/JobList';
import { getCompany } from '../lib/graphql/queries'
// import { companies } from '../lib/fake-data';

function CompanyPage() {
  const { companyId } = useParams();

  const [company, setCompany] = useState();
  useEffect(() => {
    getCompany(companyId).then(company => setCompany(company));
  }, [companyId]);

  if (!company) {
    return <div>Loading...</div>
  }


  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      <h2 className='title is-5'>
        Jobs at {company.name}
      </h2>
      <JobList jobs={company.jobs}></JobList>
    </div>
  );
}

export default CompanyPage;
