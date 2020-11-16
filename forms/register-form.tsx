import React, { FunctionComponent, useState, useContext, useEffect, createRef } from "react";
import { TextInput } from "../components/text-input";
import { useForm } from 'react-hook-form';
import styled from "styled-components";
import { PrimaryButton } from "../components/button/primary-button";
import ApiService from "../services/api";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../services/context/user-context-provider";
import { AutoComplete } from "../components/autocomplete";
import Enterprise from "../model/enterprise";
import Cookies from 'js-cookie';
import { MenuItem, TextField } from "@material-ui/core";
import Autocomplete, { createFilterOptions } from "@material-ui/lab/Autocomplete";
import { AxiosResponse } from "axios";

type FormProps = {

}

export const RegisterForm: FunctionComponent<FormProps> = () => {
    const { register, handleSubmit, errors, setValue } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const {user, storeUser} = useContext(UserContext);
    const [enterprises, setEnterprises] = useState<EnterpriseOptionType[]>();
    const [enterpriseOption, setEnterpriseOption] = useState<EnterpriseOptionType | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>('');
    const router = useRouter();
    const [autoCompleteInputValue, setAutoCompleteInputValue] = useState<string>('')

    interface EnterpriseOptionType {
        inputValue?: string;
        enterprise: Enterprise
    }

    async function getEnterprises() {
        const currentEnterprises = await ApiService.getAllEnterprises(Cookies.get('user_token'))
        setEnterprises(currentEnterprises.map(enterprise => ({enterprise})))
    }

    const clearValues = () => {
        setValue('email', '');
        setValue('name', '')
        setValue('password', '')
        setValue('enterpriseName', '')
    }

    useEffect(() => {
        getEnterprises();
    }, [])

    const filter = createFilterOptions<EnterpriseOptionType>();

    const onSubmit = async (data) => {
        setError(false);
        setLoading(true);
        let response: AxiosResponse<any> | undefined;
        try {
            console.log(data);
            response = await ApiService.register({
                name: data.name,
                email: data.email,
                enterpriseName: data.enterpriseName,
                password: data.password,
                isAdmin: false
            })
            setErrorMessage('');
            clearValues();
        } catch (err) {
            setError(true);
            setErrorMessage(err.response.data.message)
        }
        setLoading(false);
    }

    return (
        <Form>
            <h1 style={{color: '#66667B', marginTop:'.5rem', fontWeight: 400, marginBottom: '2rem'}}>Cadastre um usuário</h1>
            <div style={{display: 'grid', gridRowGap: '1rem'}}>
                { error ? <span style={{color: '#f44336'}}>{errorMessage}</span> : <></> }
                <TextInput variant='outlined' error={errors.name ? true : false} helperText={errors.name ? errors.name.message : ''} name='name' label='Nome' inputRef={register({required: {value: true, message: 'Campo obrigatório'}})} />
                <TextInput variant='outlined' error={errors.email ? true : false} helperText={errors.email ? errors.email.message : ''} name='email' label='Email' inputRef={register({ required: {value: true, message: 'Campo obrigatório'}, pattern: {value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, message: 'Email em formato inválido'}})} />
                <AutoComplete
                    label="Empresa"
                    name="enterpriseName"
                    error={errors.enterpriseName ? true : false}
                    helperText={errors.enterpriseName ? errors.enterpriseName.message : ''}
                    inputRef={register({required: {value: true, message: 'Campo obrigatório'}})}
                    value={enterpriseOption}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setEnterpriseOption({
                                enterprise: {
                                    name: newValue
                                }
                            })
                        } else if (newValue && (newValue as EnterpriseOptionType).inputValue) {
                            setEnterpriseOption({
                                enterprise: {
                                    name: (newValue as EnterpriseOptionType).inputValue
                                }
                            })
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options as EnterpriseOptionType[], params);
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                enterprise: {
                                    name: `Criar empresa "${params.inputValue}"`
                                }
                            })
                        }
                        return filtered;
                    }}
                    options={enterprises}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if ((option as EnterpriseOptionType).inputValue) {
                            return (option as EnterpriseOptionType).inputValue;
                        }
                        return (option as EnterpriseOptionType).enterprise.name;
                    }}
                    renderOption={(option) => (option as EnterpriseOptionType).enterprise.name}
                />
                <TextInput variant='outlined' error={errors.password ? true : false} name='password' helperText={errors.password ? errors.password.message : ''} label='Senha' type='password' inputRef={register({required: {value: true, message: 'Campo obrigatório'}})} />
            </div>
            <div style={{display: 'grid', gridRowGap: '.5rem', marginTop: '2rem', marginBottom: '2rem', width: '100%'}}>
                {console.log(errors)}
                <PrimaryButton onClick={handleSubmit(onSubmit)}>Cadastrar</PrimaryButton>
            </div>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    flex-flow: column wrap;
`
