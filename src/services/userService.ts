import { MLApi } from "@/libs/MLApi";

export async function fetchUser() {
  const token = localStorage.getItem('access_token');
  if (!token) {
    throw new Error('No access token found');
  }

  try {
    const response = await MLApi.get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuario', error);
    throw error;
  }
}