import axios from 'axios'

//ACTION TYPES

const SET_QUANTITY_PRICE = 'SET_QUANTITY_PRICE'
const GET_CART = 'GET_CART'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'

//INITIAL STATE
const initialState = []

//ACTION CREATOR
const setQP = QP => ({
  type: SET_QUANTITY_PRICE,
  QP
})

const getCart = cartContents => ({
  type: GET_CART,
  cartContents
})

const removeCartItem = item => ({
  type: REMOVE_CART_ITEM,
  item
})

const updateItem = updatedItem => ({
  type: UPDATE_ITEM,
  updatedItem
})

/**
 * THUNK CREATORS
 */
export const setQuantityPrice = (productId, quantityPrice) => {
  return async function(dispatch) {
    try {
      console.log('ProductId', productId)
      console.log('QP', quantityPrice)
      const {data} = await axios.post(`/api/cart/${productId}`, quantityPrice)
      dispatch(setQP(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const getCartProducts = () => {
  return async function(dispatch) {
    try {
      console.log('in the get thunk')
      //error here
      const {data} = await axios.get('/api/cart')
      console.log('response from getCartProducts', data)
      dispatch(getCart(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeProductFromCart = item => {
  return async function(dispatch) {
    // console.log('in delete thunk product id:', item)
    try {
      await axios.delete(`/api/cart/${item}`)
      dispatch(removeCartItem(item))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCartItem = (orderId, productId, quantity) => {
  return async function(dispatch) {
    try {
      //console.log("quantity in thunk", quantity)
      const {data} = await axios.put(`api/cart/${orderId}/${productId}`, {
        quantity: Number(quantity)
      })
      //console.log("updated row in thunk", data)
      dispatch(updateItem(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
//need this to show the cart
const cartReducer = function(state = initialState, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartContents
    // return  {...state, products: action.cartContents}
    // case SET_QUANTITY_PRICE:
    //   return [...state, action.QP]
    case REMOVE_CART_ITEM:
      // eslint-disable-next-line no-case-declarations
      let updatedCart = state.products.filter(
        product => product.id !== Number(action.item)
      )
      return {...state, products: updatedCart}
    case UPDATE_ITEM:
      // eslint-disable-next-line no-case-declarations
      console.log('!!!!!!!!', action)
      let updatedCartItem = state.products.map(product => {
        if (product.id === action.updatedItem.productId) {
          // console.log('>>>>>÷>>>', product)

          product.Order_Product.quantity = action.updatedItem.quantity
          return product
        } else {
          return product
        }
      })
      console.log('new cart', updatedCartItem)
      return {...state, products: updatedCartItem}
    default:
      return state
  }
}

export default cartReducer
