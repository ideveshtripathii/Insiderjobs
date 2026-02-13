import { assets } from '../assets/assets'

const AppDownload = () => {
    return (
        <div className='container px-4 2xl:px-20 mx-auto my-32'>
            <div className='relative premium-hero-card p-16 sm:p-24 lg:p-32 rounded-[48px] shadow-2xl overflow-hidden'>
                <div className='relative z-10'>
                    <h1 className='text-3xl sm:text-5xl font-extrabold mb-10 max-w-lg leading-tight text-white'>Download Mobile App For Better Experience</h1>
                    <div className='flex flex-wrap gap-5'>
                        <a href="#" className='hover:scale-105 transition-all active:scale-95'>
                            <img className='h-14 shadow-xl rounded-xl' src={assets.play_store} alt="Play Store" />
                        </a>
                        <a href="#" className='hover:scale-105 transition-all active:scale-95'>
                            <img className='h-14 shadow-xl rounded-xl' src={assets.app_store} alt="App Store" />
                        </a>
                    </div>
                </div>
                <img className='absolute w-[450px] right-0 bottom-[-50px] mr-20 max-xl:hidden opacity-90' src={assets.app_main_img} alt="App Preview" />
            </div>
        </div>
    )
}

export default AppDownload