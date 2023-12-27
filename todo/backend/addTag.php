<?php
session_start();
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

if (!isset($_POST['userId'])) {
  // 如果会话中没有userId，返回未登录错误
  $response = array(
      'code' => 401,
      'msg' => "用户未登录",
      'data' => array()
  );
  header('Content-Type: application/json');
  echo json_encode($response);
  exit; // 终止脚本执行
}

// 从前端请求中获取要插入的标签数据
$tagName = $_POST["tagName"]; // 新的标签名称
$userId = $_POST['userId'];

// 插入标签数据到 task_tags 表
$sqlInsertTag = "INSERT INTO task_tags (tag_name) VALUES ('$tagName')";

if ($conn->query($sqlInsertTag) === TRUE) {
    // 获取插入标签的ID
    $tagId = $conn->insert_id;

    // 插入对应的记录到 user_tags 表，关联用户和标签
    $sqlInsertUserTag = "INSERT INTO user_tags (user_id, tag_id) VALUES ($userId, $tagId)";

    if ($conn->query($sqlInsertUserTag) === TRUE) {
        $response = array(
            'code' => 200,
            'msg' => '标签创建成功',
            'data' => array()
        );
    } else {
        $response = array(
            'code' => 500,
            'msg' => '插入到user_tags表时发生错误: ' . $conn->error,
            'data' => array()
        );
    }
} else {
    $response = array(
        'code' => 500,
        'msg' => '插入标签时发生错误: ' . $conn->error,
        'data' => array()
    );
}

// 将响应数据转换为JSON字符串
$json = json_encode($response);

// 设置响应头，指定返回的数据类型为JSON
header('Content-Type: application/json');

// 输出JSON字符串
echo $json;

// 关闭数据库连接
$conn->close();
?>
