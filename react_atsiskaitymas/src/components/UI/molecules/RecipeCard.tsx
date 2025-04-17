import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

import { Recipe } from "../../../types";

type Props = {
    data: Recipe
}

const StyledCard = styled.div`
    width: 430px;
    height: 250px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #FFF8F1;
    background-color: #C68B59;
    border-radius: 10px;

    >img{
        width: 200px;
        height: 100%;
        border-radius: 10px 0px 0px 10px;   
        object-fit: cover;  
    }
    
    >.info{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        height: 100%;
        >h3, p{
            margin: 0;
        }
        >.userPart{
            display: flex;
            justify-content: space-between;
            align-items: center;
            >span{
                display: flex;
                align-items: center;
                gap: 5px;
            }
            >svg{
                color: #A44A3F;
            }
        }
        >span{
            font-weight: 600;
        }
    }
`

const RecipeCard = ({ data }: Props) => {
    return ( 
        <StyledCard>
            <img 
                src={data.image} 
                alt={data.title}
            />
            <div className="info">
                <div className="userPart">
                    <span><AccountCircleIcon />Name</span>
                    <FavoriteIcon />
                </div>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <span>{new Date(data.createdAt).toLocaleDateString()}</span>
            </div>

        </StyledCard>
     );
}
 
export default RecipeCard;