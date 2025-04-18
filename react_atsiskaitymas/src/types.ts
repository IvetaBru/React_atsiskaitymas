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
}
export type ActionTypes = 
{ type: 'setData', data: Recipe[] } |
{ type: 'addRecipe', newRecipe: Recipe } |
{ type: 'deleteRecipe', id: Recipe['id']} |
{ type: 'saveRecipe', id: Recipe['id']}

export type RecipesContextTypes = {
    recipes: Recipe[],
    dispatch: React.ActionDispatch<[action: ActionTypes]>,
    isLoading: boolean,
    addNewRecipe: (newRecipe: Recipe) => void,
    removeOneRecipe: (id: Recipe["id"]) => void,
}
export type User = {
    id: string,
    email: string,
    username: string,
    avatar?: string,
    birthdate: string,
    password: string,
    passwordText: string,
    savedRecipes: Recipe['id'][]
}
export type UserActionTypes = 
{ type: 'setUsers', data: User[] } |
{ type: 'addUser', newUser: User } |
{ type: 'saveRecipe', userId: User['id'], recipeId: Recipe['id']} |
{ type: 'unsaveRecipe', userId: User['id'], recipeId: Recipe['id']} 

export type UsersContextTypes = {
    users: User[],
    dispatch: React.ActionDispatch<[action: UserActionTypes]>,
    loggedInUser: User | null,
    setLoggedInUser: React.Dispatch<React.SetStateAction<User | null>>,
    addNewUser: (newUser: User) => void,
    savedRecipes: (id: Recipe["id"]) => void,
    unsavedRecipes: (id: Recipe["id"]) => void
}