import { SimpleCard } from "../components/simple-card"
import { RegisterForm } from "../forms/register-form"
import styled from "styled-components"

export default function CadastrarUsuario({}) {
    return (
        <Container>
          <SimpleCard
            height={28}
          >
             <RegisterForm />
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