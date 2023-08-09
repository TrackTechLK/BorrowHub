export const toDateString = (d) => {
  return (
    d.getFullYear() +
    "-" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + d.getDate()).slice(-2)
  );
};

export const toTimeString = (d) => {
  return (
    ("0" + (d.getHours() + 1)).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
  );
};
