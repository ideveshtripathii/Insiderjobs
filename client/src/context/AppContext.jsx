import { useAuth, useUser} from "@clerk/clerk-react";
import { createContext, useEffect, useState } from "react";


export const AppContext = createContext()
export const AppContextProvider =(props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const {user} = useUser()
    const {getToken} = useAuth()
    
    const [searchFilter, setSearchFilter] = useState({
        title:'',
        location:''
    })

    const [isSearched,setIsSearched] = useState(false)
    const [jobs,setjobs]= useState([])

    const [showRecruiterLogin, setShowRecruiterLogin] = useState(false)

    const [companyToken, setCompanyToken] = useState(null)
    const [companyData, setCompanyData] = useState(null)

    const [userData, setUserData] = useState(null)
    const [userapplication, setUserApplication] = useState([])

    //Function to Fetch Jobs
    const fetchJobs = async() => {
        try {
            const {data} = await axios.get(backendUrl + '/api/jobs')

            if (data.success) {
                setjobs(data.jobs)
            }else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to Fetch Company Data
    const fetchCompanyData = async () => {
        try {
            const token = await getToken();

            const {data} = await axios.get(backendUrl + '/api/users/user',
                { headers: {Authorization: `Bearer ${token}` }})
            if (data.success) {
                setUserData(data.user)
            } else (
                toast.error(data.message)
            )
        } catch (error) {
            toast.error(error.message)
        }
    }

    //Function to Fetch User's Applied Applications
    const fetchUserApplication = async () => {
        try{
            const token = await getToken()

            const {data} = await axios.get(backendUrl + '/api/users/applications',
                { headers: {Authorization: `Bearer ${token}`} }
            )
            if (data.success) {
                setUserApplications(data.applications)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Retrive Company Token from LocalStorage
    useEffect(() => {
        fetchJobs()

        const storedCompanyToken = localStorage.getItem('CompanyToken')
        if(storedCompanyToken){
            setCompanyToken(storedCompanyTokens)
        }
    },[])

    // Fetch Company Data if Company Token is Available

    const value ={

    }

    return (<AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>)
}