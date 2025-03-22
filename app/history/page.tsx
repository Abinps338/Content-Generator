"use client"; // Ensure this is a client-side component

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Template from "../(data)/Template";
import { TEMPLATE } from "../dashboard/_components/TemplateListSection";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

async function fetchHistory(user: any) {
  try {
    const HistoryList: HISTORY[] = await db
      .select()
      .from(AIOutput)
      .where(eq(AIOutput.createdBy, user?.primaryEmailAddress?.emailAddress || ""))
      .orderBy(desc(AIOutput.id));

    console.log("History List:", HistoryList);
    return HistoryList;
  } catch (error) {
    console.error("Error fetching history:", error);
    throw error;
  }
}

function GetTemplateName(slug: string, templates: TEMPLATE[]) {
  const template = templates?.find((item) => item.slug === slug);
  return template;
}

export default function HistoryPage() {
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);
  const [templates, setTemplates] = useState<TEMPLATE[]>(Template);

  useEffect(() => {
    const fetchData = async () => {
      const user = await currentUser();
      if (user) {
        const data = await fetchHistory(user);
        setHistoryList(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <h2 className="text-gray-500">Search your previously generated AI Content</h2>
      <div className="grid grid-cols-7 font-bold bg-secondary mt-5 py-3 px-3">
        <h2 className="col-span-2">TEMPLATE</h2>
        <h2 className="col-span-2">AI RESP</h2>
        <h2>DATE</h2>
        <h2>WORDS</h2>
        <h2>COPY</h2>
      </div>
      <div>
        {historyList.map((item: HISTORY, index: number) => {
          const template = GetTemplateName(item.templateSlug, templates);
          return (
            <div key={index} className="grid grid-cols-7 my-5 py-3 px-3">
              <h2 className="col-span-2 flex gap-2 items-center">
                {template?.icon && (
                  <Image src={template.icon} alt="icon" width={25} height={25} />
                )}
                {template?.name}
              </h2>
              <h2 className="col-span-2 line-clamp-3">{item.aiResponse}</h2>
              <h2>{item.createdAt}</h2>
              <h2>{item.aiResponse.length}</h2>
              <h2>
                <Button
                  variant="ghost"
                  className="text-primary"
                  onClick={() => navigator.clipboard.writeText(item.aiResponse)}
                >
                  Copy
                </Button>
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
}