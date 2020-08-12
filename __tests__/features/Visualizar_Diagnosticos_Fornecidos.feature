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

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I press the "fornecidos-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I click  in the first  diagnostic image ".content-card:nth-child(1) > #container-card-menu .card-image"
    Then I press the "pagina-inicial-button"

  Scenario: Para o usuario pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Imagens" written on the requested page.id:"imagens-button"
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    Then I press the "pagina-inicial-button"