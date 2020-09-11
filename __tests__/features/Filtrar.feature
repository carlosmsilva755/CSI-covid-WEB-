Feature: Filtrar
Histórias de Usuários
Para verificar os diagnóstico solicitados por classificação
Eu, como um Médico
Gostaria de visualizar somente os diagnóstico referente a cada classificação..
Critérios de aceitação: O sistema deve retornar somente os diagnósticos de um tipo de classificação.

  Scenario: Para usuario medico ---- Filtrando por Covid
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "outlined-select-currency"
    And I press the option ".MuiPaper-root:nth-child(3) .MuiButtonBase-root:nth-child(1)"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I see the diagnostic code'card-id'and save it
    And I see "codigo_salvo"
    And I check the diagnostic code unless it starts with the letter "C"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para usuario medico ---- Filtrando por Pneumonia
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "outlined-select-currency"
    And I press the option ".MuiPaper-root:nth-child(3) .MuiButtonBase-root:nth-child(2)"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I see the diagnostic code'card-id'and save it
    And I see "codigo_salvo"
    And I check the diagnostic code unless it starts with the letter "P"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"