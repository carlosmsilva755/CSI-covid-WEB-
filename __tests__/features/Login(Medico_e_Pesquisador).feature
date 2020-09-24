Feature: Login(Medico_e_Pesquisador)
**Histórias de Usuários**

**Para** acessar meu ambiente no sistema

**Eu**, como um usuário cadastrado

**Gostaria** de digitar meus dados de acesso e realizar meu login.

**Critérios de aceitação:** Para realizar login é necessário que exista um cadastro no sistema.

  Scenario: Para o usuario Medico - Login_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testemedicocovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Médico" written on the requested page.id:"medico-perfil"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario Pesquisador - Login_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    And I see "Pesquisador" written on the requested page.id:"pesquisador-perfil"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: Para o usuario Adm - Login_com_Sucesso
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "admin@gmail.com" in "email-login-input"
    And I enter "aaaaaa" in "password-login-input"
    And I press the "entrar-button"
    And I see "Gestão de usuários" written on the requested page.id:"manage-profiles-button"
    And I press the "logout-button"
    And I press the "sair-button"
    And I press the "saida-button"
    Then I see "Entrar" written on the requested page.id:"login-button"

  Scenario: DE FALHA - Para o usuario Medico-Login_sem_Sucesso - campo senha nao informado
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "Teste_Medico@gmail.com" in "email-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador - Login_sem_sucesso - campo senha nao informado
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Medico - Login_sem_Sucesso - campo email nao informado
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador - Login_sem_Sucesso - campo email nao informado
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I enter "Teste123" in "password-login-input"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Medico - Login_sem_Sucesso -nenhum campo informado
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: DE FALHA - Para o usuario Pesquisador - Login_sem_Sucesso -nenhum campo informado
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "login-button"
    And I press the "entrar-button"
    Then if the component "sign-in-page" is on the page, the login has not yet occurred

  Scenario: 
  // Scenario: DE FALHA - Para o usuario Medico quando digita na area do pesquisador
    //Given Browse to web site "https://csi-covid.web.app/"
   // And I press the "login-button"
    //And I enter "testemedicocovid@gmail.com" in "email-login-input"
    //And I enter "Teste123" in "password-login-input"
    //And I press the "entrar-button"
    //And I press the OK button on the pop-up
    //Then if I'm on the page "https://csi-covid.web.app/login", the login has not yet occurred

  //Scenario: DE FALHA - Para o usuario Pesquisador quando digita na area do medico
  //Given Browse to web site "https://csi-covid.web.app/"
    //And I press the "login-button"
    //And I enter "testepesquisadorcovid@gmail.com" in "email-login-input"
    //And I enter "Teste123" in "password-login-input"
    //And I press the "entrar-button"
    //And I press the OK button on the pop-up
    //Then if I'm on the page "https://csi-covid.web.app/login", the login has not yet occurred