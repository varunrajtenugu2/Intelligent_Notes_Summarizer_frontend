// Form validation utilities
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = {
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumbers: /\d/,
  hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
};

export const validateEmail = (email: string): boolean => {
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { isValid: boolean; strength: 'weak' | 'medium' | 'strong' } => {
  if (password.length < 8) {
    return { isValid: false, strength: 'weak' };
  }

  const hasUpperCase = passwordRegex.hasUpperCase.test(password);
  const hasLowerCase = passwordRegex.hasLowerCase.test(password);
  const hasNumbers = passwordRegex.hasNumbers.test(password);
  const hasSpecialChar = passwordRegex.hasSpecialChar.test(password);

  const strengthScore =
    (hasUpperCase ? 1 : 0) +
    (hasLowerCase ? 1 : 0) +
    (hasNumbers ? 1 : 0) +
    (hasSpecialChar ? 1 : 0);

  if (strengthScore >= 3) return { isValid: true, strength: 'strong' };
  if (strengthScore >= 2) return { isValid: true, strength: 'medium' };
  return { isValid: true, strength: 'weak' };
};

export const validatePasswordMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};
