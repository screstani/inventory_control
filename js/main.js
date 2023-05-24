const baseURL = "http://localhost:3000/"
const table_content = document.querySelector('.content tbody')
const item = {
    nome: "Produto A",
    marca: "Marca A",   
    qtd: 10
}

async function createItem(item) {
    try {
      const response = await fetch(baseURL + "cadastroProdutos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      console.log(response);
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

createItem(item).then(function(response) {    
    console.log(response);
})


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



