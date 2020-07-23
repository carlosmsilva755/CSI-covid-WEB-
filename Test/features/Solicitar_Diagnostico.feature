Feature: Solicitar Diagnostico
História de Usuário
Para solicitar um diagnóstico de um paciente com sintomas da Covid-19
Eu, como um Médico
Gostaria de inserir os dados anonimizados e a foto do raio x do paciente para avaliação.
Critérios de aceitação: O sistema deve identificar o local onde está sendo solicitado o diagnóstico.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    When I press the "cadastre-medico-button"
    And I press the "novo-button"
    And I press the "continuar-button"
    And I press the "image-upload" option e escolher o arquivo
    And I press the "solicitar-button"
    And Eu vejo algo
    Then I press the "pagina-inicial-button"

  Scenario: Para o usuario pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    When I press the "cadastre-pesquisador-button"
    And I press the "novo-button"
    And I press the "estado-select"
    And I press the option ".MuiButtonBase-root:nth-child(11)"
    And I press the "cidade-select"
    And I press the option ".MuiButtonBase-root:nth-child(6)"
    And I press the "sexo-select"
    And I press the option ".MuiButtonBase-root:nth-child(1)"
    And in the "idade-input" field, I type in the information "25"
    And in the "temp-input" field, I type in the information "38"
    And in the "sat_ox-input" field, I type in the information "98"
    And in the "info-select" field, I type in the information "Teste-123"
    And I press the "continuar-button"
    And I press the "image-upload" option
    And I press the windows-menu "Imagens (fixo)"
    And I press the windows-list "devradar"
    And I press the windows-Image "Image"
    And I press the windows-Button "Abrir"
    And I press the "solicitar-button"
    Then I press the "pagina-inicial-button"