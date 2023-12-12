export const type = {
  error: 'error',
  warning: 'warning',
  success: 'success',
  info: 'info',
}

export const colors = {
  [type.error]: {
    primary: '#e74c3c',
    secondary: '#c0392b',
  },
  [type.warning]: {
    primary: '#f39c12',
    secondary: '#d68910',
  },
  [type.success]: {
    primary: '#2ecc71',
    secondary: '#27ae60',
  },
  [type.info]: {
    primary: '#3498db',
    secondary: '#2980b9',
  },
}