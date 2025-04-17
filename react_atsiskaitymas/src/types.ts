export type ChildrenProp = {
    children: React.ReactElement
}
export type Recipe = {
    id: string,
    title: string,
    description: string,
    image: string,
    createdAt: string,
    authorId: string,
    saved?: boolean
}
export type ActionTypes = 
{ type: 'setData', data: Recipe[] } |
{ type: 'addRecipe', newRecipe: Recipe } |
{ type: 'deleteRecipe', id: Recipe['id']} |
{ type: 'saveRecipe', id: Recipe['id']}

export type RecipesContextTypes = {
    recipes: Recipe[],
    dispatch: React.ActionDispatch<[action: ActionTypes]>,
    addNewRecipe: (newRecipe: Recipe) => void,
    removeOneRecipe: (id: Recipe["id"]) => void,
    saveOneRecipe: (id: Recipe["id"]) => void,
    findRecipe: (id: Recipe["id"]) => Recipe | string
}