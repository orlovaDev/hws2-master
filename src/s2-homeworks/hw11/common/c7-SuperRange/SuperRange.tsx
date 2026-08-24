import React from 'react'
import {Slider, SliderProps} from '@mui/material'



const SuperRange: React.FC<SliderProps> = (props) => {
    return (
      <Slider
        sx={{
          borderRadius: '10px',
          width: '147px',
          height: '4px',
          '& .MuiSlider-track': {
            backgroundColor: '#0c2',
            borderColor: '#0c2',
          },
          '& .MuiSlider-rail': {
            backgroundColor: '#8b8b8b',
          },
          '& .MuiSlider-thumb': {
            backgroundColor: '#0c2',
            borderRadius: '100%',
            boxShadow: 'inset 0 0 0 2px #0c2, inset 0 0 0 7px #fff',
            '&:hover, &.Mui-focusVisible, &.Mui-active': {
              backgroundColor: '#0c2',
              boxShadow: 'inset 0 0 0 2px #0c2, inset 0 0 0 7px #fff',
            },
          },
          '&:has(.MuiSlider-thumb.Mui-active) .MuiSlider-track': {
            backgroundColor: '#0c2',
          },
        }}
            {...props} // отдаём слайдеру пропсы если они есть (value например там внутри)
        />
    )
}

export default SuperRange
