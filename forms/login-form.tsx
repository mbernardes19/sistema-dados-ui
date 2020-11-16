import React, { FunctionComponent, useState, useContext } from "react";
import { TextInput } from "../components/text-input";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import { PrimaryButton } from "../components/button/primary-button";
import ApiService from "../services/api";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../services/context/user-context-provider";
import Cookies from 'js-cookie'

type FormProps = {

}

export const LoginForm: FunctionComponent<FormProps> = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter();

    const onSubmit = async data => {
        setError(false);
        setLoading(true);
        try {
            const response = await ApiService.login({ email: data.email, password: data.password });
            const resp2 = await ApiService.getUser(response.data.access_token)
            Cookies.set('user_token', response.data.access_token)
            router.push('/menu');
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    }

    return (
        <Form>
            <h1 style={{color: '#66667B', marginTop:'.5rem', fontWeight: 400, marginBottom: '2rem'}}>Acesse o sistema</h1>
            <div style={{display: 'grid', gridRowGap: '1rem'}}>
                { error ? <span style={{color: '#f44336'}}>Usuário ou senha incorretos</span> : <></> }
                <TextInput variant="outlined" error={errors.email ? true : false} helperText={errors.email ? "Email em formato inválido" : ""} name='email' label='Email' inputRef={register({ pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
                <TextInput variant="outlined" name='password' label='Senha' type='password' inputRef={register} />
            </div>
            <div style={{display: 'grid', gridRowGap: '.5rem', marginTop: '2rem', marginBottom: '2rem', width: '100%'}}>
                <PrimaryButton onClick={handleSubmit(onSubmit)}>Fazer login</PrimaryButton>
            </div>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    flex-flow: column wrap
`
