"use client"; // Ensures the component runs on the client side

import React, { useState } from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { TotalUsageProvider } from '../(context)/TotalUsageContext';
import { UpdateCreditUsageContext } from '../(context)/UpdateCreditUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext'; // Assuming you have this context

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();

  return (
    <TotalUsageProvider value={{ totalUsage, setTotalUsage }}>
      <UserSubscriptionContext.Provider value={{ userSubscription, setUserSubscription }}>
        <UpdateCreditUsageContext.Provider value={{ updateCreditUsage, setUpdateCreditUsage }}>
          <div className="bg-slate-100 min-h-screen">
            <div className="md:w-64 hidden md:block fixed">
              <SideNav />
            </div>
            <div className="md:ml-64">
              <Header />
              {children}
            </div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageProvider>
  );
}

export default Layout;