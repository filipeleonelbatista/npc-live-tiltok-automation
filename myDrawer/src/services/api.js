import axios from 'axios';

const api = axios.create({
  baseURL: "https://api-sa-east-1.hygraph.com/v2/clikny9pa0efc01uh47b821uy/master"
})

api.interceptors.request.use(
  (config) => {
    config.headers = {
      'content-type': 'application/json',
      'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2ODYwNzk4MzQsImF1ZCI6WyJodHRwczovL2FwaS1zYS1lYXN0LTEuaHlncmFwaC5jb20vdjIvY2xpa255OXBhMGVmYzAxdWg0N2I4MjF1eS9tYXN0ZXIiLCJtYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiYWY5MDA1ZmItNDFlZS00NDk1LWEzMTgtZTQ3ZDQwNjFmYWExIiwianRpIjoiY2xpa29lZWw5MGU0cDAxdWlobWxvYW1oMCJ9.Po8DadWGtxbneG2HdmB5eX4blsP0bvLEv9C4_jdY1UhVF9xqppCj5UD9mTLBzhCvYpVtWykBi3kw8XzOcTTOFaBNJKkX8p3BqqmmMBKCLXlOUlbYbUFUEXlZKJbbtdbHhyBoxrE6nThThdy8S83S6oktPohT5lvVusiOf_x2_s9UuTEHkxA7_7BOOOrgGi1dJada0rFDacDU8kUyHf9e-t0-L05WCz0iwLa7wrv4xdQnFmw-6maXW2y7eeavmd9sRRSliBpdCW6fi0NbcX4k6Nxiqc3gYz3OZ9fNBGAVei1nMpSfp_ZdmfiYapvhsHuHhTLkZ24WyEKzNj1twt5aq86cUb14xeY9M7U1N1HCfiS2bB6K-Of7K32-fLDa7sMtMBrY_vaNRdVx07CODTWjcgyI5pnoABotCrOX1ogeXF3g_r6jGicpH_rL-9tDH9PG09a--xruCRr5z2UvzhRCaefsEg1rgiHwFEuBEn19-V_JqeYMrPlYokEqBcu5qNM4tUCkNfPK-lj8wNPFNYw61tk75BxhyweUmgPmrAqWg5M3DTiqfYeTuTZ0ZT5H8MaHL4mvLqywjHbM6yaLn0pNYyDyzx1h4x2v8zQVPYuC_aN0vTxQvesMEyiFDMbPCwHO00pOK31_jQB96LH4Lc9JnijI7GbYIdAG5su5vUhL358`
    };
    return config;
  },
  (err) => {
    return Promise.reject(err)
  }
)

const login = (username) => {
  return {
    query: `
      query filterAssinantesByEmail {
        assinantes(where: {username: "${username}"}) {
          createdAt
          email
          id
          isActive
          username
          whatsapp
          paymentDate
          publishedAt
          requestAccessDate
          selectedPlan
          senha
          updatedAt
        }
      }
    `
  }
}

const createAssinante = (username, whatsapp, email, senha, requestAccessDate, selectedPlan, isActive, paymentDate) => {
  return {
    query: `mutation {
                createAssinante(
                  data: { username: "${username}", whatsapp: "${whatsapp}", email: "${email}", senha: "${senha}", requestAccessDate: "${requestAccessDate}", selectedPlan: ${selectedPlan}, isActive: ${isActive}, paymentDate: ${paymentDate ? `"${paymentDate}"` : `null`}}
                ) {
                  email
                  id
                  isActive
                  username
                  whatsapp
                  paymentDate
                  requestAccessDate
                  selectedPlan
                  senha
                }
                publishAssinante(where: {email: "${email}"}) {
                  id
                }
              }`
  }
}


export {
  api,
  createAssinante,
  login
};
