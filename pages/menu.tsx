import styled from 'styled-components';
import { HomeMenu } from '../components/home-menu';

export default function Menu() {
  return (
    <Container>
        <HomeMenu />
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