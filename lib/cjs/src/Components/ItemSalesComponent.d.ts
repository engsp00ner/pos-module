import React from 'react';
type ItemSalesComponentProps = {
    totalRevenue: string;
    salesPercentage: number;
    productPercentage: number;
    communityPercentage: number;
    salesLabel: string;
    productLabel: string;
    communityLabel: string;
};
declare const ItemSalesComponent: React.FC<ItemSalesComponentProps>;
export default ItemSalesComponent;
