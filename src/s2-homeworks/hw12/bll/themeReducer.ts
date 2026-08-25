export type ThemeState = {
  themeId: number
}

const initState: ThemeState = {
    themeId: 1,
}

export const changeThemeId = (id: number) => ({
  type: 'SET_THEME_ID' as const,
  id
})

export type ThemeActionsType = ReturnType<typeof changeThemeId>

export const themeReducer = (
  state: ThemeState = initState,
  action: ThemeActionsType
): ThemeState => {
  switch (action.type) {
    case 'SET_THEME_ID':
      return {
        ...state,
        themeId: Number(action.id)
      }
    default:
      return state
  }
}





