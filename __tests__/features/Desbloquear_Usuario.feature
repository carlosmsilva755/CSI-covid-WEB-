Feature: Desbloquear_Usuario(Adm)
Para desbloquear um usuário
Eu, como um Administrador
Gostaria  de localizar o usuário por nome e desbloquea-lo para que tenha permissão de acesso ao sistema.
Critérios de aceitação: Deve aparecer ao administrador uma mensagem que o usuário foi desbloqueado com sucesso.

  Scenario: Desbloquear usuario com sucesso !
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I enter "Teste_Medico" in "pesquisar-nome-input"
    And I press the "pesquisar-button"
    And I press the option '.card-profile-option'
    And I press the "editar-button"
    And I press the "confirmar-excliur-button"
    And I see "Usuário desbloqueado com sucesso" written on the requested page.id:"bloquear-msg"
    And I press the "cancelar-diag-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"