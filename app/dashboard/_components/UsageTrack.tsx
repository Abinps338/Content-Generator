"use client"; // Ensures component runs only on the client side

import React, { useEffect, useState, useContext } from "react";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { Button } from "@/components/ui/button";
import { useTotalUsage } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useTotalUsage(); // Use the custom hook
  const [maxWords, setMaxWords] = useState(1000);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [userSubscription, setUserSubscription] = useState(false);

  useEffect(() => {
    if (user) {
      GetData();
      ISUserSubscribe();
    }
  }, [updateCreditUsage, user]);

  const GetData = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
    
    console.log("Fetching AIOutput for user:", user.primaryEmailAddress.emailAddress);
  
    try {
      const result: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress || ""));
  
      console.log("Query result:", result);
      GetTotalUsage(result);
    } catch (error) {
      console.error("Database error:", error);
    }
  };
  
  const ISUserSubscribe = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;
  
    console.log("Checking subscription for user:", user.primaryEmailAddress.emailAddress);
  
    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(eq(UserSubscription.createdBy, user.primaryEmailAddress?.emailAddress || ""));
  
      console.log("Subscription check result:", result);
  
      if (result.length > 0) {
        setUserSubscription(true);
      }
    } catch (error) {
      console.error("Database error:", error);
    }
  };
  

  return (
    <div className="m-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{ width: `${(totalUsage / 10000) * 100}%` }}
          ></div>
        </div>
        <h2 className="text-sm my-2">{totalUsage.toLocaleString()}/10,000 credits used</h2>
      </div>
      <Button variant="secondary" className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
