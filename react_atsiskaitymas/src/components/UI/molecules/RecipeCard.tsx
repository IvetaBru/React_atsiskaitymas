import styled from "styled-components";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import DeleteIcon from '@mui/icons-material/Delete';

import { Recipe, RecipesContextTypes, UsersContextTypes } from "../../../types";
import UsersContext from "../../contexts/UsersContext";
import { useContext } from "react";
import RecipesContext from "../../contexts/RecipesContext";

type Props = {
    data: Recipe
}

const StyledCard = styled.div`
    width: 420px;
    height: 270px;

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
                font-weight: 600;
            }
            >span:last-child{
                >button{
                    background-color:#C68B59;
                    border: none;
                    cursor: pointer;
                    >svg{
                        color: #FFF8F1;
                    }
                    >.reaHeart{
                        color: #A44A3F; 
                    }
                }
                >button:hover{
                    >svg{
                        color: #A44A3F;
                    }
                }
            }
        }
        >span{
            font-weight: 600;
        }
    }
`

const RecipeCard = ({ data }: Props) => {

    const { users, loggedInUser, savedRecipes, unsavedRecipes } = useContext(UsersContext) as UsersContextTypes;
    const { removeOneRecipe } = useContext(RecipesContext) as RecipesContextTypes;

    const author = users.find(user => user.id === data.authorId);
    const isSaved = loggedInUser?.savedRecipes.includes(data.id);
    const isAuthor = loggedInUser?.id === data.authorId;

    const handleToggleSave = () => {
        if(!loggedInUser) return;
        if(isSaved){
            unsavedRecipes(data.id);
        }else{
            savedRecipes(data.id);
        }
    }

    const handleDelete = () => {
        removeOneRecipe(data.id)
    }
    
    return ( 
        <StyledCard>
            <img 
                src={data.image} 
                alt={data.title}
            />
            <div className="info">
                <div className="userPart">
                    <span><AccountCircleIcon /> {author?.username}</span>
                    <span>
                        {
                            isAuthor && (
                            <button onClick={handleDelete}>
                                <DeleteIcon />
                            </button>
                            )
                        }
                        <button onClick={handleToggleSave}>
                            {
                                loggedInUser ? (
                                isSaved ? (
                                    <FavoriteIcon className="reaHeart" />
                                ) : (
                                    <FavoriteBorderIcon />
                                )
                            ) : null
                            }
                        </button>
                    </span>
                </div>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                <span>{new Date(data.createdAt).toLocaleDateString()}</span>
            </div>

        </StyledCard>
     );
}
 
export default RecipeCard;