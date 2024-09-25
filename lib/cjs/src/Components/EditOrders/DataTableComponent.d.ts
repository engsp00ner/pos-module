import React from 'react';
import 'datatables.net';
import 'datatables.net-dt/css/dataTables.dataTables.css';
interface OrderItem {
    id: string;
    name: string;
    price: number;
    ItemAmount: number;
    image: string;
}
interface Order {
    Id: string;
    orderDate: string;
    totalAmount: number;
    items: OrderItem[];
}
interface DataTableProps {
    data: Order[];
}
declare const DataTableComponent: React.FC<DataTableProps>;
export default DataTableComponent;
