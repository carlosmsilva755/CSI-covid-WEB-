Feature: Recuperar_Imagem
História de Usuário
PARA visualizar o diagnóstico do um paciente.
EU, como Pesquisador
GOSTARIA de buscar através de um código único, o diagnóstico realizado e visualizar as informações.
Critérios de aceitação: O sistema deve identificar cada paciente através de um código único para que o pesquisador possa buscá-lo de forma precisa.

  Scenario: Para o usuario pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "Teste_Pesquisador1@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Imagens" written on the requested page:xpath'//*[@id="imagens-button"]'
    And I click  in the first  diagnostic image "#container-card-menu > div.container-card-img > img"
    Then I press the "pagina-inicial-button"