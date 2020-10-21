import styled from 'styled-components';
import {SimpleCard} from '../components/simple-card';
import { LoginForm } from '../forms/login-form';

export default function Home() {
  return (
    <Container>
      <SimpleCard>
        <LoginForm />
      </SimpleCard>
    </Container>
  )
}

const Container = styled.div`
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`