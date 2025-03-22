import Template from '@/app/(data)/Template'
import React, { useState, useEffect } from 'react'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
  name: string
  description: string
  icon: string
  category: string
  slug: string
  aiPrompt: string
  form?: Form[]
}

export interface Form {
  label: string
  field: string
  name: string
  required?: boolean
}

function TemplateListSection({ userSearchInput }: any) {
  const [templateList, setTemplateList] = useState(Template);

  useEffect(() => {
    if (userSearchInput) {
      const filterData = Template.filter((item) =>
        item.name.toLowerCase().includes(userSearchInput.toLowerCase())
      );
      setTemplateList(filterData);
    } else {
      setTemplateList(Template);
    }
  }, [userSearchInput, Template]);



  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
      {Template.map((item, index) => (
       <TemplateCard 
        key={index} 
        {...item} 
        description={item.desc} // 'desc' -> 'description'
  />
))}

    </div>
  )
}

export default TemplateListSection
