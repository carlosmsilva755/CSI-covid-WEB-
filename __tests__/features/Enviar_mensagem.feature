Feature: Enviar_mensagem
**Historia**

**Para** visualizar um e-mail

**Eu**, como um Visitante

**Gostaria** que o sistema me apresentasse uma tela com um formulário para envio de e-mails.

**Critérios de aceitação:** Deve ser enviado os e-mails para o endereço padrão.

Pontos: 5

  Scenario: Enviar Mensagem
    Given Browse to web site "https://csi-covid.web.app/"
    And I press the "contact-button"
    And I enter "Nome_Teste" in "name-contact"
    And I enter "Email_Teste@gmail.com" in "email-contact"
    And I enter "Assunto_Teste" in "subject-contact"
    And I enter "Info_Teste" in "info-select"
    And I press the "enviar-button"
    And I see "Obrigado por contribuir com nosso site!" written on the requested page.id:"enviado-text"