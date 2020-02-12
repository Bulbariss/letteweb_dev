<?php
require "PHPMailer/PHPMailerAutoload.php";

$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 

$mail = new PHPMailer();
$mail->IsSMTP();
$mail->SMTPAuth = true; 

$mail->SMTPSecure = 'ssl'; 
$mail->Host = 'dayosh.ru';
$mail->Port = 465;  
$mail->Username = 'send@dayosh.ru';
$mail->Password = 'wydcaw-mivqyn-mukTi0';   

$mail->IsHTML(true);
$mail->From="mail@dayosh.ru";
$mail->FromName="mail@dayosh.ru";
$mail->Sender="mail@dayosh.ru";
$mail->AddReplyTo("mail@dayosh.ru", "mail@dayosh.ru");
$mail->Subject = "{$_POST['subject']}";
$mail->Body = "{$_POST['name']} {$_POST['msg']}";
$mail->AltBody = "{$_POST['msg']}";
$mail->AddAddress('alkelk@mail.ru');

if(!$mail->Send())
{
    global $response;
    $response = array( 
        'status' => 0, 
        'message' => 'Form submission failed, please try again.' 
    ); 
}
else 
{
    global $response;
    $response = array( 
        'status' => 1, 
        'message' => 'Form data submitted successfully!' 
    ); 
                
}
    
    
    $to   = 'alkelk@mail.ru';
    // $from = 'send@dayosh.ru';
    // $name = $_POST['name'];
    // $subj = 'PHPMailer 5.2 testing from DomainRacer';
    // $msg = 'This is mail about testing mailing using PHP.';
    // $from = $_POST['email'];
    // $name = $_POST['name'];
    // $subj = $_POST['subject'];
    // $msg = $_POST['msg'];
    
    echo json_encode($response);
  
?>