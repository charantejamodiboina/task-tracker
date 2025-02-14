import { useState } from 'react'

const useUrl = () => {
  const [url] = useState('http://127.0.0.1:8000') 
  return url
}

export default useUrl;