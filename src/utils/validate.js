export const validateSignIn = (
  email,
  password,
  name = null,
  checkName = false
) => {
  console.log(password);
  const emailRegex = /^[^s@]+@[^s@]+.[^s@]+$/;
  const pswdrRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  const nameRegex = /^[A-Za-z\s]+$/;

  if (checkName) {
    const isValidName = nameRegex.test(name);
    if (!isValidName) return "Invalid Name";
  }

  const isValidEmail = emailRegex.test(email);
  if (!isValidEmail) return "Invalid Email";

  const isValidPswd = pswdrRegex.test(password);
  if (!isValidPswd) return "Invalid Password";

  return null;
};
