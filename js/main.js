const baseURL = "http://localhost:3000/"
const table_content = document.querySelector('.content tbody')
const add_product = document.querySelector('#add-product')
const cadastro = document.querySelector('#cadastro')
let item = {
    nome: "",
    marca: "",   
    qtd: 0
}

add_product.addEventListener('click', () => {
    cadastro.classList.toggle('cadastro-ativo')
})

cadastro.addEventListener('submit', (e) => {
    e.preventDefault();

    item.nome = e.target.querySelector('[name=nome]').value;
    item.marca = e.target.querySelector('[name=marca]').value;
    item.qtd = e.target.querySelector('[name=qtd]').value;
    
    createItem(item).then(function(response) {    
        console.log(response);
    })

})

async function createItem(item) {
    try {
      const response = await fetch(baseURL + "cadastroProdutos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      });
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
}

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



