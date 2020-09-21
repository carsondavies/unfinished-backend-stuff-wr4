import React from 'react'
import axios from 'axios'

class StateApp extends React.Component {

  constructor() {
    super()

    this.state = {
      counrtyId: 0,
      patriotic: false,
      search: '',
      tanks: []
    }
  }

  componentDidMount() {
    this.getTanks()
  }


  getTanks = () => {
    const { patriotic, search, countryId } = this.state
    // patriotic just dictates whether or not you want to see your country's tanks
    axios.get(`/api/tanks/${countryId}?search=${search}&patriotic=${patriotic}`)
      .then(res => {
        this.setState({
          tanks: res.data
        })
      })
      .catch(err => console.log(err))
  }

  handleInput = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  togglePatriotic = () => {
    this.setState({
      patriotic: !this.state.patriotic
    })
  }

  render() {
    const { patriotic, search, countryId, tanks } = this.state
    return (
      <div className="App">
        <input placeholder='search' value={search} name='search' onChange={(e) => this.handleInput(e)} />
        <input type='number' placeholder='Country ID' value={countryId} name='countryId' onChange={(e) => this.handleInput(e)} />
        <input type='checkbox' placeholder='Patriotic?' name='patriotic' onChange={(e) => this.togglePatriotic()} />
        <button onClick={() => this.getTanks()}>Filter</button>
        {tanks.map(tank => {
          return (
            <div key={tank.tank_id}>
              {tank.tank_name}
            </div>
          )
        })}
      </div>
    );
  }
}

export default StateApp
