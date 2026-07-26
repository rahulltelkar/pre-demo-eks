import http from 'k6/http';
import { check } from 'k6';

const BASE_URL = __ENV.BASE_URL;;

export const options = {
  vus: 100,
  duration: '3m',
};

export default function () {
  let res = http.get(`${BASE_URL}/api/health`);

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  http.get(`${BASE_URL}/`);
}