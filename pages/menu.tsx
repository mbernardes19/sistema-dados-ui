import styled from 'styled-components';
import { HomeMenu } from '../components/menu/home-menu';
import useSessionCheck from '../hooks/useSessionCheck';
import { GetServerSideProps } from 'next';
import ApiService from '../services/api';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'cookies'
import CookiesJS from 'js-cookie';

export default function Menu({ authorized }) {
  const router = useRouter();

  useEffect(() => {
    console.log('AUTHORIZED', authorized)
    if (!authorized) {
      router.push('/')
    }
  }, [])

  if (!authorized) {
    return (
      <div></div>
    )
  }

  return (
    <>
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <a onClick={() => {
        CookiesJS.remove('user_token');
        router.push('/')
        }} style={{marginLeft: 'auto', color: '#fff', cursor: 'pointer', paddingRight: '1rem'}}>Sair</a>
    </div>
    <Container>
      <HomeMenu />
    </Container>
    </>
  )
}

const Container = styled.div`
    min-width: 50vw;
    max-width: 100%;
    min-height: 80vh;
    max-height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  let response;
  let authorized;
  try {
    const cookies = new Cookies(req, res)
    const token = cookies.get('user_token')
    response = await ApiService.getMenu(token)
    console.log(response.data);
    authorized = response.data ? true : false;
  } catch (err) {
    authorized = false;
  }
    return {props: { authorized }}
}