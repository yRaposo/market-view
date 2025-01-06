import { MLApi } from "@/libs/MLApi";

export async function fetchUser() {
  try {
    const response = await MLApi.get('/users/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar usuario', error);
    throw error;
  }
}