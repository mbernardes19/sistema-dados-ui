import styled from 'styled-components';
import {SimpleCard} from '../components/card';

export default function Home() {
  return (
    <Container>
      <SimpleCard>
        <h1>Hi!</h1>
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