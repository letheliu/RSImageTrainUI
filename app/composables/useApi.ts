export const useApi = () => {
  const baseUrl = 'http://localhost:9696/api'

  const request = async (url: string, options: RequestInit = {}) => {
    try {
      const fullUrl = `${baseUrl}${url}`
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers
      }

      const response = await fetch(fullUrl, {
        ...options,
        headers
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return { data, error: null }
    } catch (err) {
      console.error('API 请求错误：', err)
      return { data: null, error: err instanceof Error ? err.message : '未知错误' }
    }
  }

  return {
    get: (url: string) => request(url, { method: 'GET' }),
    post: (url: string, data: unknown) => request(url, {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    put: (url: string, data: unknown) => request(url, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    delete: (url: string) => request(url, { method: 'DELETE' })
  }
}
