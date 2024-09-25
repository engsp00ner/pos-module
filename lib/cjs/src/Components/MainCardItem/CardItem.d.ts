/// <reference types="react" />
import '../../CustomStyle/DropDownMenuStyle.css';
interface Props {
    ImgUrl?: string;
    ItemPrice: number;
    ProductName: string;
    itemkey: number;
    ProductDescription?: string;
}
export declare const CardItem: React.FC<Props>;
export {};
