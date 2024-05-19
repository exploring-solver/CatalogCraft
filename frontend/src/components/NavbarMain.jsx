import React, { useContext } from 'react'
import { NavbarWithMegaMenu } from './OutNavbar';
import { ComplexNavbar } from './InNavbar';
import AuthContext from './Context/Auth/AuthContext';

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