import { EditProductForm } from '@/components/shared/dashboardLayout/EditproductForm';
import React from 'react';

const EditProductPage = ({ params }: { params: { productId: string } }) => {
    console.log("productId:", params.productId);
    return (
        <div>
            <EditProductForm productId={params.productId} />
        </div>
    );
};

export default EditProductPage;