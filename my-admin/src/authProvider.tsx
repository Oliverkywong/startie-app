import Dashboard from "./Dashboard";

const authProvider = {
  // called when the user attempts to log in
  login: async ({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: new Headers({ "Content-Type": "application/json" }),
      });

      if (res.status === 500) {
        throw new Error(res.statusText);
      }

      const result = await res.json();

      localStorage.setItem("admin", result.user.isadmin);
      localStorage.setItem("auth", result.jwt);
      localStorage.setItem("user", result.user.username);
      localStorage.setItem(
        "avatar",
        "https://visualpharm.com/assets/381/Admin-595b40b65ba036ed117d3b23.svg"
      );
    } catch (error) {
      throw new Error("Wrong username or password");
    }
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("admin");
    localStorage.removeItem("user");
    localStorage.removeItem("avatar");
    localStorage.removeItem("token");

    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: (error: any) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject();
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {

    if (localStorage.getItem("admin") === "false") {
       return Promise.reject({ message: "You are not admin" })
    }

    if (!localStorage.getItem("auth")) {
      return Promise.reject({ message: "login.required" })
    }

    return Promise.resolve()
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
  // {
  //     const role = localStorage.getItem('role');
  //     return Promise.resolve(role);
  // },
  getIdentity: (): any => {
    return Promise.resolve({
      id: localStorage.getItem("login"),
      fullName: localStorage.getItem("user"),
      avatar: localStorage.getItem("avatar"),
    });
  },
};

export default authProvider;
