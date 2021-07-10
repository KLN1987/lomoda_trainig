// запрос базы данных
const getData = async () => {
  const data = await fetch('db.json');

  if (data.ok) {
    return data.json();
  } else {
    throw new Error(`Данные не были полученны, ошибка ${data.status} ${data.statusText}`)
  }
};

const getGoods = (callback, value, prop) => {
  getData()
    .then(data => {
      if (value) {
        callback(data.filter(item => item[prop] === value));
      } else {
        callback(data);
      }
    }) 
    .catch(err => {
      console.error(err);
    });
};

export default getGoods;