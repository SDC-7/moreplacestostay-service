import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  vus: 50,
  duration: '30s',
};

export default function() {
  const before = new Date().getTime();
  const T = 30; // time needed to complete a VU iteration

  for (let i = 0; i < 1000; i++) {
    let num = Math.floor((Math.random() * 10000000) + 1);
    const res = http.get(`http://localhost:3000/residences/${num}`);
    check(res, {
      'is status 200': (r) => r.status === 200,
    });
  }

  const after = new Date().getTime();
  const diff = (after - before) / 1000;
  const remainder = T - diff;
  if (remainder > 0) {
    sleep(remainder);
  } else {
    console.warn(
      `Timer exhausted! The execution time of the test took longer than ${T} seconds`
    );
  }
}