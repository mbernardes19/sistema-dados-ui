import useSWR from 'swr';
import ApiService from '../services/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useSessionCheck() {
    const router = useRouter();
    const swr = useSWR('/user', () => ApiService.getUser(sessionStorage.getItem('user_token')).then(res => res.data), {shouldRetryOnError: false})

    useEffect(() => {
        console.log('SWR', swr.data, swr.error)
        if (swr.error || !swr.data) {
            router.push('/');
        } else if (swr.data && router.route === '/') {
            router.push('/menu');
        }
    }, [swr.data])

    const response = {
        isLoggedOut: swr.error !== undefined,
        user: swr.data
    }
    return response;
}