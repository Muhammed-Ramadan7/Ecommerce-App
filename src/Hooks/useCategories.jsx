import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useCategories() {
    const responce = useQuery({
        queryKey: ['categProducts'],
        queryFn: ()=> axios.get('https://ecommerce.routemisr.com/api/v1/categories'),
        select: (data)=> data.data.data
      })
  return responce
}
