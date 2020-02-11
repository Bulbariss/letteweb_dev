<?php
require "PHPMailer/PHPMailerAutoload.php";


$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 
 
// // If form is submitted 
// if(isset($_POST['name']) || isset($_POST['email']) || isset($_POST['file'])){ 
//     // Get the submitted form data 
//     $name = $_POST['name']; 
//     $email = $_POST['email']; 
// }

function smtpmailer($to, $from, $from_name, $subject, $body)
    {
        if(isset($_POST['name']) || isset($_POST['email']) || isset($_POST['subject']) || isset($_POST['msg'])){ 
        $mail = new PHPMailer();
        $mail->IsSMTP();
        $mail->SMTPAuth = true; 
 
        $mail->SMTPSecure = 'ssl'; 
        $mail->Host = 'dayosh.ru';
        $mail->Port = 465;  
        $mail->Username = 'send@dayosh.ru';
        $mail->Password = 'wydcaw-mivqyn-mukTi0';   
   
   //   $path = 'reseller.pdf';
   //   $mail->AddAttachment($path);
   
        $mail->IsHTML(true);
        $mail->From="send@dayosh.ru";
        $mail->FromName=$from_name;
        $mail->Sender= $_POST['email'];
        $mail->AddReplyTo($from, $from_name);
        $mail->Subject = $subject;
        $mail->Body = $body;
        $mail->AddAddress($to);
        if(!$mail->Send())
        {
            $error ="Please try Later, Error Occured while Processing...";
            return $error; 
            
            $response['message'] = 'Form data submitted successfully!'; 
        }
        else 
        {
            $error = "Thanks You !! Your email is sent.";  
            return $error;
$response['message'] = 'Form data submitted successfully!'; 
        }
    }
    }

    if(1 != 2)
        {
            $error ="111";
            return $error; 
        }
    
    $to   = 'alkelk@mail.ru';
    $from = $_POST['email'];
    $name = $_POST['name'];
    $subj = $_POST['subject'];
    $msg = $_POST['msg'];

    $error=smtpmailer($to,$from, $name ,$subj, $msg);

    echo json_encode($response);
?>

<html>
    <body style="background: black;">
        <center><h2 style="padding-top:70px;color: white;"><?php echo $error; ?></h2></center>
    </body>
    
</html>