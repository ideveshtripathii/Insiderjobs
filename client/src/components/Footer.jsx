import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between gap-6 py-12 mt-20 border-t border-white/5'>
      <img width={140} className='brightness-200' src={assets.logo} alt="InsiderJobs" />
      <p className='flex-1 border-l border-white/10 pl-6 text-sm text-slate-500 max-sm:hidden font-medium'>Copyright @dev | All right reserved.</p>
      <div className='flex gap-4'>
        <img className='w-9 grayscale hover:grayscale-0 cursor-pointer transition-all invert opacity-70 hover:opacity-100' src={assets.facebook_icon} alt="Facebook" />
        <img className='w-9 grayscale hover:grayscale-0 cursor-pointer transition-all invert opacity-70 hover:opacity-100' src={assets.twitter_icon} alt="Twitter" />
        <img className='w-9 grayscale hover:grayscale-0 cursor-pointer transition-all invert opacity-70 hover:opacity-100' src={assets.instagram_icon} alt="Instagram" />
      </div>
    </div>
  )
}

export default Footer