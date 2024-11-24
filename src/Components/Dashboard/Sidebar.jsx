// import { Link } from 'react-router-dom';

// const Sidebar = () => {
//   return (
//     <div className="d-flex flex-column bg-light vh-100 p-3" style={{ width: '250px' }}>
//       <h5>Menu</h5>
//       <ul className="nav nav-pills flex-column">
//         <li className="nav-item">
//           <Link className="nav-link" to="/dashboard">Dashboard</Link>
//         </li>
//         {/* Add more links here */}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  const sidebarStyle = {
    width: isHovered ? '100px' : '0px', // Expand or collapse based on hover
    transition:'0.3s ease-in-out',
    backgroundColor: '#f8f9fa', // Light background color
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    padding:'10px'
  };

  const titleStyle = {
    fontSize: isHovered ? '1rem' : '0', // Show or hide the title
    transition: 'font-size 0.3s ease-in-out',
    marginBottom: '16px',
    whiteSpace: 'nowrap',
  };

  const navLinkStyle = {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    padding: '8px',
    textDecoration: 'none',
    color: '#000',
  };

  return (
    <div
      style={sidebarStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h5 style={titleStyle}>Menu</h5>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        <li>
          <Link style={navLinkStyle} to="/dashboard">
            Dashboard
          </Link>
        </li>
        {/* Add more links here */}
      </ul>
    </div>
  );
};

export default Sidebar;
