Feature: Visualizar_Diagnostico
História de Usuário
Para visualizar o diagnóstico do um paciente.
Eu, como um Médico
Gostaria de buscar através de um código único, o diagnóstico realizado e visualizar as informações.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    When I press the "cadastre-medico-button"
    And I click  in the first  diagnostic image ".content-card:nth-child(4) > #container-card-menu .card-image"
    Then I press the "pagina-inicial-button"

  Scenario: Para o usuario pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    When I press the "cadastre-pesquisador-button"
    And I click  in the first  diagnostic image ".content-card:nth-child(4) > #container-card-menu .card-image"
    Then I press the "pagina-inicial-button"