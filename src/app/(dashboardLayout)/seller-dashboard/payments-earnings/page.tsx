import { PaymentEarningChart } from '@/components/shared/dashboardLayout/PaymentsEarnings/PaymentEarningChart';
import { PaymentEarningMatrix } from '@/components/shared/dashboardLayout/PaymentsEarnings/PaymentEarningMatrix';
import React from 'react';

const page = () => {
    return (
        <div>
            <PaymentEarningMatrix />
            <PaymentEarningChart />
        </div>
    );
};

export default page;