Feature: Disponibilizar_Diagnostico
Histórias de Usuários
Para contribuir com os estudos de pesquisadores e a inteligência artificial
Eu , como um Médico
Gostaria de disponibilizar o diagnóstico de pacientes com Covid-19 contendo os dados anonimizados e a foto do raio x do paciente.
Critérios de aceitação: O sistema apresentar essa opção somente para casos confirmados onde ao disponibilizar o diagnóstico deve informar um termo de ciência ao médico solicitando que o mesmo esteja de acordo.
Cenário: Usuário medico disponibiliza diagnóstico do paciente

  Scenario: Para o usuario pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Diagnósticos" written on the requested page.id:"diagnosticos-button"
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
    * I press the "image-upload"  and choose the file
    And I press the "solicitar-button"
    Then I press the "pagina-inicial-button"