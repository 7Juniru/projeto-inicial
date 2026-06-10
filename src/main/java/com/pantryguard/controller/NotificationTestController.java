package com.pantryguard.controller;

import com.pantryguard.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/notifications")
public class NotificationTestController {

    @Autowired
    private NotificationService notificationService;

    /**
     * Endpoint to manually trigger the daily notification logic.
     * Useful for testing without waiting for the scheduled 09:00 BRT run.
     */
    @PostMapping("/test")
    public String triggerNotifications() {
        notificationService.sendDailyNotifications();
        return "Notification dispatch triggered (check logs for email/WhatsApp/push).";
    }
}
