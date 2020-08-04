Feature: Visualizar_Diagnostico
História de Usuário
Para visualizar o diagnóstico do um paciente.
Eu, como um Médico
Gostaria de buscar através de um código único, o diagnóstico realizado e visualizar as informações.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Diagnósticos" written on the requested page:xpath'//*[@id="root"]/div/header/div/div[2]/div/a'
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    Then I press the "pagina-inicial-button"