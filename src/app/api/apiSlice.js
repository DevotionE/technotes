import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials } from "../../features/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://technotes-api.onrender.com",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

//created users by me
const usersData = {
  username: "Driz",
  password: "Dr1234",
  roles: ["Manager"],
};
fetch(baseQuery, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(usersData),
})
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network Not Responding");
    }
    return response.json();
  })
  .then((newUserData) => {
    console.log("New User Data:", newUserData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
//ends here

const baseQueryWithReauth = async (args, api, extraOptions) => {
  // console.log(args) // request url, method, body
  // console.log(api) // signal,dispatch, getState()
  // console.log(extraOptions) // custom like {shout: true}

  let result = await baseQuery(args, api, extraOptions);

  // if you want, handle other status codes, too
  if (result?.error?.status === 403) {
    console.log("sending refresh token");

    //send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);

    if (refreshResult?.data) {
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data }));

      //retry original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      if (refreshResult?.error?.status === 403) {
        refreshResult.error.data.messsage = "login session has expired.";
      }
      return refreshResult;
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Note", "User"],
  endpoints: (builder) => ({}),
});
