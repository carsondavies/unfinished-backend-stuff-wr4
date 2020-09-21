import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Hooks = () => {
  const [countryId, setCountryId] = useState(0)
  const [patriotic, setPatriotic] = useState(false)
  const [search, setSearch] = useState('')
  const [tanks, setTanks] = useState([])

  useEffect(() => {
    getTanks()
  }, [search, patriotic, countryId])

  const getTanks = () => {
    axios.get(`/api/tanks/${countryId}?search=${search}&patriotic=${patriotic}`)
      .then(res => setTanks(res.data))
      .catch(err => console.log(err))
  }

  console.log(tanks, search, patriotic, countryId)
  return (
    <div>
      <input placeholder='Search Here'
        value={search}
        onChange={(e) => setSearch(e.target.value)} />
      <input type='number'
        value={countryId}
        onChange={e => setCountryId(e.target.value)} />
      <input type='checkbox'
        onChange={() => setPatriotic(!patriotic)} />

      <button onClick={() => getTanks()}>Filter</button>
      {tanks.map(tank => {
        return (
          <div key={tank.tank_id}>
            {tank.tank_name}
          </div>
        )
      })}
    </div>
  )
}

export default Hooks