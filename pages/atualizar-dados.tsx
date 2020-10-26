import styled from 'styled-components';
import { SimpleCard } from '../components/simple-card';
import { CloudUpload, InsertDriveFile, CheckCircle } from '@material-ui/icons'
import { PrimaryUploadButton } from '../components/button/primary-upload-button';
import { useState, useEffect } from 'react';
import { PrimaryButton } from '../components/button/primary-button';
import { SecondaryButton } from '../components/button/secondary-button';
import ApiService from '../services/api';
import { CircularProgress } from '@material-ui/core';
import useAdminSessionCheck from '../hooks/useAdminSessionCheck';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import useSessionCheck from '../hooks/useSessionCheck';

export default function AtualizarDados({ authorized }) {
  const [file, setFile] = useState<File | undefined>();
  const [isUpdateSuccessful, setIsUpdateSuccessful] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  // const {isLoggedOut, user} = useSessionCheck();

  useEffect(() => {
    if (!authorized) {
      router.push('/menu')
    }
  }, [])

  const handleSystemUpdate = async () => {
    try {
      setLoading(true);
      const resp = await ApiService.updateSystemData(file);
      if (resp.status === 200) {
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
    <>
      <CircularProgress />
      <p>Atualizando o sistema...</p>
    </>
  )

  const UploadFileScreen = () => (
    <>
      <div>
        <CloudUpload style={{fontSize: 80, color: '#66667B'}}/>
      </div>
      <p>Clique abaixo para escolher uma planilha para atualizar o sistema</p>
      <PrimaryUploadButton onFileSelect={file => setFile(file)}> Escolher planilha </PrimaryUploadButton>
    </>
  )

  const ConfirmUploadScreen = () => (
    <>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <InsertDriveFile style={{fontSize: 80, color: '#66667B'}}/>
        <p style={{textAlign: 'left'}}>{ file.name }</p>
      </div>
      <p>Deseja atualizar o sistema a partir da planilha selecionada?</p>
      <PrimaryButton onClick={handleSystemUpdate}>Sim, atualize o sistema</PrimaryButton>
      <SecondaryButton onClick={() => setFile(undefined)}>Não, escolher outra planilha</SecondaryButton>
    </>
  )

  const UpdateSuccessfulScreen = () => (
    <>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <CheckCircle style={{fontSize: 80, color: '#66667B'}}/>
      </div>
      <p>Sistema atualizado com sucesso!</p>
      <PrimaryButton onClick={handleSystemUpdate}>Voltar à home</PrimaryButton>
    </>
  )

  return (
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
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let response;
  let authorized;
  try {
    response = await ApiService.getMenu(sessionStorage.getItem('user_token'))
    const allowedRoutes: string[] = response.data.map(href => href);
    authorized = allowedRoutes.includes('/atualizar-dados');
  } catch (err) {
    authorized = false;
  }
  
  return {props: { authorized }}
}

const Container = styled.div`
    max-width: 100%;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
`