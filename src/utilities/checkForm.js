export const isFill = (data) => {
  if (data === undefined) return false;
  if (data.trim().length < 1) return false;
  else return true;
};

export const isValidEmail = (email) => {
  return email.match(
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/
  );
};

export const isValidPassword = (password) => {
  return password.match(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  );
};
