Feature: Cadastrar Imagem
Histórias de Usuários
Para cadastrar uma imagem de raio x de uma pessoa com Covid-19 e melhorar a eficiência da inteligência artificial.
Eu, como um Pesquisador
Gostaria de inserir os metadados anonimizados e fazer o upload da foto do raio x dessa pessoa.
Critérios de aceitação: Quando o usuário estiver na página inicial do aplicativo Mobile deve ter a opção para solicitar o diagnóstico de forma rápida e acessível.

  Scenario: Para o usuario pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Imagens" written on the requested page.id:"imagens-button"
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
    Then I press the "pagina-inicial-button"