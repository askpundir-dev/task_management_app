export const validateRegisterForm = (email, password, username) => {
  if (!username.trim()) {
    return "Username is required";
  }
  if (username.length < 3) {
    return "Username must be at least 3 characters";
  }
  if (!/^[A-Za-z][A-Za-z0-9_ ]+$/.test(username)) {
    return "Username can only contain letters, numbers, underscores or spaces";
  }

  if (!email.trim()) {
    return "Email is required";
  }
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return "Please enter a valid email address";
  }

  if (!password.trim()) {
    return "Password is required";
  }
  if (password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (password === email) {
    return "You can not use your email address as your password. Try something different.";
  }

  return null; // no errors
};
