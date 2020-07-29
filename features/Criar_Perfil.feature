Feature: Criar_Perfil
**Histórias de Usuários**

**Para** possuir um cadastro no sistema

**Eu**, como um pesquisador ou médico

**Gostaria** de criar meu perfil.

**Critérios de aceitação:** Para criar um perfil será preciso internet para salvar os dados.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "cadastre-medico-button"
    And I enter "Teste_Medico" in "name-input"
    And I enter "Teste_Medico@gmail.com" in "email-input"
    And I enter "crm123" in "crm-input"
    And I enter "Teste1234" in "specialty-input"
    And I enter "Teste123" in "password-input"
    And I enter "Teste123" in "password2-input"
    And I press the "cadastrar-button"
    And I see "Diagnósticos" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'

  Scenario: Para o usuario Pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "cadastre-pesquisador-button"
    And I enter "Teste_Pesquisador" in "name-input"
    And I enter "Teste_Pesquisador@gmail.com" in "email-input"
    And I enter "Teste_Universidade" in "institution-input"
    And I enter "Teste123" in "password-input"
    And I enter "Teste123" in "password2-input"
    And I press the "cadastrar-button"
    And I see "Imagens" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'