Feature: Visualizar_Diagnostico_Solicitado(Area_Medico)
História de Usuário
Para visualizar o diagnóstico do um paciente.
Eu, como um Médico
Gostaria de buscar através de um código único, o diagnóstico realizado e visualizar as informações.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "login-button"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "diagnosticos-button"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"
