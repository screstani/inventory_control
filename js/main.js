const baseURL = "http://localhost:3000/"
const table_content = document.querySelector('.content tbody')
const add_product = document.querySelector('#add-product')
const cadastro = document.querySelector('#cadastro')
const content = document.querySelector('#content')  
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

    item.nome = e.target.querySelector('[name=nome]').value
    item.marca = e.target.querySelector('[name=marca]').value
    item.qtd = e.target.querySelector('[name=qtd]').value
    
    createItem(item).then(function(response) {    
        console.log(response)

    getProducts().then(function(response) {
        criaItens(response);
    });
 })

})

content.addEventListener('click', (e) => {    
    if(e.target.className=='remove-item') {
        const id = e.target.parentNode.parentNode.querySelector('.product-id').textContent

        deleteItem(id).then(function(response) { 
            console.log(response); 
    
        getProducts().then(function(response) {
            console.log('loading');  
            criaItens(response);
        });
    })
    
    }  
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

async function deleteItem(id) {
    try {
      const response = await fetch(baseURL + "cadastroProdutos" + "/" + id, {
        method: "DELETE",
      });
      return response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

async function getProducts() {
    try {
        const response = await fetch(baseURL + "cadastroProdutos");
        return response.json();
    } catch(e) {
        console.error(e);
    };
};

getProducts().then(function(response) {
    criaItens(response)
});

function criaItens(dados) {
    console.log("chegou na createItem")
    console.log(dados)
    table_content.innerHTML = ''
    console.log(table_content)
        dados.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td class="product-id">${product.id}</td>
                <td class="product-nome">${product.nome}</td>
                <td class="product-marca">${product.marca}</td>
                <td class="product-qtd">${product.qtd}</td>
                <td>
                    <button>Edit</button>
                    <button class="remove-item">Remove Item</button>
                </td>
            `;
            table_content.appendChild(tr);
    });
}


