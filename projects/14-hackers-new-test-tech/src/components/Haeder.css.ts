import { style } from '@vanilla-extract/css'

export const header = style({
  alignItems: 'center',
  borderBottom: '1px solid #eee',
  display: 'flex',
  gap: '1rem',
  padding: '.75rem 2rem'
})

export const link = style({
  fontSize: '18px',
  margin: 0,
  textDecoration: 'none'
})

export const img = style({
  width: '30px',
  height: '30px'
})
