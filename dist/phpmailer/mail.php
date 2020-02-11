<?php
require "PHPMailer/PHPMailerAutoload.php";

$response = array( 
    'status' => 0, 
    'message' => 'Form submission failed, please try again.' 
); 


function smtpmailer($to, $from, $from_name, $subject, $body)
    {
        // if(isset($_POST['name']) || isset($_POST['email']) || isset($_POST['subject']) || isset($_POST['msg'])){ 
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
            $mail->From="mail@dayosh.ru";
            $mail->FromName=$from_name;
            $mail->Sender=$from;
            $mail->AddReplyTo($from, $from_name);
            $mail->Subject = "{$_POST['subject']}";
            $mail->Body = "{$_POST['name']} {$_POST['msg']}";
            $mail->AltBody = "{$_POST['msg']}";
            $mail->AddAddress($to);
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

        }
    // }
    
    
    $to   = 'alkelk@mail.ru';
    // $from = 'send@dayosh.ru';
    // $name = $_POST['name'];
    // $subj = 'PHPMailer 5.2 testing from DomainRacer';
    // $msg = 'This is mail about testing mailing using PHP.';
    // $from = $_POST['email'];
    // $name = $_POST['name'];
    // $subj = $_POST['subject'];
    // $msg = $_POST['msg'];
    
    smtpmailer($to,$from, $name ,$subj, $msg);
    echo json_encode($response);
  
?>