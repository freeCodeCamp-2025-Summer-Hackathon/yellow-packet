
export const home = async (req, res) => {
  res.send("Hello World!");
}

export const signup = async (req, res) => {
  res.send("Signup Route CALLED");
}

export const login = async (req, res) => {
  res.send("Login Route CALLED");
}

export const logout = async (req, res) => {
  res.send("Logout Route CALLED");
}