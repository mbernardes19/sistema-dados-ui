import React, { FunctionComponent } from "react";
import { TextInput } from "../components/text-input";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import { PrimaryButton } from "../components/primary-button";
import { SecondaryButton } from "../components/secondary-button";

type FormProps = {

}

export const LoginForm: FunctionComponent<FormProps> = () => {
    const { register, handleSubmit, errors } = useForm();

    const onSubmit = data => console.log(data);

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <h1 style={{color: '#66667B', fontWeight: 400, marginBottom: '2rem'}}>Acesse o sistema</h1>
            <div style={{display: 'grid', gridRowGap: '1rem'}}>
                <TextInput name='email' label='Email' inputRef={register} />
                <TextInput name='senha' label='Senha' type='password' inputRef={register} />
            </div>
            <div style={{display: 'grid', gridRowGap: '.5rem', marginTop: '2rem', marginBottom: '2rem', width: '100%'}}>
                <PrimaryButton>Fazer login</PrimaryButton>
                <SecondaryButton>Criar um cadastro</SecondaryButton>
            </div>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    flex-flow: column wrap
`
