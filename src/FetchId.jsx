import React, { useEffect, Fragment, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from 'axios';

export function FetchId({ children }) {
  const [newToken, setNewToken] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const adminID = searchParams.get('adminID')
  let token = newToken || localStorage.getItem("token");

  useEffect(() => {
    if (adminID) {
      try {
        axios.post(`http://localhost:5000/admins/loginAdminId`, { id: adminID }, {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }).then(resp => {
          console.log({ resp })

          const newToken = resp.data.data.token;
          localStorage.setItem('superAdminToken', token);

          localStorage.setItem('token', newToken);
          setNewToken(newToken);
        })
      } catch (error) {
        console.error('An error occurred:', error);
      }
    }
  }, [adminID])

  return <Fragment key={encodeURIComponent(token)}>{children}</Fragment>
}
