import http from '@/utils/https/index'
export const getTestData = (data?: object) => {
  return http.request({
    api: "test",
    data,
    loading: true,
  });
}