Feature: Solicitar Diagnostico
História de Usuário
Para solicitar um diagnóstico de um paciente com sintomas da Covid-19
Eu, como um Médico
Gostaria de inserir os dados anonimizados e a foto do raio x do paciente para avaliação.
Critérios de aceitação: O sistema deve identificar o local onde está sendo solicitado o diagnóstico.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I enter "Teste123" in "undefined-input"
    And I press the "entrar-button"
    And I see "Diagnósticos" written on the requested page:xpath'//*[@id="root"]/main/header/div/div[2]/div/a'
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
    And I press the "image-upload"  and choose the file
    And I press the "solicitar-button"
    And I see "COVID-19" written on the requested page
    Then I press the "pagina-inicial-button"