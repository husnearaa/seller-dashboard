


import { EditProductForm } from '@/components/shared/dashboardLayout/EditproductForm';
import { useParams } from 'next/navigation';
import React from 'react';

const EditProductPage = () => {
       const param = useParams();
    const productId = param.productId as string;
    console.log("productId:", productId);
    return (
        <div>
            <EditProductForm productId={productId} />
        </div>
    );
};

export default EditProductPage;