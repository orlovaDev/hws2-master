import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
  const [timerId, setTimerId] = useState<number | undefined>(undefined)
  // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
  const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
  const [show, setShow] = useState<boolean>(false)

  const start = () => {
    // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
    // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
    if (timerId) clearInterval(timerId)

    const id = window.setInterval(() => {
      setDate(new Date())
    }, 1000)

    setTimerId(id)
  }

  const stop = () => {
    // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
    if (timerId !== undefined) {
      clearInterval(timerId)
      setTimerId(undefined)
    }
  }

  const onMouseEnter = () => {
    setShow(true) // Показываем дату при наведении
  }
  const onMouseLeave = () => {
    setShow(false) // Прячем дату, когда мышка уходит
  }

  const stringTime = date.toTimeString().split(' ')[0] || <br/> // Формат ЧЧ:ММ:СС

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0') // Месяцы в JS идут от 0 до 11
  const year = date.getFullYear()
  const stringDate = `${day}.${month}.${year}` || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем



  // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
  const stringDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(date) || <br/>
  const stringMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date) || <br/>


  return (
    <div className={s.clock}>
      <div
        id={'hw9-watch'}
        className={s.watch}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <span id={'hw9-day'}>{stringDay}</span>,{' '}
        <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
      </div>

      <div id={'hw9-more'}>
        <div className={s.more}>
          {show ? (
            <>
              <span id={'hw9-month'}>{stringMonth}</span>,{' '}
              <span id={'hw9-date'}>{stringDate}</span>
            </>
          ) : (
            <>
              <br />
            </>
          )}
        </div>
      </div>

      <div className={s.buttonsContainer}>
        <SuperButton
          id={'hw9-button-start'}
          disabled={timerId !== undefined} // пишут студенты // задизэйблить если таймер запущен
          onClick={start}
        >
          start
        </SuperButton>
        <SuperButton
          id={'hw9-button-stop'}
          disabled={timerId === undefined} // пишут студенты // задизэйблить если таймер не запущен
          onClick={stop}
        >
          stop
        </SuperButton>
      </div>
    </div>
  )
}

export default Clock
