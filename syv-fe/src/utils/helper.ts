export const extractKeywordFromErrorMessage = (errorMessage: string) => {
  errorMessage = errorMessage.toLowerCase();

  if (errorMessage.includes("username")) {
    return ["username"];
  } else if (
    errorMessage.includes("email") &&
    errorMessage.includes("password")
  ) {
    return ["email", "password"];
  } else if (errorMessage.includes("email") || errorMessage.includes("user")) {
    return ["email"];
  } else if (errorMessage.includes("password")) {
    return ["password"];
  }

  return [];
};
