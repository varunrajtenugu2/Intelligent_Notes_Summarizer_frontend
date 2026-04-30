export interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Name validation
  if (!formData.name.trim()) {
    errors.name = "Full name is required";
  } else if (formData.name.trim().length < 2) {
    errors.name = "Full name must be at least 2 characters";
  } else if (formData.name.trim().length > 50) {
    errors.name = "Full name must not exceed 50 characters";
  }

  // Email validation
  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/(?=.*[a-z])/.test(formData.password)) {
    errors.password = "Password must contain at least one lowercase letter";
  } else if (!/(?=.*[A-Z])/.test(formData.password)) {
    errors.password = "Password must contain at least one uppercase letter";
  } else if (!/(?=.*\d)/.test(formData.password)) {
    errors.password = "Password must contain at least one number";
  } else if (!/(?=.*[@$!%*?&])/.test(formData.password)) {
    errors.password = "Password must contain at least one special character (@$!%*?&)";
  }

  // Confirm password validation
  if (!formData.confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export const validateField = (
  field: keyof FormData,
  value: string,
  allData: FormData
): string => {
  switch (field) {
    case "name":
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 2) return "Full name must be at least 2 characters";
      if (value.trim().length > 50) return "Full name must not exceed 50 characters";
      break;

    case "email":
      if (!value.trim()) return "Email is required";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
      break;

    case "password":
      if (!value) return "Password is required";
      if (value.length < 8) return "Password must be at least 8 characters";
      if (!/(?=.*[a-z])/.test(value)) return "Password must contain at least one lowercase letter";
      if (!/(?=.*[A-Z])/.test(value)) return "Password must contain at least one uppercase letter";
      if (!/(?=.*\d)/.test(value)) return "Password must contain at least one number";
      if (!/(?=.*[@$!%*?&])/.test(value)) return "Password must contain at least one special character (@$!%*?&)";
      break;

    case "confirmPassword":
      if (!value) return "Please confirm your password";
      if (value !== allData.password) return "Passwords do not match";
      break;

    default:
      break;
  }

  return "";
};
