Feature: Visualizar_Diagnostico_Fornecido(Medico_e_Pesquisador)
Histórias de Usuários:

Visualizar_Diagnostico_Fornecido(Area_medico)

Para saber quais diagnósticos eu já forneci para o treinamento da IA
Eu, como um Médico
Gostaria de visualizar uma lista de diagnósticos fornecidos e detalhar um específico.
Critérios de aceitação: O sistema deve identificar cada diagnóstico fornecido através de um código único para que o médico possa localizar em uma lista de forma precisa.

Visualizar_Diagnostico_Fornecido(Area_pesquisador)

Para saber quais diagnósticos eu já forneci para o treinamento da IA
Eu, como Pesquisador
Gostaria de visualizar uma lista de diagnósticos fornecidos e detalhar um específico.
Critérios de aceitação: O sistema deve identificar cada paciente através de um código único para que o pesquisador possa buscá-lo de forma precisa.

  Scenario: Para o usuario Medico - Visualizar_Diagnostico_Fornecido
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I press the "fornecidos-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I click  in the first  diagnostic image ".content-card:nth-child(1) > #container-card-menu .card-image"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario pesquisador Visualizar_Diagnostico_Fornecido
    Given Browse to web site "https://csi-covid.web.app"
    And I press the "login-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"