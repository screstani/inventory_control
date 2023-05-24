const baseURL = "http://localhost:3000/"
const table_content = document.querySelector('.content tbody')

async function request() {
    try {
        const response = await fetch(baseURL + "cadastroProdutos");
        return response.json();
    } catch(e) {
        console.error(e);
    };
};

request().then(function(response) {
    response.forEach(product => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td>${product.id}</td>
        <td>${product.nome}</td>
        <td>${product.marca}</td>
        <td>${product.qtd}</td>
        <td>
            <button>Edit</button>
            <button>Remove</button>
        </td>
        `;
        table_content.appendChild(tr);
    });
})

