const initState = {
    isLoading: false,
}

type InitStateType = typeof initState

export const loadingReducer = (state: InitStateType = initState, action: LoadingActionType): InitStateType => {
  switch (action.type) {
    case 'CHANGE_LOADING':
      // 3. Возвращаем новый объект стейта, перезаписывая isLoading значением из action
      return {
        ...state,
        isLoading: action.isLoading
      }
    // break здесь не нужен, так как return уже завершил работу функции
    default:
      return state
  }
}

type LoadingActionType = {
    type: 'CHANGE_LOADING'
    isLoading: boolean
}

export const loadingAC = (isLoading: boolean): LoadingActionType => ({
    type: 'CHANGE_LOADING',
    isLoading,
})

