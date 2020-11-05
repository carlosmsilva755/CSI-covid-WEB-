Feature: Excluir_Perfil
História de Usuários

**Para** excluir minha conta

**Eu**, como usuário cadastrado

**Gostaria** de visualizar o meu perfil e excluir a minha conta com todos os meus dados cadastrados.

**Critérios de aceitação:** O sistema deve informar que essa ação não pode ser desfeita.

Pontos:5

  Scenario: Para o usuario Medico - Exclir_Perfil_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "cadastre-medico-button"
    And I enter "Teste_Medico" in "name-input"
    And I create an email "Teste_Medico" and write in "email-input-register"
    And I press the "estado-select"
    And I press the option ".MuiButtonBase-root:nth-child(11)"
    And I enter "crm123" in "crm-input"
    And I enter "Teste1234" in "specialty-input"
    And I enter "Teste123" in "password-register-input"
    And I enter "Teste123" in "password2-input"
    And I press the "cadastrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I press the "editar-dados-button"
    And I save the value of the information in a variable.id"email-profile"
    When I press the "confirmar-dados-button"
    And I press the "fechar-button"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I press the "excluir-button"
    And I press the "excliur-conta-button"
    And I press the "login-button"
    And I enter the value saved in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then I see "Usuário não encontrado" written on the requested page.id:"email-login-input-label"

  Scenario: Para o usuario Pesquisador- Exclir_Perfil_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
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
    And I press the "perfil-button"
    And I press the "editar-dados-button"
    And I save the value of the information in a variable.id"email-profile"
    When I press the "confirmar-dados-button"
    And I press the "fechar-button"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I press the "excluir-button"
    And I press the "excliur-conta-button"
    And I press the "login-button"
    And I enter the value saved in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then I see "Usuário não encontrado" written on the requested page.id:"email-login-input-label"
    # And I press the "logout-button"
    # And I press the "perfil-button"
    # And I save the value of the information in a variable.id"email-profile"
    # And I press the "excluir-button"
    # And I press the "excliur-conta-button"
    # And I press the "login-button"
    # And I enter the value saved in "email-login-input"
    # And I enter "Teste123" in "password-login-input"
    # And I press the "entrar-button"
    # Then I see "Usuário não encontrado" written on the requested page.id:"email-login-input-label"