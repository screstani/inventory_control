const baseURL = "../products.json"
const table_content = document.querySelector('.content tbody')

async function request() {
    try {
        const response = await fetch(baseURL);
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
        <td>${product.name}</td>
        <td>${product.brand}</td>
        <td>${product.qtt}</td>
        <td>
            <button>Edit</button>
            <button>Remove</button>
        </td>
        `;
        table_content.appendChild(tr);
    });
})

