import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

const JobCard = ({ job }) => {

  const navigate = useNavigate()

  return (
    <div className='premium-card p-8 flex flex-col justify-between group h-full'>
      <div className='relative z-10'>
        <div className='flex justify-between items-start mb-6'>
          <div className='bg-white/10 p-3 rounded-2xl backdrop-blur-md border border-white/10 group-hover:border-indigo-500/50 transition-colors'>
            <img
              className='h-9 max-w-[130px] object-contain invert-0 group-hover:brightness-110'
              src={job.companyId?.image || assets.company_icon}
              onError={(e) => { e.target.src = assets.company_icon }}
              alt={job.companyId?.name || "Company"}
            />
          </div>
          <span className='text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-500/10 px-3 py-1.5 rounded-lg border border-indigo-500/20'>NEW</span>
        </div>

        <h4 className='font-bold text-2xl text-white mb-3 group-hover:text-indigo-400 transition-colors line-clamp-1'>{job.title}</h4>

        <div className='flex flex-wrap items-center gap-2 mb-6'>
          <span className='bg-slate-800 text-slate-300 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-white/5'>{job.location}</span>
          <span className='bg-pink-500/10 text-pink-400 px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider border border-pink-500/20'>{job.level}</span>
        </div>

        <p className='text-slate-400 text-sm leading-relaxed mb-8 line-clamp-2 font-medium'
          dangerouslySetInnerHTML={{ __html: job.description.slice(0, 150).replace(/<[^>]*>/g, '') + '...' }}>
        </p>
      </div>

      <div className='flex gap-3 text-sm relative z-10'>
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
          className='flex-1 text-white font-bold border-2 border-white/10 hover:border-white/30 hover:bg-white/5 rounded-xl px-4 py-3 transition-all'>
          Details
        </button>
        <button
          onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }}
          className='flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-xl hover:shadow-indigo-500/20 text-white font-bold px-4 py-3 rounded-xl active:scale-95 transition-all'>
          Apply
        </button>
      </div>
    </div>
  )
}

export default JobCard