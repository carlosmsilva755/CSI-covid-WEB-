Feature: Backup
<feature description>

  Scenario: Backup
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I press the option "#backup-button"
    And I press the option ".container-navbars > #backup-button"
    And I press the "confirmar-button"
    And I press the "cancelar-button-backup"
    And I see "Backup realizado com sucesso!" written on the requested page.id:"confirmation-message"
    And I press the "cancelar-button-backup"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"