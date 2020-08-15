Feature: Fornecer Diagnostico(Medico_e_Pesquisador)
História de Usuário:

Fornecer_Diagnostico (Area do medico):

Para ajudar no treinamento da IA
Eu, como um médico
Gostaria de entrar no sistema e enviar imagens e dados de casos diagnosticados com a covid-19.
Critérios de aceitação: O médico precisa informar como foi feito o diagnóstico de covid-19.

Fornecer_Diagnostico (Area do Pesquisador):

Para cadastrar uma imagem de raio x de uma pessoa com Covid-19 e melhorar a eficiência da inteligência artificial.
Eu, como um Pesquisador
Gostaria de inserir os metadados anonimizados e fazer o upload da foto do raio x dessa pessoa.
Critérios de aceitação: Quando o usuário estiver na página inicial do aplicativo Mobile deve ter a opção para solicitar o diagnóstico de forma rápida e acessível.

  Scenario Outline: Para o usuario Medico
    Given Browse to web site "<site-csi>"
    And I press the "<medico-button>"
    And I enter "<email_user>" in "<email-login-input>"
    And I enter "<user_password>" in "<password-login-input>"
    And I press the "<enter-button>"
    And I see "<Médico>" written on the requested page.id:"<medico-perfil>"
    And I press the "<fornecidos-button>"
    And I press the "<novo-button>"
    And I press the "<estado-select>"
    And I press the option "<estado-option>"
    And I press the "<cidade-select>"
    And I press the option "<cidade-option>"
    And I press the "<sexo-select>"
    And I press the option "<sexo-option>"
    And in the "<idade-input>" field, I type in the information "<idade-info>"
    And in the "<temp-input>" field, I type in the information "<temp-info>"
    And in the "<sat_ox-input>" field, I type in the information "<sat-info>"
    And in the "<info-select>" field, I type in the information "<info-send>"
    And I press the "<continuar-button>"
    And I press the "<image-upload>"  and choose the file
    And I press the "<diagnostic-button>"
    And I press the option "<diagnostic-provided>"
    And I press the "<fazer-upload>"
    And I press the "<enviar-diagnostico-button>"
    Then I press the "<confirmar-button>"
    Examples: 
      | site-csi                         | medico-button | email_user                 | email-login-input | user_password | password-login-input | enter-button  | Médico | medico-perfil | fornecidos-button | novo-button | estado-select | estado-option                     | cidade-select | cidade-option                    | sexo-select | sexo-option                      | idade-input | idade-info | temp-input | temp-info | sat_ox-input | sat-info | info-select | info-send | continuar-button | image-upload | diagnostic-button        | diagnostic-provided              | fazer-upload     | confirmar-button | enviar-diagnostico-button | confirmar-button |
      | https://csi-covid-265c4.web.app/ | medico-button | testemedicocovid@gmail.com | email-login-input | Teste123      | password-login-input | entrar-button | Médico | medico-perfil | fornecidos-button | novo-button | estado-select | .MuiButtonBase-root:nth-child(11) | cidade-select | .MuiButtonBase-root:nth-child(6) | sexo-select | .MuiButtonBase-root:nth-child(1) | idade-input | 25         | temp-input | 38        | sat_ox-input | 98       | info-select | Teste-123 | continuar-button | image-upload | outlined-select-currency | .MuiButtonBase-root:nth-child(1) | solicitar-button | confirmar-button | imagem-button             | imagem-button    |

  Scenario Outline: Para o usuario pesquisador
    Given Browse to web site "<site-csi>"
    And I press the "<pesquisador-button>"
    And I enter "<email_user>" in "<email-login-input>"
    And I enter "<user_password>" in "<password-login-input>"
    And I press the "<enter-button>"
    And I see "<Pesquisador>" written on the requested page.id:"<pesquisador-perfil>"
    And I press the "<novo-button>"
    And I press the "<estado-select>"
    And I press the option "<estado-option>"
    And I press the "<cidade-select>"
    And I press the option "<cidade-option>"
    And I press the "<sexo-select>"
    And I press the option "<sexo-option>"
    And in the "<idade-input>" field, I type in the information "<idade-info>"
    And in the "<temp-input>" field, I type in the information "<temp-info>"
    And in the "<sat_ox-input>" field, I type in the information "<sat-info>"
    And in the "<info-select>" field, I type in the information "<info-send>"
    And I press the "<continuar-button>"
    And I press the "<image-upload>"  and choose the file
    And I press the "<diagnostic-button>"
    And I press the option "<diagnostic-provided>"
    And I press the "<fazer-upload>"
    Then I press the "<enviar-diagnostico-button>"
    Examples: 
      | site-csi                         | pesquisador-button | email_user                      | email-login-input | user_password | password-login-input | enter-button  | Pesquisador | pesquisador-perfil | novo-button | estado-select | estado-option                     | cidade-select | cidade-option                    | sexo-select | sexo-option                      | idade-input | idade-info | temp-input | temp-info | sat_ox-input | sat-info | info-select | info-send | continuar-button | image-upload | diagnostic-button        | diagnostic-provided              | fazer-upload     | fornecer-diagnostico | confirmar-button | enviar-diagnostico-button |
      | https://csi-covid-265c4.web.app/ | pesquisador-button | testepesquisadorcovid@gmail.com | email-login-input | Teste123      | password-login-input | entrar-button | Pesquisador | pesquisador-perfil | novo-button | estado-select | .MuiButtonBase-root:nth-child(11) | cidade-select | .MuiButtonBase-root:nth-child(6) | sexo-select | .MuiButtonBase-root:nth-child(1) | idade-input | 25         | temp-input | 38        | sat_ox-input | 98       | info-select | Teste-123 | continuar-button | image-upload | outlined-select-currency | .MuiButtonBase-root:nth-child(1) | solicitar-button | imagem-button        | confirmar-button | disponibilizar-button     |