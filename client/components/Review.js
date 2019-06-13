import React from 'react'
import {Container, Rating, Divider} from 'semantic-ui-react'

export const Review = props => {
  console.log('props ', props)
  return (
    <Container className="centered" width={6} text>
      <Rating icon="star" rating={props.review.rating} maxRating={5} />
      <h4 align="left">
        review by <b>some_name</b>
        Rating:{' '}
      </h4>
      <Divider />

      {/* <div className="ui star rating" data-rating="3"></div> */}
      {props.review.text}
      <Divider />
      {/* <h3 align="right">
        Rating:{' '}
        <Rating icon="star" rating={props.review.rating} maxRating={5} />
      </h3> */}
    </Container>
  )
}

export default Review
