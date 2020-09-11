Feature: Criar_Perfil
**Histórias de Usuários**

**Para** possuir um cadastro no sistema

**Eu**, como um pesquisador ou médico

**Gostaria** de criar meu perfil.

**Critérios de aceitação:** Para criar um perfil será preciso internet para salvar os dados.

  Scenario: Para o usuario Medico - Criar perfil com sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "cadastre-medico-button"
    And I enter "Teste_Medico" in "name-input"
    And I create an email "Teste_Medico" and write in "email-input"
    And I enter "crm123" in "crm-input"
    And I enter "Teste1234" in "specialty-input"
    And I enter "Teste123" in "password-input"
    And I enter "Teste123" in "password2-input"
    And I press the "cadastrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario Pesquisador Criar perfil com sucesso
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "login-button"
    And I press the "cadastre-pesquisador-button"
    And I enter "Teste_Pesquisador" in "name-input"
    And I create an email "Teste_Pesquisador" and write in "email-input"
    And I enter "Teste_Universidade" in "institution-input"
    And I enter "Teste_Especialidade" in "specialty-input"
    And I enter "Teste123" in "password-input"
    And I enter "Teste123" in "password2-input"
    And I press the "cadastrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"