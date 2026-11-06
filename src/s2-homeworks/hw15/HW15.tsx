import React, {useEffect, useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW15.module.css'
import axios from 'axios'
import SuperPagination from './common/c9-SuperPagination/SuperPagination'
import {useSearchParams} from 'react-router-dom'
import SuperSort from './common/c10-SuperSort/SuperSort'

/*
* 1 - дописать SuperPagination
* 2 - дописать SuperSort
* 3 - проверить pureChange тестами
* 3 - дописать sendQuery, onChangePagination, onChangeSort в HW15
* 4 - сделать стили в соответствии с дизайном
* 5 - добавить HW15 в HW5/pages/JuniorPlus
* */

type TechType = {
  id: number
  tech: string
  developer: string
}

type ParamsType = {
  sort: string
  page: number
  count: number
}

const getTechs = (params: ParamsType) => {
  return axios
    .get<{ techs: TechType[], totalCount: number }>(
      'https://samurai.it-incubator.io/api/3.0/homework/test3',
      {params}
    )
    .catch((e) => {
      alert(e.response?.data?.errorText || e.message)
    })
}

const HW15 = () => {
  const [sort, setSort] = useState('')
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(4)
  const [idLoading, setLoading] = useState(false)
  const [totalCount, setTotalCount] = useState(100)
  const [searchParams, setSearchParams] = useSearchParams()
  const [techs, setTechs] = useState<TechType[]>([])

  const sendQuery = (params: any) => {
    setLoading(true)
    getTechs(params)
      .then((res) => {
        // Проверяем, что ответ пришел и в нем есть данные
        if (res && res.data) {
          // Сохраняем пришедшие данные в стейт
          setTechs(res.data.techs)
          setTotalCount(res.data.totalCount)
        }
      })
      .finally(() => {
        // Выключаем лоадер в любом случае (успех или ошибка)
        setLoading(false)
      })
  }

  const onChangePagination = (newPage: number, newCount: number) => {
    // Обновляем локальные стейты страницы и количества элементов
    setPage(newPage)
    setCount(newCount)

    // Формируем новые параметры для запроса и URL
    const queryParams = {
      page: String(newPage),
      count: String(newCount),
      ...(sort ? {sort} : {}) // добавляем сортировку, если она есть
    }

    // Делаем запрос на сервер и обновляем URL-строку браузера
    sendQuery(queryParams)
    setSearchParams(queryParams)
  }
  const onChangeSort = (newSort: string) => {
    // Обновляем стейт сортировки и сбрасываем страницу на 1
    setSort(newSort)
    setPage(1)

    // Формируем новые параметры для запроса и URL
    const queryParams = {
      page: '1',
      count: String(count),
      ...(newSort ? {sort: newSort} : {}) // добавляем сортировку, если она не пустая
    }

    // Делаем запрос на сервер и обновляем URL-строку браузера
    sendQuery(queryParams)
    setSearchParams(queryParams)
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams)
    sendQuery({page: params.page, count: params.count})
    setPage(+params.page || 1)
    setCount(+params.count || 4)
  }, [])

  const mappedTechs = techs.map(t => (
    <div
      key={t.id}
      className={s.row}
    >
      <div
        id={'hw15-tech-' + t.id}
        className={s.tech}
      >
        {t.tech}
      </div>

      <div
        id={'hw15-developer-' + t.id}
        className={s.developer}
      >
        {t.developer}
      </div>
    </div>
  ))

  return (
    <div id={'hw15'}>
      <div className={s2.hwTitle}>Homework #15</div>

      <div className={s2.hw}>
        {idLoading && <div
          id={'hw15-loading'}
          className={s.loading}
        >Loading...</div>}

        <SuperPagination
          page={page}
          itemsCountForPage={count}
          totalCount={totalCount}
          onChange={onChangePagination}
        />

        <div className={s.rowHeader}>
          <div className={s.techHeader}>
            tech
            <SuperSort
              sort={sort}
              value={'tech'}
              onChange={onChangeSort}
            />
          </div>

          <div className={s.developerHeader}>
            developer
            <SuperSort
              sort={sort}
              value={'developer'}
              onChange={onChangeSort}
            />
          </div>
        </div>

        {mappedTechs}
      </div>
    </div>
  )
}

export default HW15
