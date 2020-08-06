Feature: Visualizar_usuario
História de Usuário -Visualizar Usuário

PARA poder visualizar meus dados cadastrados

EU, como um usuário cadastrado

GOSTARIA de visualizar meu perfil.

Critérios de aceitação: Ter os dados salvos no sistema.

  Scenario: Para o usuario Medico
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "medico-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Diagnósticos" written on the requested page.id:"diagnosticos-button"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I see "Perfil" written on the requested page:xpath'//*[@id="root"]/div/div/div[1]/h1'
    And I see "nome_medico" written on the requested page.id:"name-profile-label"
    And I see "testemedicocovid@gmail.com" written on the requested page.id:"email-profile-label"
    And I see "crm_medico" written on the requested page.id:"crm-profile-label"
    And I see "especialidade_medico" written on the requested page.id:"info-profile-label"
    And I press the "logout-button"
    And I press the "sair-button"

  Scenario: Para o usuario Pesquisador
    Given Browse to web site "https://csi-covid-265c4.web.app/"
    And I press the "pesquisador-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Imagens" written on the requested page.id:"imagens-button"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I see "Perfil" written on the requested page:xpath'//*[@id="root"]/div/div/div[1]/h1'
    And I see "nome_pesquisador" written on the requested page.id:"name-profile-label"
    And I see "testepesquisadorcovid@gmail.com" written on the requested page.id:"email-profile-label"
    And I see "especialidade_pesquisador" written on the requested page.id:"info-profile-label"
    And I press the "logout-button"
    And I press the "sair-button"