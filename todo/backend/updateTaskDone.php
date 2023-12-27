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

// 从前端请求中获取要更新的任务的 done 和 taskId 数据
$done = $_POST["done"]; // 新的 done 值
$taskId = $_POST["taskId"]; // 任务ID

// 使用 prepared statement 更新任务的 done 值
$sqlUpdateTask = "UPDATE tasks SET done = $done WHERE id = $taskId";
$stmt = $conn->prepare($sqlUpdateTask);
if ($stmt->execute()) {
  // 更新成功
  $response = array(
      'code' => 200,
      'msg' => '任务已完成',
      'data' => null // 如果有其他需要返回的数据，可以在这里添加
  );
} else {
  // 更新失败
  $response = array(
      'code' => 500,
      'msg' => '更新任务时发生错误: ' . $conn->error,
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
$conn->close();
?>