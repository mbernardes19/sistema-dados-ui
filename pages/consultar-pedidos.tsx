import { SimpleCard } from "../components/simple-card"
import { RegisterForm } from "../forms/register-form"
import styled from "styled-components"
import { GetServerSideProps } from "next"
import ApiService from "../services/api"
import Cookie from 'cookies';
import CookiesJS from 'js-cookie';
import { OrderCard } from "../components/order-card"
import { useEffect, useState } from "react"
import Order from "../model/order"
import { useRouter } from "next/router"


export default function ConsultarPedidos({authenticated, authorized, user}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function getOrders() {
      const orders = await ApiService.getUserOrders(CookiesJS.get('user_token'));
      setOrders(orders);
    }
    getOrders()
  }, [])

  if (!authenticated) {
    return (
      <div></div>
    )
  }

    return (
      <>
        <div style={{display: 'flex', flexDirection: 'row'}}>
      <a onClick={() => {
        CookiesJS.remove('user_token');
        router.push('/')
        }} style={{marginLeft: 'auto', color: '#fff', cursor: 'pointer', paddingRight: '1rem'}}>Sair</a>
        </div>
        <Container>
          <div style={{width: '100%', display: 'flex', flexFlow: 'column', justifyContent
          : 'center', alignItems: 'center', margin: '0 auto'}}>
          {
            orders && orders.map(order => (
              <OrderCard order={order} user={user} />
            ))
          }
          </div>
        </Container>
      </>
      )
    }
    
const Container = styled.div`
  max-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column wrap;
  overflow: scroll;
`

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  let response;
  let response2;
  let authorized;
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
  
  try {
    response2 = await ApiService.getMenu(token)
    const allowedRoutes: string[] = response2.data.map(menu => menu.href);
    console.log('ALLOWED ROUTES', allowedRoutes)
    authorized = allowedRoutes.includes('/atualizar-dados');
  } catch (err) {
    authorized = false;
  }

  console.log('AUTHENTICATED', authenticated, 'AUTHORIZED', authorized)

  return {props: { authorized, authenticated, user }}
}