export function throwAPIError(error) {
  // ----------------------------------------
  // use this function inside catch block
  // ----------------------------------------
  // Normalize error
  // ----------------------------------------
  throw (
    error?.response?.data || {
      success: false,
      message: "Something went wrong",
    }
  );
}
