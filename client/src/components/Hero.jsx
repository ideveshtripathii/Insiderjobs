import { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto px-4 mb-20 pt-6'>
            <div className='premium-hero-card rounded-[40px] py-32 px-6 text-center shadow-2xl'>
                <div className='relative z-10'>
                    <h2 className='text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-white'>
                        Over 10,000+ jobs to apply
                    </h2>
                    <p className='mb-14 max-w-2xl mx-auto text-base md:text-lg text-slate-300 font-medium opacity-90 leading-relaxed uppercase tracking-widest'>
                        Your Next Big Career Move Starts Right Here - Take The First Step Toward Your Future!
                    </p>

                    <div className='flex flex-col md:flex-row items-center justify-between dark-search-bar rounded-2xl max-w-4xl mx-auto p-3'>
                        <div className='flex items-center flex-1 w-full px-6 border-b md:border-b-0 md:border-r border-white/10 py-4 group'>
                            <img className='h-6 opacity-40 group-focus-within:opacity-100 transition-opacity invert' src={assets.search_icon} alt="" />
                            <input type="text"
                                placeholder='Search for jobs'
                                className='text-lg pl-4 outline-none w-full dark-search-input font-medium'
                                ref={titleRef}
                            />
                        </div>
                        <div className='flex items-center flex-1 w-full px-6 py-4 group'>
                            <img className='h-6 opacity-40 group-focus-within:opacity-100 transition-opacity invert' src={assets.location_icon} alt="" />
                            <input type="text"
                                placeholder='Location'
                                className='text-lg pl-4 outline-none w-full dark-search-input font-medium'
                                ref={locationRef}
                            />
                        </div>
                        <button onClick={onSearch} className='premium-search-btn active:scale-95 px-12 py-4 rounded-xl text-white font-bold text-lg w-full md:w-auto shadow-xl'>
                            Search Jobs
                        </button>
                    </div>
                </div>
            </div>

            <div className='mt-20 premium-trusted-banner py-10 px-12 rounded-[40px] shadow-2xl max-w-7xl mx-auto'>
                <div className='flex flex-col lg:flex-row items-center gap-12 lg:gap-24 relative z-10'>
                    <div className='flex flex-col items-center lg:items-start'>
                        <p className='text-indigo-400 font-black text-xs uppercase tracking-[0.3em] mb-2'>Our Partners</p>
                        <h3 className='text-white font-bold text-2xl min-w-fit'>Trusted by the best</h3>
                    </div>
                    <div className='flex flex-wrap justify-center lg:justify-start items-center gap-12 md:gap-20 flex-1'>
                        <img className='h-8 cursor-pointer object-contain trusted-logo-container' src={assets.microsoft_logo} onError={(e) => { e.target.src = assets.company_icon }} alt="Microsoft" />
                        <img className='h-8 cursor-pointer object-contain trusted-logo-container' src={assets.walmart_logo} onError={(e) => { e.target.src = assets.company_icon }} alt="Walmart" />
                        <img className='h-8 cursor-pointer object-contain trusted-logo-container' src={assets.accenture_logo} onError={(e) => { e.target.src = assets.company_icon }} alt="Accenture" />
                        <img className='h-8 cursor-pointer object-contain trusted-logo-container' src={assets.samsung_logo} onError={(e) => { e.target.src = assets.company_icon }} alt="Samsung" />
                        <img className='h-8 cursor-pointer object-contain trusted-logo-container' src={assets.amazon_logo} onError={(e) => { e.target.src = assets.company_icon }} alt="Amazon" />
                        <img className='h-8 cursor-pointer object-contain trusted-logo-container' src={assets.adobe_logo} onError={(e) => { e.target.src = assets.company_icon }} alt="Adobe" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero