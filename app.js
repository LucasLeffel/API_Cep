const rua = document.getElementById('rua')
const bairro = document.getElementById('bairro')
const complemento = document.getElementById('complemento')
const localidade = document.getElementById('localidade')
const uf = document.getElementById('uf')
const ibge = document.getElementById('ibge')

let lista = []

function consultaCep() {
    const cep = document.querySelector('#cep').value 
   
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
   .then(resposta => resposta.json())
//    .then(json => console.log(json))
   .then(json => {
    rua.value = json.logradouro
    bairro.value = json.bairro
    complemento.value = json.complemento
    localidade.value = json.localidade
    uf.value = json.uf
    ibge.value = json.ibge
   })
   .catch(error => console.log(error))
}

function salvarDados() {

    lista.push({   
        rua: rua.value, 
        bairro: bairro.value,  
        complemento: complemento.value,  
        localidade: localidade.value,  
        uf: uf.value, 
        ibge: ibge.value })
    
    mostrarDados()    
}

function mostrarDados() {

    while (table.firstChild) {
        table.firstChild.remove()
    }

    const linhaCabecalho = document.createElement('tr')
    linhaCabecalho.classList.add('cabecalho');

    const tdRua = document.createElement('td')
    tdRua.innerText = "Rua"
    linhaCabecalho.appendChild(tdRua)

    const tdBairro = document.createElement('td')
    tdBairro.innerText = "Bairro"
    linhaCabecalho.appendChild(tdBairro)
    
    const tdComplemento = document.createElement('td')
    tdComplemento.innerText = "Complemento"
    linhaCabecalho.appendChild(tdComplemento)
    
    const tdLocalidade = document.createElement('td')
    tdLocalidade.innerText = "Localidade"
    linhaCabecalho.appendChild(tdLocalidade)

    const tdUf = document.createElement('td')
    tdUf.innerText = "UF"
    linhaCabecalho.appendChild(tdUf)

    const tdIbge = document.createElement('td')
    tdIbge.innerText = "IBGE"
    linhaCabecalho.appendChild(tdIbge)

    table.appendChild(linhaCabecalho)

    lista.forEach((dado, posicao) => { 
    
        const linhaDado = document.createElement('tr')

        const tdRuaDado = document.createElement('td')
        tdRuaDado.innerText = dado.rua
        linhaDado.appendChild(tdRuaDado)

        const tdBairroDado = document.createElement('td')
        tdBairroDado.innerText = dado.bairro
        linhaDado.appendChild(tdBairroDado)
    
        const tdComplementoDado = document.createElement('td')
        tdComplementoDado.innerText = dado.complemento
        linhaDado.appendChild(tdComplementoDado)
        
        const tdLocalidadeDado = document.createElement('td')
        tdLocalidadeDado.innerText = dado.localidade
        linhaDado.appendChild(tdLocalidadeDado)

        const tdUfDado = document.createElement('td')
        tdUfDado.innerText = dado.uf
        linhaDado.appendChild(tdUfDado)

        const tdIbgeDado = document.createElement('td')
        tdIbgeDado.innerText = dado.ibge
        linhaDado.appendChild(tdIbgeDado)

        const tdDeletar = document.createElement('td')
        linhaDado.appendChild(tdDeletar)

        const botaoDeletar = document.createElement('button');
        const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgIcon.setAttribute('width', '16');
        svgIcon.setAttribute('height', '16');
        svgIcon.setAttribute('fill', 'currentColor');
        svgIcon.setAttribute('class', 'bi bi-trash-fill');
        svgIcon.setAttribute('viewBox', '0 0 16 16');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0');
        svgIcon.appendChild(path);
        
        botaoDeletar.appendChild(svgIcon);
        botaoDeletar.setAttribute('onclick', `deletarDados(${posicao})`)
        botaoDeletar.className = 'botaoDeletar'
        tdDeletar.appendChild(botaoDeletar)

        table.appendChild(linhaDado)
    })

    localStorage.setItem("Dados", JSON.stringify(lista))

}

function recarregarDados() {
    const dadosLocalstorage = localStorage.getItem("Dados")
    if (dadosLocalstorage) {
        lista = JSON.parse(dadosLocalstorage)
    }

    mostrarDados()
}

function deletarDados(posicao) {

    lista.splice(posicao, 1)

    mostrarDados()
}

recarregarDados()