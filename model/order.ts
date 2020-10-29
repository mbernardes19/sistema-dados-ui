import Enterprise from "./enterprise";
import OrderedItem from "./ordered-item";

export default interface Order {
    orderNumber: string;
    orderStatus: string;
    orderedItems: OrderedItem[];
    orderCode: string;
    emissionDate: Date;
    OcNumber: string;
    OcItemNumber: string;
    deliveryDate: Date;
    billingPredictionDate: Date | null;
    billDocNumber: string | null;
    billingDate: Date | null;
    collectionNumber: string;
    enterprise: Enterprise
}