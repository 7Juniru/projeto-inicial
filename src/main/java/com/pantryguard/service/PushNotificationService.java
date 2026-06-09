package com.pantryguard.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class PushNotificationService {

    @Autowired(required = false)
    private FirebaseMessaging firebaseMessaging;

    @Value("${firebase.server.key:}")
    private String serverKey; // placeholder, not used directly

    /**
     * Sends a push notification to a device token. If Firebase is not configured, a mock message is printed.
     * @param token the device token (FCM registration token)
     * @param title notification title
     * @param body notification body
     */
    public void sendPush(String token, String title, String body) {
        if (firebaseMessaging == null) {
            System.out.println("[Push Mock] Firebase not configured. Simulated push to token: " + token + " | " + title + " - " + body);
            return;
        }
        try {
            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(Notification.builder()
                            .setTitle(title)
                            .setBody(body)
                            .build())
                    .build();
            String response = firebaseMessaging.send(message);
            System.out.println("Push notification sent, response: " + response);
        } catch (Exception e) {
            System.err.println("Error sending push notification: " + e.getMessage());
        }
    }
}
