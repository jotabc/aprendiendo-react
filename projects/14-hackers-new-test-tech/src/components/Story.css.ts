import { style } from '@vanilla-extract/css'

export const story = style({
  color: '#374151',
  marginBottom: '.5rem'
})

export const storyTitle = style({
  color: '#111',
  textDecoration: 'none',
  fontSize: '18px'
})

export const storyHeader = style({
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  marginBottom: '2px',
  lineHeight: '24px'
})

export const storyFooter = style({
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  lineHeight: '24px',
  fontSize: '.75rem'
})

export const storyLink = style({
  color: '#888',
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
})
