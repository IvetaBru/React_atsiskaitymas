import { useContext } from "react";
import styled from "styled-components";
// import bcrypt from "bcryptjs";

import RecipesContext from "../contexts/RecipesContext";
import { RecipesContextTypes } from "../../types";
import RecipeCard from "../UI/molecules/RecipeCard";

const StyledSection = styled.section`
    color: #C68B59;

    >div{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;   
    }
`

const Home = () => {
    
    // console.log('Sl@pta52', bcrypt.hashSync('Sl@pta52'));
    const { recipes } = useContext(RecipesContext) as RecipesContextTypes;
    
    return ( 
        <StyledSection>
            <h2>All recipes</h2>
            <div>
            {
                recipes ?
                recipes.map(recipe =>
                <RecipeCard 
                data={recipe}
                key={recipe.id}
                />
                ) : 
                <p>Loading...</p>
            }
            </div>
        </StyledSection>
     );
}
 
export default Home;