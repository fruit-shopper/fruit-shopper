import React, {Component} from 'react'
import {connect} from 'react-redux'

export class Cart extends Component {
  render() {
    return <div />
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
