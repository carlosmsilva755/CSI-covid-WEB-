Feature: Logout(Medico_e_Pesquisador)
**Histórias de Usuários**

**Para** encerrar meu acesso ao sistema

**Eu**, como um usuário cadastrado

**Gostaria** de realizar meu logout do sistema.

**Critérios de aceitação:** Para realizar logout é necessário estar logado no sistema.

  Scenario: Para o usuario Medico logout com sucesso
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "login-button"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario Pesquisador logout com sucesso
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "login-button"
    And I press the "pesquisador-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"