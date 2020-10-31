import { FunctionComponent } from "react";
import { SimpleCard } from "./simple-card";
import { OrderCardField } from "./order-card-field";
import Order from "../model/order";
import User from "../model/user";
import { addDays } from 'date-fns';
import Enterprise from "../model/enterprise";


type OrderCardProps = {
    order: Order;
    user?: User;
}

export const OrderCard: FunctionComponent<OrderCardProps> = ({ order, user }) => {
    return (
        <SimpleCard
            height={18}
            contentAlign='left'
            contentFlow='row'
        >
            <div>
                {
                    user ? <OrderCardField label="Cliente" content={user.name} /> : <OrderCardField label="Cliente" content={order.enterprise.name} />
                }                
                <OrderCardField label="Nº da OC" content={order.OcNumber} />
                <OrderCardField label="Data de entrega" content={addDays(new Date(order.deliveryDate), 1)} />
                <OrderCardField label="Status do pedido" content={order.orderStatus} emphasis/>
            </div>
            <div style={{textAlign: 'right'}}>
                {
                    user ? <span style={{fontSize: '.8rem'}}>{order.enterprise.name}</span> : <></>
                }
            </div>
        </SimpleCard>
    )
}