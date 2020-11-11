import styled from "styled-components"
import { GetServerSideProps } from "next"
import ApiService from "../services/api"
import Cookie from 'cookies';
import CookiesJS from 'js-cookie';
import { OrderCard } from "../components/order-card"
import { useEffect, useState, ChangeEvent } from "react"
import Order from "../model/order"
import { useRouter } from "next/router"
import { ArrowBack } from "@material-ui/icons"
import { OrderFilter } from "../components/order-filter";
import Enterprise from "../model/enterprise";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';


export default function ConsultarPedidos({authenticated, authorized, user}) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [enterprises, setEnterprises] = useState<Enterprise[]>([])
  const [selectedEnterprise, setSelectedEnterprise] = useState<Enterprise>();
  const [loading, setLoading] = useState<boolean>(false)
  const [pages, setPages] = useState<number>(0);
  const [currentPage, setCurrentpage] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    async function getAllEnterprises() {
      const allEnterprises = await ApiService.getAllEnterprises(CookiesJS.get('user_token'));
      setEnterprises(allEnterprises)
    }
    async function getUserOrders() {
      const response = await ApiService.getUserOrders(CookiesJS.get('user_token'));
      setOrders(response.items);
      setPages(response.meta.totalPages)
    }
    if (!authenticated) {
      router.push('/');
      return;
    }
    if (authorized) {
      getAllEnterprises();
    } else {
      console.log('orders')
      getUserOrders();
    }
  }, [])

  useEffect(() => {
    console.log(selectedEnterprise)
    setLoading(true)
    async function getOrdersFromEnterprise() {
      if (selectedEnterprise as any === 'Todas as empresas') {
      const response = await ApiService.getEnterpriseOrders(CookiesJS.get('user_token'))
      setOrders(response.items);
      setPages(response.meta.totalPages)
    } else {
      const response = await ApiService.getEnterpriseOrders(CookiesJS.get('user_token'), selectedEnterprise as any)
      setOrders(response.items);
      setPages(response.meta.totalPages)
    }
    }
    if (selectedEnterprise) {
      getOrdersFromEnterprise();
    }
  }, [selectedEnterprise])

  useEffect(() => {
    setLoading(false);
  }, [orders])

  const useStyles = makeStyles({
    root: {
      color: 'white',
      "& .MuiPaginationItem-page.Mui-selected": {
        color: 'white',
        backgroundColor: 'red'
      }
    },
    selected: {
      backgroundColor: '#666666 !important'
    }
  });

  const handleChange = (event: React.ChangeEvent<{value: Enterprise}>) => {
    setSelectedEnterprise(event.target.value);
  }

  const handlePageChange = async (event, value) => {
    setCurrentpage(value);
    if (authorized) {
      if (selectedEnterprise as any === 'Todas as empresas') {
        const response = await ApiService.getEnterpriseOrders(CookiesJS.get('user_token'), null, value)
        setOrders(response.items)
      } else {
        const response = await ApiService.getEnterpriseOrders(CookiesJS.get('user_token'), selectedEnterprise as any, value)
        setOrders(response.items)
      }
    } else if (authenticated) {
      const response = await ApiService.getUserOrders(CookiesJS.get('user_token'), value);
      setOrders(response.items);
    }
  }

  if (!authenticated) {
    return (
      <div></div>
    )
  }

  const classes = useStyles();

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
          {
            authorized ? <OrderFilter selected={selectedEnterprise} onChange={handleChange} enterprises={enterprises} /> : <></>
          }
          <div style={{width: '100%', display: 'flex', flexFlow: 'column', justifyContent
          : 'center', alignItems: 'center', margin: '0 auto'}}>
          {
            loading ? <CircularProgress /> :
            orders && orders.map(order => (
              <OrderCard order={order} />
            ))
          }
          <Pagination
            count={pages}
            page={currentPage}
            onChange={handlePageChange}
            renderItem={(item) => (
              <PaginationItem
                component={'li'}
                page={currentPage}
                classes={{root: classes.root, selected: classes.selected}}
                {...item}
              />
            )}
          />
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