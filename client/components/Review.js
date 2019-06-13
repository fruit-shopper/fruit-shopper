import React, {Component} from 'react'
import {Card} from 'semantic-ui-react'

export const Review = props => {
  console.log('props ', props)
  return (
    <Card className="centered">
      <p align="left">
        review by <b>some_name</b>
      </p>
      {/* <div className="ui star rating" data-rating="3"></div> */}
      <Card.Content>{props.review.text}</Card.Content>
    </Card>
  )
}

export default Review
