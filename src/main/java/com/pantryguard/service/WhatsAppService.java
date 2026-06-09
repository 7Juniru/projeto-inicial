package com.pantryguard.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class WhatsAppService {

    @Value("${twilio.account.sid}")
    private String accountSid;

    @Value("${twilio.auth.token}")
    private String authToken;

    @Value("${twilio.whatsapp.number}")
    private String fromNumber;

    public void sendWhatsAppMessage(String to, String body) {
        if (accountSid == null || accountSid.contains("seu_") || authToken == null || authToken.contains("seu_")) {
            System.out.println("[WhatsApp Mock] Twilio não configurado. Simulação de WhatsApp para " + to + ": " + body);
            return;
        }
        try {
            Twilio.init(accountSid, authToken);
            Message message = Message.creator(
                    new com.twilio.type.PhoneNumber(to),
                    new com.twilio.type.PhoneNumber(fromNumber),
                    body
            ).create();
            System.out.println("Mensagem WhatsApp enviada com sucesso! Twilio SID: " + message.getSid());
        } catch (Exception e) {
            System.err.println("Erro ao enviar mensagem de WhatsApp pelo Twilio: " + e.getMessage());
        }
    }
}
