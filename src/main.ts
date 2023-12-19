const paragraph = document.querySelectorAll("p[id=campos]")
const span = document.querySelector("#span")
interface Input {
  id: string
  value?: string
}

enum Information {
  cidade,
  estado,
  logradouro,
  bairro
}

function validateCEP(cep: Input) {
  if(!cep.value.match(/\d{5}-\d{3}/g)) {
    throw new Error(`Utilize a formatação "XXXXX-XXX"`)
  }
}

function changeInforamation(cepInforamation: { [camp: string]: any }) {
  paragraph.forEach((element, key) => {
    let camp = Information[key]
    if(!cepInforamation[camp]) {
      element.innerHTML = `<span>Informação não encontrada</span>`
    } else {
      element.innerHTML = `<span>Cidade: </span> ${cepInforamation[camp]}`
    }
  })
}

function clearInformation() {
  paragraph.forEach(element => element.textContent = "")
}

async function fetchCEP(cep: Input) {
  const response = await fetch(`https://api.postmon.com.br/v1/cep/${cep.value}`)
  if(response.ok) {
    return response.json()
  }

  return Promise.reject("CEP inválido")
}

async function setup(ev: { preventDefault: () => void }) {
  ev.preventDefault()

  const cep: Input = document.querySelector("#inputCEP")
  try {
    validateCEP(cep)
    const response = await fetchCEP(cep)
    changeInforamation(response)
    span.textContent = ""
  } catch(erro) {
    span.textContent = erro
    clearInformation()
  }
}

document.querySelector("form").addEventListener("submit", setup)