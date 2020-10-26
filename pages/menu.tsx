import styled from 'styled-components';
import { HomeMenu } from '../components/menu/home-menu';
import useSessionCheck from '../hooks/useSessionCheck';

export default function Menu() {
  const {isLoggedOut, user} = useSessionCheck();

  return (
    <Container>
      <HomeMenu />
    </Container>
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