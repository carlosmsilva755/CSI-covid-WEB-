Feature: Visualizar_Ambiente_do_Administrador
feature description

  Scenario: Para o usuario Adm - Verifica funções de medico/pesquisador
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I press the "fornecidos-button"
    And I press the "novo-button"
    And I press the "estado-select"
    And I press the option ".MuiButtonBase-root:nth-child(11)"
    And I press the "cidade-select"
    And I press the option ".MuiButtonBase-root:nth-child(6)"
    And I press the "sexo-select"
    And I press the option ".MuiButtonBase-root:nth-child(1)"
    And in the "idade-input" field, I type in the information "23"
    And in the "temp-input" field, I type in the information "temp-info"
    And in the "sat_ox-input" field, I type in the information "sat-info"
    And in the "info-select" field, I type in the information "info-send"
    And I press the "continuar-button"
    And I press the "image-upload"  and choose the file
    And I press the "outlined-select-currency"
    And I press the option ".MuiButtonBase-root:nth-child(1)"
    And I press the "solicitar-button"
    And I press the "pagina-inicial-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"