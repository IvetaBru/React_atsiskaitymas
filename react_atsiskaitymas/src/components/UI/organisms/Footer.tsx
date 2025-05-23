import styled from "styled-components";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import YouTubeIcon from '@mui/icons-material/YouTube';

const StyledFooter = styled.footer`
    height: 200px;
    background-color: #C68B59;
    padding: 20px 300px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;
    .socials{
        display: flex;
        gap: 40px;
        >a{
            >svg{
                font-size: 30px;
                color: #FFF8F1;
            }
            >svg:hover{
                color: #A44A3F;
            }
        }
    }
    .info{
        display: flex;
        gap: 40px;
        a{
            color: #FFF8F1;
            text-decoration: none;
            font-weight: 600;
        }
        a:hover{
            text-decoration: underline solid 2px;
            text-underline-offset: 6px;
        }
    }
    .rights{
        >span{
            font-size: 13px;
        }
    }
`

const Footer = () => {
    return ( 
        <StyledFooter>
            <div className="socials">
                <a href="https://www.instagram.com/" target="blank"><InstagramIcon /></a>
                <a href="https://www.facebook.com/" target="blank"><FacebookIcon /></a>
                <a href="https://www.pinterest.com/" target="blank"><PinterestIcon /></a>
                <a href="https://www.youtube.com/" target="blank"><YouTubeIcon /></a>
            </div>
            <div className="info">
                <a href="#">Cookies</a>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms and Uses</a>
            </div>
            <div className="rights">
                <span>©Copyrights Iveta Bružė, 2025</span>
            </div>
        </StyledFooter>
     );
}
 
export default Footer;