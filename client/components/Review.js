import React from 'react'
import {Container, Rating, Divider} from 'semantic-ui-react'

export const Review = props => {
  return (
    <Container className="centered" text>
      <Divider />
      <h4 align="left">
        review by <i>{props.review.user.name}</i>
      </h4>
      <div align="left">
        <Rating icon="star" rating={props.review.rating} maxRating={5} />
      </div>

      {/* <div className="ui star rating" data-rating="3"></div> */}
      <div className="justify-text">{props.review.text}</div>
      <Divider />
      {/* <h3 align="right">
        Rating:{' '}
        <Rating icon="star" rating={props.review.rating} maxRating={5} />
      </h3> */}
    </Container>
  )
}

export default Review
