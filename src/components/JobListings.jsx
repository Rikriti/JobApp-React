import { useState, useEffect } from 'react';
import JobListing from './JobListing';
import Spinner from './Spinner';

const JobListings = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      const apiUrl = isHome
        ? 'http://localhost:5000/jobs?_limit=3'
        : 'http://localhost:5000/jobs';

      setLoading(true);
      setError(null); // Reset error before fetching

      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error('Failed to fetch jobs');
        }
        const data = await res.json();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [isHome]);

  return (
    <section className='bg-blue-50 px-4 py-10'>
      <div className='container-xl lg:container m-auto'>
        <h2 className='text-3xl font-bold text-indigo-500 mb-6 text-center'>
          {isHome ? 'Recent Jobs' : 'Browse Jobs'}
        </h2>

        {loading ? (
          <Spinner loading={loading} />
        ) : error ? (
          <p className='text-red-500 text-center'>{error}</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
            {jobs.length > 0 ? (
              jobs.map((job) => <JobListing key={job.id} job={job} />)
            ) : (
              <p className='text-center col-span-3'>No jobs available</p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default JobListings;
