import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import Greeting from './Greeting'
import { UserType } from './HW3'

type GreetingContainerPropsType = {
    users: UserType[] // need to fix any
    addUserCallback: (name: UserType["name"]) => void // need to fix any
}

export const pureAddUser = (name: UserType["name"],
                            setError:(error: string) => void,
                            setName: (name: UserType["name"]) => void,
                            addUserCallback: (name: UserType["name"]) => void) => {

  const trimmedName = name.trim() // убираем лишние пробелы по краям

  if (trimmedName === '') {
    setError('Ошибка! Введите имя!') // если пусто — показываем ошибку
  } else {
    addUserCallback(trimmedName) // если все ок — отправляем наверх в HW3
    setName('') // очищаем поле ввода
  }
}

export const pureOnBlur = (name: UserType["name"], setError: (error: string) => void) => {
  if (name.trim() === '') {
    setError('Ошибка! Введите имя!')
  }  // если имя пустое - показать ошибку
}

export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
  if (e.key === 'Enter') {
    addUser()
  }                // если нажата кнопка Enter - добавить
}



// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
    users,
    addUserCallback,
}) => {
    // деструктуризация пропсов
    const [name, setName] = useState<UserType["name"]>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const setNameCallback = (e:  ChangeEvent<HTMLInputElement>) => { // need to fix any
        setName(e.currentTarget.value) // need to fix
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length // need to fix
    const lastUserName =  users.length > 0 ? users[users.length - 1].name : ''// need to fix

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
