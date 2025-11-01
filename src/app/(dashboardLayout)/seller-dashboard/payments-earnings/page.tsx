import { PaymentEarningChart } from '@/components/shared/dashboardLayout/PaymentsEarnings/PaymentEarningChart';
import { PaymentEarningMatrix } from '@/components/shared/dashboardLayout/PaymentsEarnings/PaymentEarningMatrix';
import PaymentHistoryTable from '@/components/shared/dashboardLayout/PaymentsEarnings/PaymentHistoryTable';
import React from 'react';

const page = () => {
    return (
        <div>
            <PaymentEarningMatrix />
            <PaymentEarningChart />
            <PaymentHistoryTable />
        </div>
    );
};

export default page;