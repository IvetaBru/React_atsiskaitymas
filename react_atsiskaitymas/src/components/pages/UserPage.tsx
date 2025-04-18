import { useContext } from "react";
import styled from "styled-components";

import UsersContext from "../contexts/UsersContext";
import RecipesContext from "../contexts/RecipesContext";
import { UsersContextTypes, RecipesContextTypes } from "../../types";
import RecipeCard from "../UI/molecules/RecipeCard";

const StyledSection = styled.section`
    color: #C68B59;
`

const UserPage = () => {

    const { loggedInUser } = useContext(UsersContext) as UsersContextTypes;
    const { recipes } = useContext(RecipesContext) as RecipesContextTypes; 

    const saved = recipes.filter((recipe) =>
        loggedInUser?.savedRecipes.includes(recipe.id)
    );

    return ( 
        <StyledSection>
            <h2>Saved recipes</h2>
            {
            saved.length ? (
                saved.map((recipe) => (
                    <RecipeCard key={recipe.id} data={recipe} />
                ))
            ) : (<p>No saved recipes yet</p>)
            }
        </StyledSection>
     );
}
 
export default UserPage;