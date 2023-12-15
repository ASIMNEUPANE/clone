import React from 'react'
import { useParams } from 'react-router'
import useCategory from '../../../hooks/useCategory'

export default function edit() {
  const {id}= useParams()
  const {getById}= useCategory()

  const getCAt = useCallback(
    async(id) => {
      await getById(id)
    },
    [getById],
  )
  
  return (
    <div>edit</div>
  )
}
