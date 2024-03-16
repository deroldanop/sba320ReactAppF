import { Link } from 'react-router-dom';

export function NavBar() {
  return (
    <div className='nav'>
      <Link to='/'>
        <div className='mainPage'>Current Weather</div>
      </Link>
      <Link to='/FourDaysWeather'>
        <div></div>
      </Link>
      <Link to='/SixteenDaysWeather'>
        <div></div>
      </Link>
      
    </div>
  );
}


export default NavBar;