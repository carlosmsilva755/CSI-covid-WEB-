Feature: Recuperar_Senha
História de Usuário

PARA recuperar minha senha cadastrada

EU, como um usuário cadastrado

GOSTARIA de receber um e-mail para redefinir minha senha.

Critérios de aceitação: Para recuperar a senha é necessário ter um e-mail e senha cadastrados no sistema.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I press the "esqueceu-senha-button"
    And I enter "testemedicocovid@gmail.com" in "email-reset-input"
    And I press the "enviar-button"
    And I see "Verifique seu email!" written on the requested page.id:"verifique-text"
    Then I press the "voltar-button"

  Scenario: Para o usuario Pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I press the "esqueceu-senha-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-reset-input"
    And I press the "enviar-button"
    And I see "Verifique seu email!" written on the requested page.id:"verifique-text"
    Then I press the "voltar-button"