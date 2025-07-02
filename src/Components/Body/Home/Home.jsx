import React from 'react'
import './Home.css'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='centerContainer'>
      <h1>Home</h1>
      <h3>Course Information</h3>
      <p>This course covers advanced topics in the field of web and mobile development. We will use modern technologies to create projects, including a end of semester term project. This will cover mostly client-side development tactics and practices.</p>
      <p>Click <a href='https://ccse.kennesaw.edu/it/' target='_blank' style={{color:'black'}}><b>here</b></a> to access the Kennesaw State CCSE Website</p>
      <h3>Project Purpose</h3>
      <p>This page is a project I made to conduct the tasks provided for the individual project. You can navigate to the individual milestones using the left side navigation bar or the links below:</p>
      <table className='milestone-links'>
        <tbody>
          <tr className='milestone-row'><td className='milestone-data'><Link to='/milestone1'>Milestone 1</Link></td></tr>
          <tr className='milestone-row'><td className='milestone-data'><Link to='/milestone2'>Milestone 2</Link></td></tr>
        </tbody>
      </table>
    </div>
  )
}

export default Home