"use client";
import React, { useState, useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import TemplateData from "@/app/(data)/Template";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

const CreateNewContent: React.FC = () => {
  const params = useParams();
  const templateSlug = params["template-slug"] as string;

  // Find the selected template
  const selectedTemplate = TemplateData.find(
    (item) => item.slug === templateSlug
  );

  // Map 'desc' to 'description' to match the TEMPLATE type
  const mappedTemplate = selectedTemplate
    ? {
        ...selectedTemplate,
        description: selectedTemplate.desc, // Map 'desc' to 'description'
      }
    : undefined;

  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const router = useRouter();


  // Get totalUsage from context
  const { totalUsage } = useContext(TotalUsageContext) || { totalUsage: 0 };
  const {updateCreditUsage,setUpdateCreditUsage}=useContext(UpdateCreditUsageContext)
  /**
   * Used to generate content from AI
   * @param formData 
   * @returns 
   */
  const GenerateAIContent = async (formData: any) => {
    try {
      if (totalUsage >= 10000) {
        console.log("Please upgrade");
        router.push("/dashboard/billing");
        return;
      }

      setLoading(true);

      if (!mappedTemplate) {
        console.error("Template not found.");
        return;
      }

      const selectedPrompt = mappedTemplate.aiPrompt;
      const finalAiPrompt = JSON.stringify(formData) + ", " + selectedPrompt;

      const result = await chatSession.sendMessage(finalAiPrompt);
      const responseText = await result.response.text();

      console.log(responseText);
      setAiOutput(responseText);

      await saveInDb(formData, mappedTemplate.slug, responseText);
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);

      setUpdateCreditUsage(Date.now())
    }
  };

  const saveInDb = async (formData: any, slug: string, aiOutput: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: JSON.stringify(formData),
        templateSlug: slug,
        aiResponse: aiOutput,
        createdBy: user?.primaryEmailAddress?.emailAddress || "Unknown",
        createdAt: new Date(),
      });

      console.log("Saved to DB:", result);
    } catch (error) {
      console.error("Error saving to DB:", error);
    }
  };

  return (
    <div className="p-10">
      <Link href="/dashboard">
        <Button>
          <ArrowLeft className="mr-2" />
          Back
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={mappedTemplate}
          userFormInput={GenerateAIContent} // Use userFormInput instead of onSubmit
          loading={loading}
        />

        {/* Output Section */}
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewContent;