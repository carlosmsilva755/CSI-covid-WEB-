Feature: Excluir_Diagnostico
Histórias de Usuários
PARA excluir um diagnóstico que foi solicitado

EU, como um Médico

GOSTARIA de visualizar o diagnóstico e excluir as informações registradas.

Critérios de aceitação: O sistema deve retornar que essa operação não poderá ser desfeita estando o médico ciente. Pontos: 5

  Scenario: Para o usuario Medico - Excluir_Diagnostico_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "diagnosticos-button"
    And I press the "novo-button"
    And I press the "continuar-button"
    And I press the "image-upload"  and choose the file
    And I press the "solicitar-button"
    And I see "Diagnóstico do modelo:" written on the requested page
    And I press the "disponibilizar-button"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I see the diagnostic code'card-id'and save it
    And I press the "pagina-inicial-button"
    And I press the "options-button"
    And I press the "excluir-button"
    And I press the "confirmar-excliur-button"
    And I press the "diagnosticos-button"
    And I check if the code has been deleted which is the same as "ID inválido"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"