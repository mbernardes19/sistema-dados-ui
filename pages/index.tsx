import styled from 'styled-components';
import {SimpleCard} from '../components/simple-card';
import { LoginForm } from '../forms/login-form';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import ApiService from '../services/api';
import useSessionCheck from '../hooks/useSessionCheck';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const Loading = () => (
    <>
      <div style={{display: 'flex', marginTop: '45%', justifyContent: 'center', alignItems: 'center'}}>
        <CircularProgress size='5rem' style={{color: "#65667b"}} />
      </div>
    </>
  )

  const {isLoggedOut, user} = useSessionCheck();

  useEffect(() => {
    console.log(user)
     console.log(isLoggedOut)
    if (!isLoggedOut) {
      setLoading(true);
    } else {
      setLoading(false)
    }
  }, [isLoggedOut, user])

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