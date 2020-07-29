Feature: Login
**Histórias de Usuários**

**Para** acessar meu ambiente no sistema

**Eu**, como um usuário cadastrado

**Gostaria** de digitar meus dados de acesso e realizar meu login.

**Critérios de aceitação:** Para realizar login é necessário que exista um cadastro no sistema.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I enter "Teste123" in "undefined-input"
    And I press the "entrar-button"
    And I see "Diagnósticos" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'

  Scenario: Para o usuario Pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "Teste_Pesquisador@gmail.com" in "email-login-input"
    And I enter "Teste123" in "undefined-input"
    And I press the "entrar-button"
    And I see "Imagens" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'