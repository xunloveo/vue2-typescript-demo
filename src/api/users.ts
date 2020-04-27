import http from '@/utils/request'

export const getUserInfo = (data: any) => {
  return http.post('/users/info', data)
}

export const login = (data: any) => {
  // return http.post('/users/login', data)
  return http({
    url: '/users/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return http.post('/users/logout')
}
