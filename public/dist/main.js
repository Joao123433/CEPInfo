var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const paragraph = document.querySelectorAll("p[id=campos]");
const span = document.querySelector("#span");
var Information;
(function (Information) {
    Information[Information["cidade"] = 0] = "cidade";
    Information[Information["estado"] = 1] = "estado";
    Information[Information["logradouro"] = 2] = "logradouro";
    Information[Information["bairro"] = 3] = "bairro";
})(Information || (Information = {}));
function validateCEP(cep) {
    if (!cep.value.match(/\d{5}-\d{3}/g)) {
        throw new Error(`Utilize a formatação "XXXXX-XXX"`);
    }
}
function changeInforamation(cepInforamation) {
    paragraph.forEach((element, key) => {
        let camp = Information[key];
        if (!cepInforamation[camp]) {
            element.innerHTML = `<span>Informação não encontrada</span>`;
        }
        else {
            element.innerHTML = `<span>Cidade: </span> ${cepInforamation[camp]}`;
        }
    });
}
function clearInformation() {
    paragraph.forEach(element => element.textContent = "");
}
function fetchCEP(cep) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`https://api.postmon.com.br/v1/cep/${cep.value}`);
        if (response.ok) {
            return response.json();
        }
        return Promise.reject("CEP inválido");
    });
}
function setup(ev) {
    return __awaiter(this, void 0, void 0, function* () {
        ev.preventDefault();
        const cep = document.querySelector("#inputCEP");
        try {
            validateCEP(cep);
            const response = yield fetchCEP(cep);
            changeInforamation(response);
            span.textContent = "";
        }
        catch (erro) {
            span.textContent = erro;
            clearInformation();
        }
    });
}
document.querySelector("form").addEventListener("submit", setup);
