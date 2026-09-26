  // const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000'

  // type ApiSuccess<T> = {
  //   success: true
  //   data: T
  // }

  // type ApiError = {
  //   success: false
  //   error: {
  //     code: string
  //     message: string
  //   }
  // }

  // async function request<T>(
  //   path: string,
  //   options?: RequestInit,
  // ): Promise<T> {
  //   const token = localStorage.getItem('token')

  //   const res = await fetch(`${BASE_URL}${path}`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //       ...(token
  //         ? { Authorization: `Bearer ${token}` }
  //         : {}),
  //     },
  //     ...options,
  //   })

  //   if (res.status === 401) {
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('role')
  //     window.location.href = '/login'
  //     throw new Error('Session expired')
  //   }

  //   // DELETE / other successful empty responses
  //   if (res.status === 204) {
  //     return null as T
  //   }

  //   const json = (await res.json()) as
  //     | ApiSuccess<T>
  //     | ApiError
  //     | Record<string, unknown>

  //   if (json.success === false) {
  //     const errorPayload = json.error as
  //       | { message?: string }
  //       | undefined

  //     throw new Error(
  //       errorPayload?.message || 'Request failed',
  //     )
  //   }

  //   if (json.success === true) {
  //     return json.data as T
  //   }

  //   throw new Error('Unexpected API response')
  // }

  // export const api = {
  //   get: <T>(path: string) =>
  //     request<T>(path),

  //   post: <T>(path: string, body: unknown) =>
  //     request<T>(path, {
  //       method: 'POST',
  //       body: JSON.stringify(body),
  //     }),

  //   patch: <T>(path: string, body: unknown) =>
  //     request<T>(path, {
  //       method: 'PATCH',
  //       body: JSON.stringify(body),
  //     }),

  //   delete: (path: string) =>
  //     request<null>(path, {
  //       method: 'DELETE',
  //     }),
  // }

  const RAW_BASE_URL = import.meta.env.VITE_API_BASE_URL
// Remove trailing slash if it exists, fallback to localhost
const BASE_URL = RAW_BASE_URL ? RAW_BASE_URL.replace(/\/$/, '') : 'http://localhost:4000'

type ApiSuccess<T> = {
  success: true
  data: T
}

type ApiError = {
  success: false
  error: {
    code: string
    message: string
  }
}

async function request<T>(
  path: string,
  options?: RequestInit,
): Promise<T> {
  const token = localStorage.getItem('token')

  // Ensure path starts with a single '/'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const fullUrl = `${BASE_URL}${cleanPath}`
  
  // 🔍 DEBUG: This will show you EXACTLY what URL is being called in the browser console
  console.log('🌐 API Request to:', fullUrl)

  const res = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  })

  // 🚨 CATCH HTML RESPONSES BEFORE THEY CRASH THE JSON PARSER
  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    const text = await res.text()
    console.error('❌ Expected JSON but got HTML/Text:', text.substring(0, 300))
    throw new Error(`API returned non-JSON (likely a 404 HTML page). Check the URL above. Is it hitting Vercel instead of Railway?`)
  }

  if (res.status === 401) {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    window.location.href = '/login'
    throw new Error('Session expired')
  }

  if (res.status === 204) {
    return null as T
  }

  const json = (await res.json()) as ApiSuccess<T> | ApiError | Record<string, unknown>

  if (json.success === false) {
    const errorPayload = json.error as { message?: string } | undefined
    throw new Error(errorPayload?.message || 'Request failed')
  }

  if (json.success === true) {
    return json.data as T
  }

  throw new Error('Unexpected API response')
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
  patch: <T>(path: string, body: unknown) =>
    request<T>(path, {
      method: 'PATCH',
      body: JSON.stringify(body),
    }),
  delete: (path: string) =>
    request<null>(path, {
      method: 'DELETE',
    }),
}