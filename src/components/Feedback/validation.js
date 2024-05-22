export const validateName = (nameStr) => nameStr.length >= 2;

export const validateEmail = (emailStr) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(emailStr);
};

export const validatePhone = (phoneStr) => {
  const phoneRegex = /^[0-9\-+() ]{7,15}$/;
  return phoneRegex.test(phoneStr);
};
