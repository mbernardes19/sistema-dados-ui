import React, { FunctionComponent, useState, useContext, useEffect } from "react";
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
import { MenuItem } from "@material-ui/core";
import { createFilterOptions } from "@material-ui/lab/Autocomplete";

type FormProps = {

}

export const RegisterForm: FunctionComponent<FormProps> = () => {
    const { register, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const {user, storeUser} = useContext(UserContext);
    const [enterprises, setEnterprises] = useState<EnterpriseOptionType[]>();
    const [enterpriseOption, setEnterpriseOption] = useState<EnterpriseOptionType>()
    const router = useRouter();

    interface EnterpriseOptionType {
        inputValue?: string;
        enterprise: Enterprise
    }

    async function getEnterprises() {
        const currentEnterprises = await ApiService.getAllEnterprises(Cookies.get('user_token'))
        setEnterprises(currentEnterprises.map(enterprise => ({enterprise})))
    }

    useEffect(() => {
        getEnterprises();
    }, [])

    const filter = createFilterOptions<EnterpriseOptionType>();

    const onSubmit = async data => {
        setError(false);
        setLoading(true);
        try {
            console.log(data);
            const response = await ApiService.register({
                name: data.name,
                email: data.email,
                enterpriseName: data.enterpriseName,
                password: data.password,
                isAdmin: false
            })
            // const resp2 = await ApiService.getUser(response.data.access_token)
            // storeUser({ ...resp2.data, ...response.data });
            // sessionStorage.setItem('user_token', response.data.access_token)
            // router.push('/menu');
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    }

    return (
        <Form>
            <h1 style={{color: '#66667B', marginTop:'.5rem', fontWeight: 400, marginBottom: '2rem'}}>Cadastre um usuário</h1>
            <div style={{display: 'grid', gridRowGap: '1rem'}}>
                { error ? <span style={{color: '#f44336'}}>Usuário ou senha incorretos</span> : <></> }
                <TextInput error={errors.name ? true : false} name='name' label='Nome' inputRef={register} />
                <TextInput error={errors.email ? true : false} helperText={errors.email ? "Email em formato inválido" : ""} name='email' label='Email' inputRef={register({ pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})} />
                <AutoComplete
                    name="enterpriseName"
                    inputRef={register}
                    value={enterpriseOption}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setEnterpriseOption({
                                enterprise: {
                                    name: newValue
                                }
                            })
                        } else if (newValue && newValue.inputValue) {
                            setEnterpriseOption({
                                enterprise: {
                                    name: newValue.inputValue
                                }
                            })
                        } else {
                            setEnterpriseOption(newValue)
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                enterprise: {
                                    name: `Criar empresa '${params.inputValue}'`
                                }
                            })
                        }

                        return filtered;
                    }}
                    label="Empresa"
                    options={enterprises}
                    getOptionLabel={option => {
                        if (typeof option === 'string') {
                            return option
                        }

                        if (option.inputValue) {
                            return option.inputValue;
                        }

                        return option.enterprise.name;
                    }}
                    renderOption={(option) => option.enterprise.name}
                    style={{backgroundColor: '#F2F2F2'}}
                />
                <TextInput name='password' label='Senha' type='password' inputRef={register} />
            </div>
            <div style={{display: 'grid', gridRowGap: '.5rem', marginTop: '2rem', marginBottom: '2rem', width: '100%'}}>
                <PrimaryButton onClick={handleSubmit(onSubmit)}>Cadastrar</PrimaryButton>
            </div>
        </Form>
    )
}

const Form = styled.form`
    display: flex;
    flex-flow: column wrap
`
