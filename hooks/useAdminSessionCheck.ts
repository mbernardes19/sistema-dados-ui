import useSWR from 'swr';
import ApiService from '../services/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function useAdminSessionCheck() {
    const router = useRouter();
    const swr = useSWR('/user', () => ApiService.getUser(sessionStorage.getItem('user_token')).then(res => res.data), {shouldRetryOnError: false})

    useEffect(() => {
        async function check() {
            console.log('SWR', swr.data, swr.error)
            let allowedRoutes = [];
            try {
                const response = await ApiService.getMenu(sessionStorage.getItem('user_token'))
                allowedRoutes = response.data.map(menu => menu.href);
            } catch (err) {
                router.push('/')
            }
            if (swr.data && !allowedRoutes.includes(router.route)) {
                router.push('/menu');
            }
            else if (swr.error || !swr.data) {
                router.push('/');
            } else if (swr.data && router.route === '/') {
                router.push('/menu');
            }
        }
        check()
    }, [swr.data])

    const response = {
        isLoggedOut: swr.error !== undefined,
        user: swr.data
    }
    return response;
}