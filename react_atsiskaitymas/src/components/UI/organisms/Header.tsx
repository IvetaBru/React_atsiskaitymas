import styled from 'styled-components';
import { NavLink, Link } from 'react-router';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';

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
        gap: 10px;
        >a{
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
    }
`

const Header = () => {
    return ( 
        <StyledHeader>
            <div>
                {/* <img src="https://www.pngfind.com/pngs/m/504-5046425_recipe-icon-png-transparent-background-recipe-clipart-black.png" alt="logo" /> */}
                <BakeryDiningIcon className='krusenas'/>
            </div>
            <nav>
                <ul>
                    <li><NavLink to='/'>Home</NavLink></li>
                    <li><NavLink to='/add'>Add</NavLink></li>
                </ul>
            </nav>
            <div className='login'>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
            </div>       
        </StyledHeader>
     );
}
 
export default Header;