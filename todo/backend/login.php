<?php
session_start();
// // 设置会话超时时间为1小时
// session_set_cookie_params(3600);
// session_start(); // 启动会话
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


// 数据库连接参数
$servername = "localhost";
$username = "todo";
$password = "todo";
$dbname = "todo";

// 创建数据库连接
$conn = new mysqli($servername, $username, $password, $dbname);

// 检查连接是否成功
if ($conn->connect_error) {
    die("数据库连接失败: " . $conn->connect_error);
}

// 设置字符集为UTF-8
$conn->set_charset("utf8mb4");

// 获取传入的账号和密码
$account = $_POST['account'];
$password = md5($_POST['password']); 

// 使用预处理语句防止SQL注入攻击
$stmt = $conn->prepare("SELECT id, username FROM users WHERE account = ? AND password = ?");
$stmt->bind_param("ss", $account, $password);
$stmt->execute();
$stmt->store_result();

// 检查账号和密码是否匹配
if ($stmt->num_rows > 0) {
    $stmt->bind_result($userId, $username);
    $stmt->fetch();

    // 将用户ID和用户名保存到会话中
    $_SESSION['userId'] = $userId;
    $_SESSION['username'] = $username;

    session_write_close();

    // 构建登录成功的响应数据
    $response = array(
        'code' => 200,
        'msg' => '登录成功',
        'data' => array(
            'userId' => $userId,
            'username' => $username,
            "id" => session_id()
        )
    );
} else {
    // 构建登录失败的响应数据
    $response = array(
        'code' => 401,
        'msg' => '登录失败，账号或密码错误',
        'data' => null
    );
}

// 将响应数据转换为JSON字符串
$json = json_encode($response);

// 设置响应头，指定返回的数据类型为JSON
header('Content-Type: application/json');

// 输出JSON字符串
echo $json;

// 关闭数据库连接
$stmt->close();
$conn->close();
?>