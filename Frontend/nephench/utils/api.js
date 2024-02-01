import axios from 'axios'
import { useState, useEffect } from 'react'
// import { BASE_URL } from "../../Utils/data-store"

const api = axios.create({
  baseURL: 'http://192.168.1.75:9096/api',
  headers: {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: 'accessHeader',
  },
})

api.interceptors.request.use(
  function (config) {
    console.log(config.url)
    //Do something before request is sent
    return config
  },
  function (error) {
    //Do something with request error
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    //Do something with response data
    return response
  },
  function (error) {
    //Do something with response error
    return Promise.reject(error)
  },
)

// common function for get
export const getDataFromApi = async (uri) => {
  const dataFromApi = await api.get(uri).then((res) => res.data)
  return dataFromApi
}

//common function for post
export const postDataToApi = async (uri, data) => {
  const newCreatedData = await api.post(uri, data).then((res) => res.data)
  return newCreatedData
}

//Common function for patch
export const updateDataToApi = async (uri, data, id) => {
  const updatedData = await api
    .patch(`${uri}/${id}`, data)
    .then((res) => res.data)

  return updatedData
}

//Common function for put
export const putDataToApi = async (uri, data, id) => {
  const updatedData = await api
    .put(`${uri}`, data)
    .then((res) => res.data)

  return updatedData
}

//Custom hook Function
export const useAxiosGet = (url) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const getApi = async () => {
      try {
        const response = await api.get(url)
        if (response.status === 200) {
          setData(response.data)
        } else {
          console.log(`Error ${response.status} ${response.statusText}`)
        }
      } catch (error) {
        console.log(`Error ${error.message}`)
      }
    }
    getApi()
  }, [url])
  return { data }
}