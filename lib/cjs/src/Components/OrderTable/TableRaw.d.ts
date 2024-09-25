/// <reference types="react" />
import './InputStyle.css';
interface Props {
    itemId: string;
    ImgUrl?: string;
    ItemPrice: number;
    ItemAmount: number;
    ProductName: string;
    onAmountChange: (newAmount: number) => void;
}
export declare const TableRaw: React.FC<Props>;
export {};
