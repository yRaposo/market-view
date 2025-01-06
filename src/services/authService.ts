
import { MLApi } from "@/libs/MLApi"; // Importa a instância da API MLApi

// Função assíncrona para verificar o token de atualização
export async function verifyRefreshToken(refreshToken: string) {
  try {
    // Faz uma requisição POST para o endpoint '/oauth/token' com os dados necessários
    const response = await MLApi.post('/oauth/token', {
      grant_type: 'refresh_token', // Tipo de concessão para o token de atualização
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID, // ID do cliente obtido das variáveis de ambiente
      client_secret: process.env.NEXT_PUBLIC_CLIENT_SECRET, // Segredo do cliente obtido das variáveis de ambiente
      refresh_token: refreshToken // Token de atualização passado como argumento
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Define o tipo de conteúdo do cabeçalho
      }
    });
    console.log(response.data);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error('Refresh Token invalido', error); // Loga um erro no console se a requisição falhar
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
}

// Função assíncrona para buscar o token usando um código de autorização
export async function fetchToken(code: string) {
  const headers = {
    'accept': 'application/json', // Define que a resposta deve ser em JSON
    'content-type': 'application/x-www-form-urlencoded' // Define o tipo de conteúdo do cabeçalho
  };

  // Cria o corpo da requisição com os parâmetros necessários
  const body = new URLSearchParams({
    'grant_type': 'authorization_code', // Tipo de concessão para o código de autorização
    'client_id': process.env.NEXT_PUBLIC_CLIENT_ID!, // ID do cliente obtido das variáveis de ambiente
    'client_secret': process.env.NEXT_PUBLIC_CLIENT_SECRET!, // Segredo do cliente obtido das variáveis de ambiente
    'code': code, // Código de autorização passado como argumento
    'redirect_uri': process.env.NEXT_PUBLIC_REDIRECT_URI! // URI de redirecionamento obtida das variáveis de ambiente
  });

  try {
    // Faz uma requisição POST para o endpoint '/oauth/token' com o corpo e cabeçalhos definidos
    const response = await MLApi.post('/oauth/token', body, { headers: headers });
    console.log(response.data);
    return response.data; // Retorna os dados da resposta
  } catch (error) {
    console.error(error); // Loga um erro no console se a requisição falhar
    throw error; // Lança o erro para ser tratado pelo chamador da função
  }
}