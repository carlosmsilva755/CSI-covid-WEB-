Feature: Editar Perfil Usuarios

  Scenario: Para o usuario Medico - Editar_Perfil_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "cadastre-medico-button"
    And I enter "Teste_Medico" in "name-input"
    And I create an email "Teste_Medico" and write in "email-input-register"
    And I press the "estado-select"
    And I press the option ".MuiButtonBase-root:nth-child(11)"
    And I enter "crm123" in "crm-input"
    And I enter "Teste123" in "specialty-input"
    And I enter "Teste123" in "password-register-input"
    And I enter "Teste123" in "password2-input"
    And I press the "cadastrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I press the "editar-dados-button"
    And I enter "4" in "info-profile"
    And I save the value of the information in a variable.id"email-profile"
    When I press the "confirmar-dados-button"
    And I press the "fechar-button"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I see "Teste1234" written on the requested pagecc.id:"info-profile"
    And I press the "excluir-button"
    And I press the "excliur-conta-button"
    And I press the "login-button"
    And I enter the value saved in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then I see "Usuário não encontrado" written on the requested page.id:"email-login-input-label"