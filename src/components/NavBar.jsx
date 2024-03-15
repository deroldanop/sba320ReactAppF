import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <div className='nav'>
      <Link to='/'>
        <div className='mainPage'>Weather App</div>
      </Link>
      {/* <Link to='/ThreeDayForecast'>
        <div></div>
      </Link> */}
      
    </div>
  );
}


export default NavBar;