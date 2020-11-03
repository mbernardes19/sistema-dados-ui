import styled from 'styled-components';
import { SimpleCard } from '../components/simple-card';
import { CloudUpload, InsertDriveFile, CheckCircle, ArrowBack } from '@material-ui/icons'
import { PrimaryUploadButton } from '../components/button/primary-upload-button';
import { useState, useEffect } from 'react';
import { PrimaryButton } from '../components/button/primary-button';
import { SecondaryButton } from '../components/button/secondary-button';
import ApiService from '../services/api';
import { CircularProgress } from '@material-ui/core';
import { useRouter, Router } from 'next/router';
import { GetServerSideProps } from 'next';
import Cookies from 'cookies'
import CookiesJS from 'js-cookie';


export default function AtualizarDados({ authorized, authenticated }) {
  const [file, setFile] = useState<File | undefined>();
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  useEffect(() => {
    if (!authenticated) {
      router.push('/');
      return;
    }
    if (!authorized) {
      router.push('/menu');
      return;
    }
  }, [])

  const handleSystemUpdate = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.updateSystemData(file);
      if (resp.status === 201 || resp.status === 200) {
        setLoading(false);
        setIsUpdateSuccessful(true);
      } else {
        setLoading(false);
        setIsUpdateSuccessful(false);
      }
    } catch (err) {
      setLoading(false);
      setIsUpdateSuccessful(false);

    }
  }

  const LoadingScreen = () => (
    <div style={{padding: '2rem'}}>
      <div>
        <CircularProgress size='3rem' style={{color: '#66667B'}} />
      </div>
      <p>Atualizando o sistema...</p>
    </div>
  )

  const UploadFileScreen = () => (
    <div style={{padding: '2rem'}}>
      <div>
        <CloudUpload style={{fontSize: 80, color: '#66667B'}}/>
      </div>
      <p style={{color: '#66667B', marginTop: '.5rem', marginBottom: '2.3rem'}}>Clique abaixo para escolher uma planilha para atualizar o sistema</p>
      <PrimaryUploadButton onFileSelect={file => setFile(file)}> Escolher planilha </PrimaryUploadButton>
    </div>
  )

  const ConfirmUploadScreen = () => (
    <div style={{padding: '2rem'}}>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <InsertDriveFile style={{fontSize: 80, color: '#66667B'}}/>
        <p style={{marginTop: '2rem', marginLeft: '.5rem', textAlign: 'left'}}>{ file.name }</p>
      </div>
      <p style={{color: '#66667B', marginTop: '2rem', marginBottom: '2.3rem'}}>Deseja atualizar o sistema a partir da planilha selecionada?</p>
      <PrimaryButton onClick={handleSystemUpdate}>Sim, atualize o sistema</PrimaryButton>
      <SecondaryButton style={{marginTop: '.8rem'}} onClick={() => setFile(undefined)}>Não, escolher outra planilha</SecondaryButton>
    </div>
  )

  const UpdateSuccessfulScreen = () => (
    <div style={{padding: '2rem'}}>
      <div>
        <CheckCircle style={{fontSize: 80, color: '#66667B'}}/>
      </div>
      <p style={{fontSize: '1.5rem', marginTop: '.5rem', color: '#66667B'}}>Sistema atualizado com sucesso!</p>
      <PrimaryButton style={{marginTop: '1rem'}} onClick={() => router.push('/menu')}>Voltar à home</PrimaryButton>
    </div>
  )

  if (!authorized || !authenticated) {
    return (
      <div></div>
    )
  }

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
        <SimpleCard>
          {
            loading ? <LoadingScreen /> :
            isUpdateSuccessful ?
              <UpdateSuccessfulScreen />
            :
              file === undefined && !isUpdateSuccessful ? <UploadFileScreen /> : <ConfirmUploadScreen />
          }
        </SimpleCard>
    </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let response;
  let response2;
  let authorized;
  let authenticated;
  const cookies = new Cookies(req, res);
  const token = cookies.get('user_token')

  try {
    response = await ApiService.getUser(token)
    authenticated = response.data.id ? true : false;
  } catch (err) {
    authenticated = false;
  }
  
  try {
    response2 = await ApiService.getMenu(token)
    const allowedRoutes: string[] = response2.data.map(menu => menu.href);
    console.log('ALLOWED ROUTES', allowedRoutes)
    authorized = allowedRoutes.includes('/atualizar-dados');
  } catch (err) {
    authorized = false;
  }

  console.log('AUTHENTICATED', authenticated, 'AUTHORIZED', authorized)

  return {props: { authorized, authenticated }}
}

const Container = styled.div`
    max-width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`