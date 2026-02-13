import { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RecruiterLogin = () => {

    const navigate = useNavigate()

    const [state, setState] = useState('Login')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const [image, setImage] = useState(false)

    const [isTextDataSubmited, setIsTextDataSubmited] = useState(false)

    const { setShowRecruiterLogin, backendUrl, setCompanyToken, setCompanyData } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        if (state == "Sign Up" && !isTextDataSubmited) {
            return setIsTextDataSubmited(true)
        }

        try {

            if (state === "Login") {

                const { data } = await axios.post(backendUrl + '/api/company/login', { email, password })

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            } else {

                if (!image) {
                    return toast.error("Please upload company logo")
                }

                const formData = new FormData()
                formData.append('name', name)
                formData.append('password', password)
                formData.append('email', email)
                formData.append('image', image)

                const { data } = await axios.post(backendUrl + '/api/company/register', formData)

                if (data.success) {
                    setCompanyData(data.company)
                    setCompanyToken(data.token)
                    localStorage.setItem('companyToken', data.token)
                    setShowRecruiterLogin(false)
                    navigate('/dashboard')
                } else {
                    toast.error(data.message)
                }

            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [])

    return (
        <div className='fixed inset-0 z-50 backdrop-blur-md bg-slate-900/60 flex justify-center items-center px-4'>
            <form onSubmit={onSubmitHandler} className='relative bg-white p-8 rounded-[24px] shadow-2xl w-full max-w-[400px] border border-slate-100 flex flex-col'>

                <div className='mb-6 text-center'>
                    <h1 className='text-2xl font-bold text-slate-900 mb-1.5'>Recruiter {state}</h1>
                    <p className='text-slate-500 text-sm font-medium'>{state === 'Login' ? 'Access your recruiter dashboard' : 'Start hiring the best talent today'}</p>
                </div>

                {state === "Sign Up" && isTextDataSubmited
                    ? (
                        <div className='flex flex-col items-center gap-4 my-4 py-4 bg-slate-50 rounded-xl border border-dashed border-slate-200'>
                            <label htmlFor="image" className='relative group cursor-pointer'>
                                <img
                                    className='w-16 h-16 rounded-xl object-cover shadow-md border-2 border-white group-hover:border-blue-100 transition-all'
                                    src={image ? URL.createObjectURL(image) : assets.upload_area}
                                    alt="Logo Upload"
                                />
                                <div className='absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center'>
                                    <span className='text-[8px] font-bold text-blue-600 bg-white px-1.5 py-0.5 rounded shadow-sm'>CHANGE</span>
                                </div>
                                <input onChange={e => setImage(e.target.files[0])} type="file" id='image' hidden />
                            </label>
                            <div className='text-center'>
                                <p className='font-bold text-slate-800 text-xs'>Company Logo</p>
                                <p className='text-slate-400 text-[10px] mt-0.5 font-medium'>Required brand identity</p>
                            </div>
                        </div>
                    )
                    : (
                        <div className='space-y-3'>
                            {state !== 'Login' && (
                                <div className='group flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all'>
                                    <img className='h-4 opacity-40 group-focus-within:opacity-100 transition-opacity' src={assets.person_icon} alt="" />
                                    <input
                                        className='flex-1 outline-none text-sm bg-transparent text-slate-800 placeholder:text-slate-400 font-semibold'
                                        onChange={e => setName(e.target.value)}
                                        value={name}
                                        type="text"
                                        placeholder='Company Name'
                                        required
                                    />
                                </div>
                            )}

                            <div className='group flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all'>
                                <img className='h-4 opacity-40 group-focus-within:opacity-100 transition-opacity' src={assets.email_icon} alt="" />
                                <input
                                    className='flex-1 outline-none text-sm bg-transparent text-slate-800 placeholder:text-slate-400 font-semibold'
                                    onChange={e => setEmail(e.target.value)}
                                    value={email}
                                    type="email"
                                    placeholder='Email Address'
                                    required
                                />
                            </div>

                            <div className='group flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 focus-within:bg-white focus-within:border-blue-600 focus-within:ring-4 focus-within:ring-blue-600/5 transition-all'>
                                <img className='h-4 opacity-40 group-focus-within:opacity-100 transition-opacity' src={assets.lock_icon} alt="" />
                                <input
                                    className='flex-1 outline-none text-sm bg-transparent text-slate-800 placeholder:text-slate-400 font-semibold'
                                    onChange={e => setPassword(e.target.value)}
                                    value={password}
                                    type="password"
                                    placeholder='Password'
                                    required
                                />
                            </div>
                        </div>
                    )
                }

                {state === "Login" && (
                    <div className='flex justify-end mt-3'>
                        <button type='button' className='text-[11px] font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider'>Forgot password?</button>
                    </div>
                )}

                <button type='submit' className='bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all w-full text-white py-3 rounded-xl mt-6 font-bold text-base shadow-lg shadow-blue-500/20 uppercase tracking-widest'>
                    {state === 'Login' ? 'login' : isTextDataSubmited ? 'Create Account' : 'Continue'}
                </button>

                <div className='mt-6 text-center bg-slate-50 py-3 rounded-xl border border-slate-100'>
                    {state === 'Login'
                        ? <p className='text-xs font-semibold text-slate-500'>New to InsiderJobs? <button type='button' className='text-blue-600 font-bold hover:underline ml-1' onClick={() => { setState("Sign Up"); setIsTextDataSubmited(false) }}>Register</button></p>
                        : <p className='text-xs font-semibold text-slate-500'>Already have an account? <button type='button' className='text-blue-600 font-bold hover:underline ml-1' onClick={() => { setState("Login"); setIsTextDataSubmited(false) }}>Sign In</button></p>
                    }
                </div>

                <button
                    type='button'
                    onClick={e => setShowRecruiterLogin(false)}
                    className='absolute top-5 right-5 p-1.5 rounded-lg hover:bg-slate-100 transition-all text-slate-400 hover:text-slate-800'
                >
                    <img className='h-3.5' src={assets.cross_icon} alt="Close" />
                </button>

            </form>
        </div>
    )
}

export default RecruiterLogin