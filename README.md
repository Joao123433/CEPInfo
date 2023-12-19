# Projeto CEPInfo

-Este código é uma aplicação web simples que obtém informações sobre um endereço brasileiro usando o CEP (Código Postal) fornecido. Ele utiliza a API Postmon para recuperar detalhes como cidade, estado, logradouro e bairro com base no CEP inserido.

# Explicação do Código
## Constantes:
- `paragraph:` Seleciona todos os parágrafos com o id "campos".
- `span:` Seleciona o elemento span.

## Interfaces e Enums:
- `Input:` Representa um objeto de entrada com um id (string) e um valor opcional (string).
- `Information:` Enumera possíveis campos de informações de endereço.

## Funções:
- `validateCEP(cep: Input):` Valida o formato do CEP. Gera um erro se o formato estiver incorreto.
- `changeInformation(cepInformation: { [field: string]: any }):` Atualiza os elementos de parágrafo com base nas informações do endereço obtidas.
- `clearInformation():` Limpa o conteúdo de texto de todos os elementos de parágrafo.
- `fetchCEP(cep: Input):` Obtém informações de endereço da API Postmon com base no CEP fornecido.
- `setup(ev: { preventDefault: () => void }):` Manipulador de eventos para a submissão do formulário. Valida o CEP, obtém informações e atualiza a interface de usuário conforme necessário.