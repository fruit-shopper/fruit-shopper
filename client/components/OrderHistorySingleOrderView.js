import React from 'react'
import {Item, Divider, Header} from 'semantic-ui-react'
import OrderHistorySingleProduct from './OrderHistorySingleProduct'

export const OrderHistorySingleOrderView = props => {
  const orderInfo = props.order
  const productsInfo = orderInfo.products
  const orderStatus = props.order.status
  return (
    <Item divided="true" relaxed="true" className="justify-text order">
      <Item.Content>
        <Header as="h3">Order Description</Header>
        <Item.Header>
          Order was placed on:{' '}
          <span className="date">{orderInfo.createdAt.slice(0, 10)}</span>
        </Item.Header>
        <Divider hidden />
        <Item.Content>
          Order Status: <b>{orderStatus}</b>
        </Item.Content>
        {productsInfo.map(product => (
          <OrderHistorySingleProduct product={product} key={product.id} />
        ))}
      </Item.Content>
      <Divider hidden />
    </Item>
  )
}

export default OrderHistorySingleOrderView
