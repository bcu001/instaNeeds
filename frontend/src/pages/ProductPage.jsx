import React from 'react'
import { useParams} from 'react-router-dom'

const ProductPage = () => {
  const {productTitle} = useParams();
  return (
    <div>
      {productTitle}
    </div>
  )
}

export default ProductPage
