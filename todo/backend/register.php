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

// 初始化 userId 为 null
$userId = null;

// 从用户提交的表单中获取注册信息
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $account = $_POST["account"]; // 用户账号
    $password = $_POST["password"]; // 用户密码
    $username = $_POST["username"]; // 用户名

    // 检查用户账号是否已存在
    $sqlCheckAccount = "SELECT * FROM users WHERE account = ?";
    $stmt = $conn->prepare($sqlCheckAccount);
    $stmt->bind_param("s", $account); // 绑定参数类型和值
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // 用户账号已存在，返回错误信息
        $response = array(
            'code' => 400,
            'msg' => '用户账号已存在',
            'data' => null
        );
    } else {
        // 用户账号不存在，将用户信息插入数据库
        $sqlInsertUser = "INSERT INTO users (account, password, username) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sqlInsertUser);
        $stmt->bind_param("sss", $account, $password, $username); // 绑定参数类型和值

        if ($stmt->execute()) {
            // 用户注册成功，查询生成的 userId
            $userId = $stmt->insert_id;

            // 构建成功响应包含 userId
            $response = array(
                'code' => 200,
                'msg' => '用户注册成功',
                'data' => array(
                    'userId' => $userId,
                    'username' => $username
                )
            );
        } else {
            // 用户注册失败
            $response = array(
                'code' => 500,
                'msg' => '用户注册失败: ' . $conn->error,
                'data' => null
            );
        }
    }

    // 将响应数据转换为JSON字符串
    $json = json_encode($response);

    // 设置响应头，指定返回的数据类型为JSON
    header('Content-Type: application/json');

    // 输出JSON字符串
    echo $json;
}

// 关闭数据库连接
$conn->close();
?>
