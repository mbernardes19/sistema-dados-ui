import Order from "./order";
import Item from "./item";
import ProdServInfo from "./prod-serv-info";

export default interface OrderedItem {
    id: number;
    item: Item
    status: string;
    prodServInfo: ProdServInfo;
    requestedQuantity: number;
    billedQuantity: number;
    pendingQuantity: number;
    deliveryDate: Date;
    invoiceNumber: string;
    invoiceEmissionDate: Date;
    order?: Order
}