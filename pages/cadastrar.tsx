import { SimpleCard } from "../components/simple-card"
import { RegisterForm } from "../forms/register-form"
import styled from "styled-components"
import CookiesJS from 'js-cookie';
import { useRouter } from "next/router";
import { ArrowBack } from "@material-ui/icons"


export default function CadastrarUsuario({}) {
  const router = useRouter();
    return (
      <>
        <div style={{display: 'flex', marginBottom: '1rem', flexDirection: 'row'}}>
        <a onClick={() => router.back()}>
          <ArrowBack style={{fontSize: 30, paddingLeft: '.3rem', color: 'white' }} />
        </a>
      <a onClick={() => {
        CookiesJS.remove('user_token');
        router.push('/')
        }} style={{marginLeft: 'auto', color: '#fff', cursor: 'pointer', paddingTop: '.3rem', paddingRight: '1rem'}}>Sair</a>
        </div>
        <Container>
          <SimpleCard
            height={30}
          >
             <RegisterForm />
          </SimpleCard>
        </Container>
       </> 
      )
    }
    
    const Container = styled.div`
      max-width: 100%;
      height: 80vh;
      display: flex;
      justify-content: center;
      align-items: center;
    `