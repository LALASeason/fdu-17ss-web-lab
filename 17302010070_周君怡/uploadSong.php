<?php
/**
 * Created by PhpStorm.
 * User: 周君怡
 * Date: 2018/6/19
 * Time: 21:21
 */
$name = $_FILES['file_upload']['name'];
$fileName = "./files/" . substr($name, 0, strlen($name) - 3) . "lrc";
$file = $_FILES['file_upload']['tmp_name'];
$aim = "./files/" . $_FILES['file_upload']['name'];
if (move_uploaded_file($file,$aim)){
    echo 'Upload successfully!';
}else{
    echo 'Fail to upload.';
}
$lyrics = $_POST['edit_lyric'];
file_put_contents($file,$lyrics);