import { useRouter } from "next/router";
import { SimpleCard } from "../../../components/simple-card";
import { OrderCardField } from "../../../components/order-card-field";
import { useState, useEffect } from "react";
import Order from "../../../model/order";
import ApiService from "../../../services/api";
import CookiesJS from 'js-cookie';
import { AccordionSummary, Accordion, AccordionDetails, Grid } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { ItemsTable } from '../../../components/items-table';
import { ArrowBack } from "@material-ui/icons";
import { renderDate } from "../../../utils/date";
import { GetServerSideProps } from "next";
import Cookie from 'cookies';

export default function Pedido({ authenticated }) {
    const [order, setOrder] = useState<Order>()
    const router = useRouter();
    const { orderNumber } = router.query;

    useEffect(() => {
        async function getOrder() {
            console.log(router)
            console.log(CookiesJS.get('user_token'))
            console.log(orderNumber)
            const order = await ApiService.getOrder(CookiesJS.get('user_token'), orderNumber as string)
            console.log('ORDER', order)
            setOrder(order);
        }
        if (!authenticated) {
            router.push('/')
            return;
        }
        getOrder();
    }, [])

    if (!authenticated) {
        return (<></>)
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
        <div style={{maxWidth: '65rem', display: 'flex', justifyContent: 'center', margin: '0 auto'}}>
                <SimpleCard
                    fluid
                    contentFlow="row"
                    contentAlign="left"
                >
                    <Grid container spacing={5}>
                        <Grid style={{paddingBottom: 0}} item xs={12} sm={5}>
                            {
                                order ?
                                    (
                                        <>
                                            <OrderCardField label="Cliente" content={order.enterprise.name} />
                                            <OrderCardField label="Nº do pedido" content={order.orderNumber} />
                                        </>
                                    )
                                : (<></>)
                            }
                        </Grid>
                    <Grid style={{paddingBottom: 0}} item xs={12} sm={3}>
                        {
                            order ?
                                (
                                    <>
                                        <OrderCardField label="Nº da OC Item" content={order.OcItemNumber} />
                                        <OrderCardField label="Previsão de faturamento" content={order.billingPredictionDate? order.billDocNumber : '-'} />
                                    </>
                                )
                             : (<></>)
                        }
                    </Grid>
                    <Grid style={{paddingBottom: 0}} item xs={12} sm={4}>
                        {
                            order ?
                                (
                                    <>
                                        <OrderCardField label="Data de emissão" content={renderDate(order.emissionDate)} />
                                        <OrderCardField label="Data de entrega" content={renderDate(order.deliveryDate)} />
                                    </>
                                )
                             : (<></>)
                        }
                    </Grid>
                    <Grid style={{paddingBottom: 0}} item xs={12}>
                        {
                            order ?
                                (
                                    <>
                                        <OrderCardField label="Status do pedido" content={order.orderStatus} emphasis/>
                                    </>
                                )
                             : (<></>)
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {
                            order ?
                            (
                                <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    id='items-panel'
                                >
                                    <span>Lista de itens</span>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ItemsTable orderedItems={order.orderedItems} />
                                </AccordionDetails>
                            </Accordion>
                            )
                            : (<></>)
                        }
                    </Grid>
                    </Grid>
                </SimpleCard>
        </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    let response;
    let authenticated;
    let user;
    const cookies = new Cookie(req, res);
    const token = cookies.get('user_token')
  
    try {
      response = await ApiService.getUser(token)
      authenticated = response.data.id ? true : false;
      user = response.data;
      console.log(user);
    } catch (err) {
      authenticated = false;
    }
    
    return {props: { authenticated }}
  }