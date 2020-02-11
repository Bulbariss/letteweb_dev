<?php
require "PHPMailer/PHPMailerAutoload.php";

function smtpmailer($to, $from, $from_name, $subject, $body)
    {
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPAuth = true; 
 
        $mail->SMTPSecure = 'ssl'; 
        $mail->Host = 'mail.dayosh.ru';
        $mail->Port = 465;  
        $mail->Username = 'send@dayosh.ru';
        $mail->Password = 'wydcaw-mivqyn-mukTi0';   
   
   //   $path = 'reseller.pdf';
   //   $mail->AddAttachment($path);
   
        $mail->IsHTML(true);
        $mail->From="send@dayosh.ru";
        $mail->FromName=$from_name;
        $mail->Sender=$from;
        $mail->AddReplyTo($from, $from_name);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AddAddress($to);
        if(!$mail->Send())
        {
            $error ="Please try Later, Error Occured while Processing...";
            return $error; 
        }
        else 
        {
            $error = "Thanks You !! Your email is sent.";  
            return $error;
        }
    }
    
    $to   = 'alkelk@mail.ru';
    $from = 'send@dayosh.ru';
    $name = 'tets';
    $subj = 'PHPMailer 5.2 testing from DomainRacer';
    $msg = 'This is mail about testing mailing using PHP.';
//     $msg = "";

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
// //   $name = test_input($_POST["name"]);
// //   $email = test_input($_POST["email"]);
// //   $website = test_input($_POST["website"]);
// //   $comment = test_input($_POST["comment"]);
// //   $gender = test_input($_POST["gender"]);
//      $msg = test_input($_POST["msg"]);
// }

    $error=smtpmailer($to,$from, $name ,$subj, $msg);
    
?>

<html>
    <body style="background: black;">
        <center><h2 style="padding-top:70px;color: white;"><?php echo $error; ?></h2></center>
    </body>
    
</html>