Feature: Listar_Perfils
História de Usuários
Para Consultar os perfils cadastrados
Eu, como usuário administrador
Gostaria de visualizar os perfils de todos os usuários do sistema.
Critérios de aceitação: O sistema deve informa o tipo de perfil no cabeçalho de cada perfil

  Scenario: Para o usuario Adm - Lista_Perfil_de_Medicos_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I enter "Medico" in "pesquisar-nome-input"
    And I press the "pesquisar-button"
    And I see "Médico" written on the requested page:xpath'//*[@id="profile-card-admin"]/div/div[1]/p[1]'
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario Adm - Lista_Perfil_de_Pesquisadores_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I enter "Pesquisador" in "pesquisar-nome-input"
    And I press the "pesquisar-button"
    And I see "Pesquisador" written on the requested page:xpath'/html/body/div[1]/div/div/div[2]/div[1]/div/div/div[1]/p[1]'
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"