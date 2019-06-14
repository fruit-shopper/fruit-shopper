import React from 'react'
import {Item, Image} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

export const SingleOrderView = props => {
  const orderInfo = props.order
  console.log(orderInfo)
  return (
    <Item divided relaxed className="justify-text">
      <img className="ui avatar image" src={orderInfo.image} floated="left" />
      <Item.Content>
        <h4>Order Description</h4>
        <Item.Header>
          Order was placed on:{' '}
          <span className="date">{orderInfo.createdAt.slice(0, 10)}</span>
          <br />
          <span>Price: ${orderInfo.price} </span>
          <br />
          <span>Quantity: {orderInfo.quantity} </span>
        </Item.Header>
        <Link to={`/products/${orderInfo.id}`}>
          <span className="name">{orderInfo.name}</span>
        </Link>

        <div>{orderInfo.description}</div>

        <Item.Description />
      </Item.Content>
    </Item>
  )
}

export default SingleOrderView
