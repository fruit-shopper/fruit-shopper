import React from 'react'
import {Link} from 'react-router-dom'
import {Button, Grid, Image} from 'semantic-ui-react'

const Products = props => {
  const {
    displayedProducts,
    handleRemove,
    handleUnassign,
    orderId,
    handleAssign,
    fromAdmin
  } = props
  return (
    <Grid columns="equal" className="centered">
      {displayedProducts.map(product => (
        <div key={product.id} className="centered">
          <Grid.Column>
            <Image src={product.image} alt="image" size="small" />
            {fromAdmin ? (
              <Link to={`/products/edit/${product.id}`}>
                <h3> {product.name}</h3>
              </Link>
            ) : (
              <Link to={`/products/${product.id}`}>
                <h3> {product.name}</h3>
              </Link>
            )}
            <p>
              {product.categories &&
                product.categories.reduce(
                  (result, elem) => result + elem.name + ', ',
                  ''
                )}
            </p>
            {fromAdmin ? (
              <div />
            ) : (
              <div className="justify-products">
                {product.description.substr(0, 80)}
              </div>
            )}
            <p>Price: {product.price}</p>
            {fromAdmin ? <p>Quantity: {product.quantity}</p> : <div />}
            <div>
              {handleRemove ? (
                <Button
                  color="red"
                  size="mini"
                  onClick={event => handleRemove(product)}
                >
                  Remove
                </Button>
              ) : (
                <div />
              )}
            </div>
          </Grid.Column>
        </div>
      ))}
    </Grid>
  )
}

export default Products
