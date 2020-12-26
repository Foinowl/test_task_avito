



export const setLastItems = (data) => {
  console.log(data);
  localStorage.setItem("items", JSON.stringify(data))
}

export const getLastItems = () => {
  return JSON.parse(localStorage.getItem("items"))
}