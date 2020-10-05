Feature: Editar_Perfil_Adm
 História de Usuários
**Para** Editar os meus dados cadastrados

**Eu**, como usuário Administrador

**Gostaria** de modificar os dados cadastrados na conta de administrador.

  Scenario: Para o usuario Adm - Editar_Perfil_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I see "admin@gmail.com" written on the requested pagecc.id:"name-profile"
    And I press the "atualizar-email-button"
    And I clear and enter "admin1@gmail.com" in "name-profile"
    And I press the "editar-dados-button"
    And I press the "cancelar-conta-button"
    And I see "admin1@gmail.com" written on the requested pagecc.id:"name-profile"
    And I press the "atualizar-email-button"
    And I clear and enter "admin@gmail.com" in "name-profile"
    And I see "admin@gmail.com" written on the requested pagecc.id:"name-profile"
    And I press the "editar-dados-button"
    And I press the "cancelar-conta-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"