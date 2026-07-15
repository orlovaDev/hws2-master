import {UserType} from '../HW8'

type ActionType =
  | { type: 'sort'; payload: 'up' | 'down' }
  | { type: 'check'; payload: number }

export const homeWorkReducer = (state: UserType[], action: ActionType): UserType[] => { // need to fix any
  switch (action.type) {
    case 'sort': { // by name
      const newState = [...state]
      return newState.sort((a, b) => {
        if (action.payload === 'up') {
          if (a.name > b.name) return 1
          if (a.name < b.name) return -1
          return 0
        } else {
          if (a.name < b.name) return 1
          if (a.name > b.name) return -1
          return 0
        }
      })
    }
    case
    'check'
    : {
      return state.filter(user => user.age >= action.payload)
    }
    default:
      return state
  }
}
