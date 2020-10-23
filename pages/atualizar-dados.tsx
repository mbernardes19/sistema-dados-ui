import styled from 'styled-components';
import { SimpleCard } from '../components/simple-card';
import { CloudUpload, InsertDriveFile } from '@material-ui/icons'
import { PrimaryUploadButton } from '../components/button/primary-upload-button';
import { useState } from 'react';
import { PrimaryButton } from '../components/button/primary-button';
import { SecondaryButton } from '../components/button/secondary-button';

export default function AtualizarDados() {
  const [file, setFile] = useState<File | undefined>();

  const UploadFile = () => (
    <>
      <div>
        <CloudUpload style={{fontSize: 80, color: '#66667B'}}/>
      </div>
      <p>Clique abaixo para escolher uma planilha para atualizar o sistema</p>
      <PrimaryUploadButton onFileSelect={file => setFile(file)}> Escolher planilha </PrimaryUploadButton>
    </>
  )

  const ConfirmUpload = () => (
    <>
      <div style={{ display: 'flex', flexDirection: 'row'}}>
        <InsertDriveFile style={{fontSize: 80, color: '#66667B'}}/>
        <p style={{textAlign: 'left'}}>{ file.name }</p>
      </div>
      <p>Deseja atualizar o sistema a partir da planilha selecionada?</p>
      <PrimaryButton>Sim, atualize o sistema</PrimaryButton>
      <SecondaryButton onClick={() => setFile(undefined)}>Não, escolher outra planilha</SecondaryButton>
    </>
  )

  return (
    <Container>
        <SimpleCard>
          {
            file === undefined ? <UploadFile /> : <ConfirmUpload />
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