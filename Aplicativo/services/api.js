import axios from "axios";

// Configuração para o backend local
const api = axios.create({
  baseURL: "https://enercheck.onrender.com/swagger/index.html",
});
export{api as default}