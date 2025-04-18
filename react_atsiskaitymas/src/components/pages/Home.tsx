import { useContext } from "react";
import styled from "styled-components";

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
    .loading{
        height: 100px;
        width: 100px;
    }
`

const Home = () => {
    
    const { recipes, isLoading } = useContext(RecipesContext) as RecipesContextTypes;
    const isEmpty = recipes.length === 0;
    
    return ( 
        <StyledSection>
            <h2>All recipes</h2>
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
                !isLoading && !isEmpty && recipes.map(recipe => (
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
 
export default Home;