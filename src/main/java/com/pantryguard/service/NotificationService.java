package com.pantryguard.service;

import com.pantryguard.model.Product;
import com.pantryguard.model.User;
import com.pantryguard.repository.ProductRepository;
import com.pantryguard.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import com.pantryguard.service.EmailService;
import com.pantryguard.service.WhatsAppService;
import com.pantryguard.service.PushNotificationService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired(required = false)
    private EmailService emailService;

    @Autowired(required = false)
    private WhatsAppService whatsappService;

    @Autowired(required = false)
    private PushNotificationService pushNotificationService;

    // Schedule to run daily at 09:00 AM São Paulo time (BRT)
    @Scheduled(cron = "0 0 9 * * *", zone = "America/Sao_Paulo")
    public void sendDailyNotifications() {
        List<Product> products = productRepository.findAll();
        if (products.isEmpty()) {
            System.out.println("[NotificationService] No products found for notification.");
            return;
        }
        // Retrieve a user for contact info (simplified: use first user if exists)
        User user = userRepository.findAll().stream().findFirst().orElse(null);
        String email = (user != null && user.getEmail() != null) ? user.getEmail() : "test@example.com";
        String whatsapp = (user != null && user.getWhatsapp() != null) ? user.getWhatsapp() : "whatsapp:+1234567890";
        String pushToken = (user != null && user.getWhatsapp() != null) ? user.getWhatsapp() : "dummy_push_token"; // placeholder

        for (Product product : products) {
            try {
                LocalDate today = LocalDate.now(ZoneId.of("America/Sao_Paulo"));
                LocalDate expiry = LocalDate.parse(product.getData_validade(), DateTimeFormatter.ISO_LOCAL_DATE);
                long daysUntil = ChronoUnit.DAYS.between(today, expiry);
                String status;
                if (daysUntil <= 3) {
                    status = "Crítico";
                } else if (daysUntil <= 7) {
                    status = "Alerta";
                } else {
                    continue; // not eligible for notification
                }
                String subject = "Produto " + status + ": " + product.getNome();
                String body = "O produto '" + product.getNome() + "' está com status " + status + ".\n" +
                        "Data de validade: " + product.getData_validade() + " (em " + daysUntil + " dias).\n" +
                        "Quantidade disponível: " + product.getQuantidade();

                // Send via Email
                if (emailService != null) {
                    emailService.sendEmail(email, subject, body);
                } else {
                    System.out.println("[NotificationService] EmailService not configured. Mock email to " + email);
                }
                // Send via WhatsApp
                if (whatsappService != null) {
                    whatsappService.sendWhatsAppMessage(whatsapp, body);
                } else {
                    System.out.println("[NotificationService] WhatsAppService not configured. Mock WhatsApp to " + whatsapp);
                }
                // Send via Push Notification
                if (pushNotificationService != null) {
                    pushNotificationService.sendPush(pushToken, subject, body);
                } else {
                    System.out.println("[NotificationService] PushNotificationService not configured. Mock push to token " + pushToken);
                }
            } catch (Exception e) {
                System.err.println("[NotificationService] Error processing product ID " + product.getId() + ": " + e.getMessage());
            }
        }
    }
}
