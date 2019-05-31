<?php
    include 'conn.php';

    $gid = isset($_GET['gid']) ? $_GET['gid'] : '1';

    $sql = "SELECT * FROM goods WHERE gid = $gid";

    $res = $conn->query($sql);

    $content = $res->fetch_all(MYSQLI_ASSOC);

    echo json_encode($content,JSON_UNESCAPED_UNICODE);
?>