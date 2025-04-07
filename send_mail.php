<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize form inputs
    $name = htmlspecialchars($_POST['name']);
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars($_POST['message']);
    
    // Check if email is valid
    if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Set the email details
        $to = "babafemiolawuni@gmail.com";  // Replace with your email
        $subject = "Message from " . $name;
        $body = "You have received a new message from $name.\n\n" .
                "Email: $email\n\n" .
                "Message:\n$message";
        
        // Set headers
        $headers = "From: $email\r\n";
        $headers .= "Reply-To: $email\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

        // Send the email
        if (mail($to, $subject, $body, $headers)) {
            echo "Message sent successfully!";
        } else {
            echo "Failed to send message.";
        }
    } else {
        echo "Invalid email address.";
    }
}
?>