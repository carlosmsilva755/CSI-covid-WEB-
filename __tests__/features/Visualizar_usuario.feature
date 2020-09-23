Feature: Visualizar_usuario(Medico_E_Pesquisador)
História de Usuário -Visualizar Usuário

PARA poder visualizar meus dados cadastrados

EU, como um usuário cadastrado

GOSTARIA de visualizar meu perfil.

Critérios de aceitação: Ter os dados salvos no sistema.

  Scenario: Para o usuario Medico - Visualizar_usuario_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I see "Perfil" written on the requested page:xpath'//*[@id="root"]/div/div/div[1]/h1'
    And I see "nome_medico" written on the requested pagecc.id:"name-profile"
    And I see "testemedicocovid@gmail.com" written on the requested pagecc.id:"email-profile"
    And I see "crm_medico" written on the requested pagecc.id:"crm-profile"
    And I see "especialidade_medico" written on the requested pagecc.id:"info-profile"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"

  Scenario: Para o usuario Pesquisador - Visualizar_usuario_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"
    And I press the "logout-button"
    And I press the "perfil-button"
    And I see "Perfil" written on the requested page:xpath'//*[@id="root"]/div/div/div[1]/h1'
    And I see "nome_pesquisador" written on the requested page.id:"name-profile-label"
    And I see "testepesquisadorcovid@gmail.com" written on the requested page.id:"email-profile-label"
    And I see "especialidade_pesquisador" written on the requested page.id:"info-profile-label"
    And I press the "logout-button"
    And I press the "sair-button"
    Then I press the "saida-button"