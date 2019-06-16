import React from 'react'
import Navbar from './Navbar'
import {
  putProduct,
  fetchProducts,
  createProCatAssociation,
  removeProCatAssociation
} from '../../store/products'
import {connect} from 'react-redux'

class EditProduct extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedProjectId: 0
    }
    this.handleAssign = this.handleAssign.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUnassign = this.handleUnassign.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  // componentDidMount() {
  //   this.props.fetchInitialRobots()
  // }

  handleSelect = function(evt) {
    this.setState({
      selectedProjectId: evt.target.value
    })
  }

  handleAssign = function(robotId, projectId) {
    this.props.assign(robotId, projectId)
  }

  handleUnassign = function(robotId, projectId) {
    this.props.unassign(robotId, projectId)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const robotName = evt.target.robotName.value
    const fuelLevel = evt.target.fuelLevel.value
    const robotId = evt.target.robotId.value
    this.props.put({id: robotId, name: robotName, fuelLevel: fuelLevel})
  }

  render() {
    // If refresh page instead of click link into the page, robots will be empty, should I fetch robts in componentDidMount()? No, should I fetch robots before mount?
    console.log('this.props: ', this.props)
    let robotId = this.props.match.params.robotId
    if (this.props.robots.length === 0) {
      // sometime there would be a second render after didMount, this branch will ensure that the second render taking over the screen
      return (
        <div>
          <p>
            <h1>Loading...</h1>
          </p>
        </div>
      )
    } else {
      const robots = this.props.robots
      const theRobot = robots.find(elem => String(elem.id) === robotId)
      return (
        <div id="editRobotPage">
          <div id="header">
            <h1>Edit Robot</h1>
          </div>
          <Navbar />
          <form onSubmit={this.handleSubmit}>
            <input type="hidden" name="robotId" value={theRobot.id} />
            <label htmlFor="robotName">Robot Name:</label>
            <input type="text" name="robotName" />
            <label htmlFor="fuelLevel">Fuel Level:</label>
            <input type="number" name="fuelLevel" />
            <button type="submit" className="submitButton">
              Save Changes
            </button>
          </form>
          <hr />
          <div> Projects assigned to {theRobot.name}: </div>
          <br />
          <select onChange={this.handleSelect}>
            <option value="" disabled selected>
              Select your project
            </option>
            {this.props.projects.map(project => (
              <option className="option" key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="submitButton"
            onClick={event =>
              this.handleAssign(robotId, this.state.selectedProjectId)
            }
          >
            Assign
          </button>
          <hr />
          <Projects
            displayedProjects={theRobot.projects}
            robotId={robotId}
            handleUnassign={this.handleUnassign}
          />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    robots: state.robots,
    projects: state.projects
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchInitialRobots: () => dispatch(fetchRobots()),
    put: robot => dispatch(putRobot(robot)),
    unassign: (robotId, projectId) =>
      dispatch(removeRobotAssociation(robotId, projectId)),
    assign: (robotId, projectId) =>
      dispatch(createRobotAssociation(robotId, projectId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct)
