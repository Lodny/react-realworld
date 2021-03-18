export function fetchCB(cb, url, addData = null) {
  console.log('util : fetchCB() : ', url, addData);

  fetch(url)
    .then((res) => {
      console.log('util : fetchCB() : res : ', res);
      return res.json();
    })
    .then((data) => {
      if (addData) data = { ...data, ...addData };
      cb(data);

      console.log('util : fetchCB() : data : ', data);
    })
    .catch((res) => {
      console.log('util : fetchCB() : fetch() : res : ', res);
      cb(res.json());
    });
}
