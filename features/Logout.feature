Feature: Logout
**Histórias de Usuários**

**Para** encerrar meu acesso ao sistema

**Eu**, como um usuário cadastrado

**Gostaria** de realizar meu logout do sistema.

**Critérios de aceitação:** Para realizar logout é necessário estar logado no sistema.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I enter "Teste123" in "undefined-input"
    And I press the "entrar-button"
    And I see "Diagnósticos" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'
    And I press the "logout-button"
    Then I see "Realizar login como:" written on the requested page:xpath'//*[@id="root"]/div/div[1]/h2'

  Scenario: Para o usuario Pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "Teste_Pesquisador@gmail.com" in "email-login-input"
    And I enter "Teste123" in "undefined-input"
    And I press the "entrar-button"
    And I see "Imagens" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'
    And I press the "logout-button"
    Then I see "Realizar login como:" written on the requested page:xpath'//*[@id="root"]/div/div[1]/h2'