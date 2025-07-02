import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {

  const [ showMilestones, setShowMilestones ] = useState(false);
  const [ milestones, setMilestones ] = useState(['Milestone 1', 'Milestone 2']);

  const onShowMilestones = () => {
    setShowMilestones(!showMilestones);
  }

  return (
    <div className='sideNav'>
        <Link to='/'>Home</Link>
        <Link onClick={onShowMilestones}>Milestones</Link>
        {showMilestones && milestones.map((milestone, index) => (
          <Link to={`/${milestone.toLowerCase().replace(' ', '')}`}
          key={index}
           id='milestoneSubHeaders'>
              {milestone}
            </Link>
        ))}
    </div>
  )
}

export default Header