Feature: Login(Medico_e_Pesquisador)
**Histórias de Usuários**

**Para** acessar meu ambiente no sistema

**Eu**, como um usuário cadastrado

**Gostaria** de digitar meus dados de acesso e realizar meu login.

**Critérios de aceitação:** Para realizar login é necessário que exista um cadastro no sistema.

  Scenario: Para o usuario Medico login com sucesso
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"

  Scenario: Para o usuario Pesquisador login com sucesso
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"

  Scenario: DE FALHA - Para o usuario Medico- login sem sucesso - campo senha nao informado
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador - login sem sucesso-campo senha nao informado
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Medico- login sem sucesso-campo email nao informado
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador - login sem sucesso-campo email nao informado
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Medico- login sem sucesso-nenhum campo informado
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador - login sem sucesso-nenhum campo informado
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Medico quando digita na area do pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I press the OK button on the pop-up
    Then if I'm on the page "https://csi-covid-265c4.web.app/", the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador quando digita na area do medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I press the OK button on the pop-up
    Then if I'm on the page "https://csi-covid-265c4.web.app/", the login has not yet occurred