import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {

    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {

        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)

        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)

        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())

        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>

            {/* Sidebar */}
            <div className='w-full lg:w-1/4 premium-sidebar p-8 rounded-[32px] h-fit sticky top-28'>

                {/*  Search Filter from Hero Component */}
                {
                    isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                        <div className='mb-10'>
                            <h3 className='font-bold text-indigo-400 text-xs uppercase tracking-[0.2em] mb-4'>Applied filters</h3>
                            <div className='flex flex-wrap gap-2'>
                                {searchFilter.title && (
                                    <span className='inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-lg text-xs font-bold'>
                                        {searchFilter.title}
                                        <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer h-3 hover:opacity-70 invert' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                                {searchFilter.location && (
                                    <span className='inline-flex items-center gap-2 bg-pink-500/10 text-pink-300 border border-pink-500/20 px-3 py-1.5 rounded-lg text-xs font-bold'>
                                        {searchFilter.location}
                                        <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer h-3 hover:opacity-70 invert' src={assets.cross_icon} alt="" />
                                    </span>
                                )}
                            </div>
                        </div>
                    )
                }

                <button onClick={e => setShowFilter(prev => !prev)} className='w-full px-6 py-3 rounded-xl border border-white/10 lg:hidden font-bold text-white hover:bg-white/5 transition-all mb-6'>
                    {showFilter ? "Hide Filters" : "Show Filters"}
                </button>

                {/* Category Filter */}
                <div className={showFilter ? "block" : "max-lg:hidden"}>
                    <h4 className='font-black text-white text-xs mb-5 uppercase tracking-[0.2em]'>Categories</h4>
                    <ul className='space-y-4 text-slate-400'>
                        {
                            JobCategories.map((category, index) => (
                                <li className='flex gap-3 items-center group cursor-pointer' key={index}>
                                    <input
                                        className='w-5 h-5 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
                                        type="checkbox"
                                        onChange={() => handleCategoryChange(category)}
                                        checked={selectedCategories.includes(category)}
                                    />
                                    <span className='text-sm font-medium group-hover:text-white transition-colors'>{category}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>

                {/* Location Filter */}
                <div className={showFilter ? "block" : "max-lg:hidden"}>
                    <h4 className='font-black text-white text-xs mb-5 mt-10 uppercase tracking-[0.2em]'>Locations</h4>
                    <ul className='space-y-4 text-slate-400'>
                        {
                            JobLocations.map((location, index) => (
                                <li className='flex gap-3 items-center group cursor-pointer' key={index}>
                                    <input
                                        className='w-5 h-5 rounded border-white/20 bg-white/5 text-indigo-600 focus:ring-indigo-500 cursor-pointer'
                                        type="checkbox"
                                        onChange={() => handleLocationChange(location)}
                                        checked={selectedLocations.includes(location)}
                                    />
                                    <span className='text-sm font-medium group-hover:text-white transition-colors'>{location}</span>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>

            {/* Job listings */}
            <section className='w-full lg:w-3/4 lg:pl-12'>
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h3 className='font-extrabold text-4xl text-white mb-2' id='job-list'>Current Openings</h3>
                        <p className='text-slate-400 font-medium'>Curated opportunities from global tech giants</p>
                    </div>
                    {filteredJobs.length > 0 && (
                        <span className='hidden sm:block text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em] bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20'>{filteredJobs.length} Results</span>
                    )}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                    {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Empty State */}
                {filteredJobs.length === 0 && (
                    <div className='flex flex-col items-center justify-center py-24 text-center premium-sidebar rounded-[32px] shadow-2xl'>
                        <div className='bg-white/5 p-10 rounded-full mb-6'>
                            <img className='h-16 opacity-30 invert' src={assets.search_icon} alt="" />
                        </div>
                        <h3 className='text-2xl font-bold text-white mb-3'>No jobs found</h3>
                        <p className='text-slate-400 max-w-xs mx-auto font-medium'>We couldn't find any jobs matching your current filters. Try adjusting them!</p>
                    </div>
                )}


                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center gap-4 mt-20 py-8 premium-sidebar rounded-[32px] shadow-2xl'>
                        <a href="#job-list">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className='p-3.5 rounded-2xl border border-white/10 text-white hover:bg-white/10 disabled:opacity-10 transition-all duration-300'
                            >
                                <img src={assets.left_arrow_icon} alt="Previous" className='h-4 invert' />
                            </button>
                        </a>

                        <div className='flex gap-3 items-center'>
                            {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                                <a key={index} href="#job-list">
                                    <button
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`min-w-[48px] h-12 flex items-center justify-center rounded-2xl border transition-all duration-300 font-bold text-sm ${currentPage === index + 1
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white border-transparent shadow-lg shadow-indigo-500/20'
                                            : 'bg-white/5 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                </a>
                            ))}
                        </div>

                        <a href="#job-list">
                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(filteredJobs.length / 6)))}
                                disabled={currentPage === Math.ceil(filteredJobs.length / 6)}
                                className='p-3.5 rounded-2xl border border-white/10 text-white hover:bg-white/10 disabled:opacity-10 transition-all duration-300'
                            >
                                <img src={assets.right_arrow_icon} alt="Next" className='h-4 invert' />
                            </button>
                        </a>
                    </div>
                )}

            </section>

        </div>
    )
}

export default JobListing