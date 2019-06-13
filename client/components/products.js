import React from 'react'
import {Link} from 'react-router-dom'

const Products = props => {
  console.log(props)
  const {displayedProducts, handleUnassign, orderId, handleAssign} = props
  return (
    <div id="products" className="items-flex-container">
      {displayedProducts.map(product => (
        <div className="product" key={product.id}>
          <img src={product.image} alt="image" />
          <Link to={`/products/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <div>
            {handleAssign ? (
              <button
                className="assignButton"
                onClick={event => handleAssign(orderId, product.id)}
                type="button"
              >
                Add to Cart
              </button>
            ) : (
              <div />
            )}
            {handleUnassign ? (
              <button
                className="unassignButton"
                onClick={event => handleUnassign(orderId, product.id)}
                type="button"
              >
                unassign
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Products
