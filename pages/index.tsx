import styled from 'styled-components';
import {SimpleCard} from '../components/simple-card';
import { LoginForm } from '../forms/login-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import ApiService from '../services/api';
import { GetServerSideProps } from 'next';
import Cookies from 'js-cookie';
import Cookies2 from 'cookies'

export default function Home({ authorized }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const Loading = () => (
    <>
      <div style={{display: 'flex', marginTop: '45%', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress size='5rem' style={{color: "#65667b"}} />
      </div>
    </>
  )

  useEffect(() => {
     console.log(authorized)
    if (authorized) {
      setLoading(true);
      router.push('/menu')
    } else {
      setLoading(false)
    }
  }, [])

  return (
    <Container>
      <SimpleCard>
        {
          loading ? <Loading /> : <LoginForm />
        }
      </SimpleCard>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;
  height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  let response;
  let authorized;
  try {
    const cookies = new Cookies2(req, res)
    const token = cookies.get('user_token')
    response = await ApiService.getUser(token)
    console.log(response.data);
    authorized = response.data ? true : false;
  } catch (err) {
    authorized = false;
  }
    return {props: { authorized }}
}