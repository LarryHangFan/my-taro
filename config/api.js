const config = {
  development: {
    BASE_URL: 'http://42.192.48.162:9000',
    BASE_API: '/api',
  },
  production: {
    BASE_URL: '',
    BASE_API: '',
  },
};
export default config[process.env.NODE_ENV];
