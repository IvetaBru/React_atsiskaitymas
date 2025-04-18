import { useContext } from "react";
import styled from "styled-components";

import UsersContext from "../contexts/UsersContext";
import RecipesContext from "../contexts/RecipesContext";
import { UsersContextTypes, RecipesContextTypes } from "../../types";
import RecipeCard from "../UI/molecules/RecipeCard";

const StyledSection = styled.section`
    height: calc(100vh - 80px - 260px);
    color: #C68B59;

    >div{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;   
    }
    .loading{
        height: 100px;
        width: 100px;
    }
`

const UserPage = () => {

    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const { recipes, isLoading } = useContext(RecipesContext) as RecipesContextTypes; 

    const saved = recipes.filter((recipe) =>
        loggedInUser?.savedRecipes.includes(recipe.id)
    );
    const isEmpty = saved.length === 0;

    return ( 
        <StyledSection>
            <h2>Saved recipes</h2>
            <div>
            {
                isLoading && (
                    <div>
                        <img src="https://i.gifer.com/ZZ5H.gif" alt="loading" className="loading"/>
                    </div>
                )
            }
            {
                !isLoading && isEmpty && (
                    <p>No recipes yet</p>
                )
            }
            {
                !isLoading && !isEmpty && saved.map(recipe => (
                    <RecipeCard 
                    data={recipe}
                    key={recipe.id}
                    />
                ))
            }
            </div>
        </StyledSection>
     );
}
 
export default UserPage;