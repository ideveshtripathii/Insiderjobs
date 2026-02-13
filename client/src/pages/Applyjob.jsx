import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import Loading from '../components/Loading'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import kconvert from 'k-convert';
import moment from 'moment';
import JobCard from '../components/JobCard'
import Footer from '../components/Footer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '@clerk/clerk-react'

const ApplyJob = () => {

  const { id } = useParams()

  const { getToken } = useAuth()

  const navigate = useNavigate()

  const [JobData, setJobData] = useState(null)
  const [isAlreadyApplied, setIsAlreadyApplied] = useState(false)

  const { jobs, backendUrl, userData, userApplications, fetchUserApplications } = useContext(AppContext)

  const fetchJob = async () => {

    try {

      const { data } = await axios.get(backendUrl + `/api/jobs/${id}`)

      if (data.success) {
        setJobData(data.job)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

  }

  const applyHandler = async () => {
    try {

      if (!userData) {
        return toast.error('Login to apply for jobs')
      }

      if (!userData.resume) {
        navigate('/applications')
        return toast.error('Upload resume to apply')
      }

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/apply',
        { jobId: JobData._id },
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        fetchUserApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  const checkAlreadyApplied = () => {
    const hasApplied = userApplications.some(item => item.jobId && item.jobId._id === JobData._id)
    setIsAlreadyApplied(hasApplied)
  }

  useEffect(() => {
    fetchJob()
  }, [id])

  useEffect(() => {
    if (userApplications.length > 0 && JobData) {
      checkAlreadyApplied()
    }
  }, [JobData, userApplications, id])

  return JobData ? (
    <>
      <Navbar />

      <div className='min-h-screen flex flex-col py-10 container px-4 2xl:px-20 mx-auto'>
        <div className='text-white w-full'>
          <div className='flex justify-center md:justify-between flex-wrap gap-10 px-10 py-16 mb-16 premium-card shadow-2xl relative overflow-hidden'>
            <div className='absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none'></div>

            <div className='flex flex-col md:flex-row items-center gap-10 relative z-10'>
              <div className='bg-white/10 p-5 rounded-3xl backdrop-blur-xl border border-white/10 w-28 h-28 flex items-center justify-center shrink-0 shadow-xl group'>
                <img
                  className='max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-500'
                  src={JobData.companyId?.image || assets.company_icon}
                  onError={(e) => { e.target.src = assets.company_icon }}
                  alt={JobData.companyId?.name || "Company Logo"}
                />
              </div>
              <div className='text-center md:text-left'>
                <h1 className='text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight'>{JobData.title}</h1>
                <div className='flex flex-row flex-wrap max-md:justify-center gap-y-4 gap-8 items-center text-slate-400 mt-6'>
                  <span className='flex items-center gap-2.5 font-bold text-sm uppercase tracking-wider text-indigo-400'>
                    <img className='h-4 invert opacity-80' src={assets.suitcase_icon} alt="" />
                    {JobData.companyId?.name || "N/A"}
                  </span>
                  <span className='flex items-center gap-2.5 font-bold text-sm uppercase tracking-wider'>
                    <img className='h-4 invert opacity-80' src={assets.location_icon} alt="" />
                    {JobData.location}
                  </span>
                  <span className='flex items-center gap-2.5 font-bold text-sm uppercase tracking-wider text-pink-400'>
                    <img className='h-4 invert opacity-80' src={assets.person_icon} alt="" />
                    {JobData.level}
                  </span>
                  <span className='flex items-center gap-2.5 font-bold text-sm uppercase tracking-wider text-emerald-400'>
                    <img className='h-4 invert opacity-80' src={assets.money_icon} alt="" />
                    CTC: {kconvert.convertTo(JobData.salary)}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex flex-col justify-center text-end max-md:mx-auto max-md:text-center shrink-0 relative z-10'>
              <button onClick={applyHandler} className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 transition-all px-14 py-4 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl'>
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
              <p className='mt-4 text-slate-500 font-black text-[10px] uppercase tracking-[0.25em]'>Posted {moment(JobData.date).fromNow()}</p>
            </div>

          </div>

          <div className='flex flex-col lg:flex-row justify-between items-start gap-12'>
            <div className='w-full lg:w-2/3'>
              <h2 className='font-extrabold text-3xl mb-8 text-white border-l-4 border-indigo-500 pl-6'>Job description</h2>
              <div className='rich-text text-slate-300 leading-relaxed' dangerouslySetInnerHTML={{ __html: JobData.description }}></div>
              <button onClick={applyHandler} className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:shadow-indigo-500/30 active:scale-95 transition-all px-16 py-4 text-white rounded-2xl font-black text-lg uppercase tracking-widest shadow-xl mt-16'>
                {isAlreadyApplied ? 'Already Applied' : 'Apply Now'}
              </button>
            </div>
            {/* Right Section More Jobs */}
            <div className='w-full lg:w-1/3 space-y-8'>
              <div className='flex items-center gap-3 mb-6'>
                <span className='w-2 h-8 bg-pink-500 rounded-full'></span>
                <h2 className='text-xl font-extrabold text-white'>More jobs from {JobData.companyId?.name || "this company"}</h2>
              </div>
              <div className='grid gap-6'>
                {jobs.filter(job => job._id !== JobData._id && job.companyId?._id === JobData.companyId?._id)
                  .filter(job => {
                    // Set of applied jobIds
                    const appliedJobsIds = new Set(userApplications.map(app => app.jobId && app.jobId._id))
                    // Return true if the user has not already applied for this job
                    return !appliedJobsIds.has(job._id)
                  }).slice(0, 4)
                  .map((job, index) => <JobCard key={index} job={job} />)}
              </div>
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  )
}

export default ApplyJob