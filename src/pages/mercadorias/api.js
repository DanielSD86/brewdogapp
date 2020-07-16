import api from "../../services/api";

const loadMercadorias = async (limite, pagina = 1, filtro = "") => {
    let params = "";

    if (limite > 0) params += "&limite=" + limite;
    if (pagina > 0) params += "&pagina=" + pagina;
    if (filtro !== "") params += "&filtro=" + filtro;
    if (params !== "") params = "?" + String(params).substr(1);

    return await api.get("/mercadorias" + params)
    .then(response => {
        return { 
            status: (response.status === 200),
            data: response.data, 
        };
    })
    .catch(error => {
        return { 
            status: false, 
            message: error.response.data.message,
        };
    });
}

export {
    loadMercadorias,
}