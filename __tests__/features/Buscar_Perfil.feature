Feature: Buscar_Perfil(Adm)
História de Usuários

Para localizar um usuário
Eu, como usuário administrador
Gostaria de inserir o nome do usuário e localizar seu perfil no sistema.
Critérios de aceitação: O sistema deve identificar os usuários pelos nomes.
Pontos:5

  Scenario: Para o usuario Adm - Buscar_Perfil_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I enter "Teste_Medico123" in "pesquisar-nome-input"
    And I press the "pesquisar-button"
    And I see "TESTE_MEDICO123" written on the requested page:xpath'/html/body/div[1]/div/div/div[2]/div/div/p[1]'
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"