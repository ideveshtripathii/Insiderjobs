import { useContext } from 'react'
import { assets } from '../assets/assets'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Navbar = () => {

    const { openSignIn } = useClerk()
    const { user } = useUser()

    const navigate = useNavigate()

    const { setShowRecruiterLogin } = useContext(AppContext)

    return (
        <nav className='vibrant-nav py-5'>
            <div className='container px-4 2xl:px-20 mx-auto flex justify-between items-center'>
                <img onClick={() => navigate('/')} className='cursor-pointer h-10 brightness-200' src={assets.logo} alt="InsiderJobs" />
                {
                    user
                        ? <div className='flex items-center gap-6'>
                            <Link to={'/applications'} className='nav-link'>Applied Jobs</Link>
                            <span className='w-px h-6 bg-white/10'></span>
                            <div className='flex items-center gap-3'>
                                <p className='max-sm:hidden text-white font-medium'>Hi, {user.firstName}</p>
                                <UserButton />
                            </div>
                        </div>
                        : <div className='flex items-center gap-8 max-sm:text-xs'>
                            <button onClick={e => setShowRecruiterLogin(true)} className='nav-link'>Recruiter Login</button>
                            <button onClick={e => openSignIn()} className='bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-9 py-2.5 rounded-full font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-all'>Login</button>
                        </div>
                }

            </div>
        </nav>
    )
}

export default Navbar