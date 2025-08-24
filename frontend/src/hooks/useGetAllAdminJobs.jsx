import { setAllAdminJobs } from '@/redux/jobSlice'
import { JOB_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

const useGetAllAdminJobs = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setAllAdminJobs(res.data.jobs || []));
                } else {
                    // If API call succeeds but returns no jobs, set empty array
                    dispatch(setAllAdminJobs([]));
                }
            } catch (error) {
                console.log(error);
                // If API call fails, set empty array to prevent undefined errors
                dispatch(setAllAdminJobs([]));
            }
        }
        fetchAllAdminJobs();
    },[])
}

export default useGetAllAdminJobs