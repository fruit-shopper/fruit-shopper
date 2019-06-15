import React from 'react'
import {Link} from 'react-router-dom'
import {Image, Divider} from 'semantic-ui-react'

export const OrderHistorySingleProduct = props => {
  console.log('props in single product: ', props.product.Order_Product)

  return (
    <div>
      {' '}
      <Image src={props.product.image} avatar />
      <Link to={`/products/${props.product.id}`}>
        <span className="name">{props.product.name}</span>
      </Link>
      <br />
      <br />
      <span>Price: ${props.product.Order_Product.price} </span>
      <br />
      <br />
      <span>Quantity: {props.product.Order_Product.quantity} </span>
      <br />
      <br />
      <span>
        <text>Description: </text>
        {props.product.description}
      </span>
      <Divider hidden />
    </div>
  )
}

export default OrderHistorySingleProduct
