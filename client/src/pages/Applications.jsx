import { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import { assets } from '../assets/assets'
import moment from 'moment'
import Footer from '../components/Footer'
import { AppContext } from '../context/AppContext'
import { useAuth, useUser } from '@clerk/clerk-react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const Applications = () => {

  const { user } = useUser()
  const { getToken } = useAuth()

  const [isEdit, setIsEdit] = useState(false)
  const [resume, setResume] = useState(null)

  const { backendUrl, userData, userApplications, fetchUserData, fetchUserApplications } = useContext(AppContext)

  const updateResume = async () => {

    try {

      const formData = new FormData()
      formData.append('resume', resume)

      const token = await getToken()

      const { data } = await axios.post(backendUrl + '/api/users/update-resume',
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      )

      if (data.success) {
        toast.success(data.message)
        await fetchUserData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }

    setIsEdit(false)
    setResume(null)
  }

  useEffect(() => {
    if (user) {
      fetchUserApplications()
    }
  }, [user])

  return userData ? (
    <>
      <Navbar />
      <div className='container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-12'>
        <div className='mb-12'>
          <h2 className='text-3xl font-extrabold text-white mb-6'>Your Resume</h2>
          <div className='flex items-center gap-4'>
            {
              isEdit || userData && userData.resume === ""
                ? <>
                  <label className='flex items-center group cursor-pointer' htmlFor="resumeUpload">
                    <p className='bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-6 py-3 rounded-2xl group-hover:bg-indigo-500/20 transition-all font-bold'>
                      {resume ? resume.name : "Select Resume"}
                    </p>
                    <input id='resumeUpload' onChange={e => setResume(e.target.files[0])} accept='application/pdf' type="file" hidden />
                    <div className='bg-white/5 p-3 rounded-xl ml-3 border border-white/5 group-hover:border-indigo-500/30 transition-all'>
                      <img className='h-6 invert opacity-70 group-hover:opacity-100' src={assets.profile_upload_icon} alt="" />
                    </div>
                  </label>
                  <button onClick={updateResume} className='bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-2xl px-10 py-3 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all'>
                    Save Changes
                  </button>
                </>
                : <div className='flex gap-4'>
                  <a target='_blank' href={userData.resume} className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all'>
                    View Resume
                  </a>
                  <button onClick={() => setIsEdit(true)} className='text-slate-400 border-2 border-white/10 hover:border-white/30 hover:bg-white/5 rounded-2xl px-8 py-3 font-bold transition-all'>
                    Edit
                  </button>
                </div>
            }
          </div>
        </div>

        <h2 className='text-3xl font-extrabold text-white mb-8'>Jobs Applied</h2>
        <div className='premium-glass-table shadow-2xl'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className='py-5 px-6 text-left'>Company</th>
                <th className='py-5 px-6 text-left'>Job Title</th>
                <th className='py-5 px-6 text-left max-sm:hidden'>Location</th>
                <th className='py-5 px-6 text-left max-sm:hidden'>Date</th>
                <th className='py-5 px-6 text-left'>Status</th>
              </tr>
            </thead>
            <tbody>
              {userApplications.map((job, index) => true ? (
                <tr key={index} className='hover:bg-white/5 transition-colors group'>
                  <td className='py-5 px-6 flex items-center gap-4'>
                    <div className='bg-white/5 p-2 rounded-xl border border-white/5 group-hover:border-indigo-500/20 transition-colors'>
                      <img
                        className='w-10 h-10 object-contain'
                        src={job.companyId?.image || assets.company_icon}
                        onError={(e) => { e.target.src = assets.company_icon }}
                        alt={job.companyId?.name || "Company"}
                      />
                    </div>
                    <span className='font-bold text-slate-200'>{job.companyId?.name || "N/A"}</span>
                  </td>
                  <td className='py-5 px-6 font-semibold text-slate-300'>{job.jobId?.title || "N/A"}</td>
                  <td className='py-5 px-6 max-sm:hidden text-slate-400 font-medium'>{job.jobId?.location || "N/A"}</td>
                  <td className='py-5 px-6 max-sm:hidden text-slate-400 font-medium'>{moment(job.date).format('ll')}</td>
                  <td className='py-5 px-6'>
                    <span className={`inline-block px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm ${job.status === 'Accepted' ? 'badge-accepted' : job.status === 'Rejected' ? 'badge-rejected' : 'badge-pending'}`}>
                      {job.status}
                    </span>
                  </td>
                </tr>
              ) : (null))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  ) : <Loading />
}

export default Applications