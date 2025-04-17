import styled from 'styled-components';
import { NavLink, Link, useNavigate } from 'react-router';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import UsersContext from '../../contexts/UsersContext';
import { useContext } from 'react';
import { UsersContextTypes } from '../../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledHeader = styled.header`
    height: 80px;
    background-color: #C68B59;
    padding: 0 300px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .krusenas{
        font-size: 100px;
    }
    >nav{
        >ul{
            display: flex;
            gap: 50px;
            >li{
                list-style: none;
                >a{
                    text-decoration: none;
                    font-size: 20px;
                    font-weight: 600;
                    color: #FFF8F1;
                }
                >a.active, a:hover{
                    text-decoration: underline solid 2px;
                    text-underline-offset: 6px;
                }
            }
        }
    }
    .login{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
        >a{
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;
            color: #FFF8F1;
            text-decoration: none;
            font-size: 15px;
            font-weight: 600;
            padding: 0px 8px;
            border: #FFF8F1 2px solid;
            border-radius: 15px;
        }
        >a:hover{
            background-color:#FFF8F1;
            color: #C68B59;
        }
        >.logout:hover{
            cursor: pointer;
            color: #A44A3F;
        }
    }
`

const Header = () => {

    const { loggedInUser, setLoggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const navigate = useNavigate();

    return ( 
        <StyledHeader>
            <div>
                <BakeryDiningIcon className='krusenas'/>
            </div>
            <nav>
                <ul>
                    {
                        loggedInUser ? (
                        <>
                            <li><NavLink to='/'>Home</NavLink></li>
                            <li><NavLink to='/add'>Add</NavLink></li>
                        </>
                        ) : ( <li><NavLink to='/'>Home</NavLink></li>)
                    }
                </ul>
            </nav>
            {
                loggedInUser ? (
                    <div className='login'>
                        <Link to='/user'>
                            <AccountCircleIcon/>
                            {loggedInUser.username}
                        </Link>
                        <LogoutIcon 
                            onClick={() => {
                            setLoggedInUser(null);
                            localStorage.removeItem("loggedInUser");
                            navigate("/");
                            }}
                            className='logout'
                        />
                    </div>
                    ) : (
                    <div className='login'>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                )
            }
        </StyledHeader>
    );
}
 
export default Header;