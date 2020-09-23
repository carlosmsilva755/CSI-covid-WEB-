Feature: Buscar_diagnostico
Histórias de Usuários
Para buscar um diagnóstico solicitado
Eu, como um Médico
Gostaria de inserir um código referente a solicitação e visualizar o diagnóstico.
Critérios de aceitação: Para realizar logout é necessário estar logado no sistema.
de inserir um código referente a solicitação e visualizar o diagnóstico.
Pontos:5

  Scenario: Para o usuario Medico - Buscar_Diagnostico_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I enter "C-SONI2" in "pesquisar-input"
    And I press the "pesquisar-button"
    And I see "C-SONI2" written on the requested page.css:"#root > div > div > div > div > div.card-left > h1"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario pesquisador - Buscar_Imagem_De_Diagnostico_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"
    And I enter "N-EHOMAQ5" in "pesquisar-input"
    And I press the "pesquisar-button"
    And I see "N-EHOMAQ5" written on the requested page.css:"#root > div > div > div > div > div.card-left > h1"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"