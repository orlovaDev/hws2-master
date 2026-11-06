import React from 'react'
import SuperSelect from '../../../hw07/common/c5-SuperSelect/SuperSelect'
import { Pagination } from '@mui/material'
import s from './SuperPagination.module.css'

export type SuperPaginationPropsType = {
  id?: string
  page: number
  itemsCountForPage: number
  totalCount: number
  onChange: (page: number, count: number) => void
}

const SuperPagination: React.FC<SuperPaginationPropsType> = (
  {
    page, itemsCountForPage, totalCount, onChange, id = 'hw15',
  }
) => {
  // Вычисляем количество страниц на основе общего количества элементов и элементов на страницу
  // Используем Math.ceil, чтобы округлить в большую сторону (например, 11 элементов по 4 на страницу = 3 страницы)
  const lastPage = Math.ceil(totalCount / itemsCountForPage) || 1

  const onChangeCallback = (event: React.ChangeEvent<unknown>, newPage: number) => {
    // Передаем новую страницу и текущее количество элементов в родительский компонент
    onChange(newPage, itemsCountForPage)
  }

  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // Получаем новое количество строк из select (приводим к числу)
    const newCount = +event.currentTarget.value

    // При изменении количества строк на странице принято сбрасывать пагинацию на 1 страницу,
    // чтобы избежать ситуации, когда текущая страница выходит за рамки нового диапазона
    onChange(1, newCount)
  }

  return (
    <div className={s.pagination}>
      <Pagination
        id={id + '-pagination'}
        sx={{
          // Базовые стили для выравнивания и кастомизации кнопок Material UI
          display: 'inline-block',
          '& .MuiPaginationItem-root': {
            borderRadius: '4px',
            '&.Mui-selected': {
              backgroundColor: '#0066CC',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#0052a3',
              },
            },
          },
        }}
        page={page}
        count={lastPage}
        onChange={onChangeCallback}
        hideNextButton
        hidePrevButton
      />

      <span className={s.text1}>
                показать
            </span>

      <SuperSelect
        id={id + '-pagination-select'}
        value={itemsCountForPage}
        options={[
          {id: 4, value: 4},
          {id: 7, value: 7},
          {id: 10, value: 10},
        ]}
        onChange={onChangeSelect}
      />

      <span className={s.text2}>
                строк в таблице
            </span>
    </div>
  )
}

export default SuperPagination
