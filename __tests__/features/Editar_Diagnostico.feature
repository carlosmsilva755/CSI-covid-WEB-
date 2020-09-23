Feature: Editar_Diagnostico
Historia de usuario

Para alterar algum campo de um diagnóstico solicitado
Eu, como um Médico
Gostaria de visualizar somente os diagnóstico referente a cada classificação..
Critérios de aceitação: O sistema deve retornar os dados enviados preenchendo todos os campos.

  Scenario: Para o usuario Medico - Excluir_Diagnostico_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "diagnosticos-button"
    And I press the "novo-button"
    And I enter "20" in "idade-input"
    And I press the "continuar-button"
    And I press the "image-upload"  and choose the file
    And I press the "solicitar-button"
    And I see "Diagnóstico do modelo:" written on the requested page
    And I press the "disponibilizar-button"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I press the "pagina-inicial-button"
    And I press the "options-button"
    And I press the "editar-button"
    And I enter "50" in "idade-input"
    And I press the "editar-button"
    And I press the "diagnosticos-button"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I see "Idade: 2050 anos" written on the requested page.id:"idade-text"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"