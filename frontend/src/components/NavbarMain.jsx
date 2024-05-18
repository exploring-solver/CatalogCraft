import React, { useContext } from 'react'
import AuthContext from '../Context/Auth/AuthContext';
import { NavbarWithMegaMenu } from './OutNavbar';
import { ComplexNavbar } from './InNavbar';

const NavbarMain = () => {
    const { isAuthenticated} = useContext(AuthContext);
    console.log(isAuthenticated);
  return (
    <div>
        {
            isAuthenticated ? <>
            <ComplexNavbar/>
            </>
            :
            <>
            <NavbarWithMegaMenu/>
            </>
        }
    </div>
  )
}

export default NavbarMain