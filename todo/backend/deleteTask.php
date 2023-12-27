<?php
session_start();
// // 设置会话超时时间为1小时
// session_set_cookie_params(3600);
// session_start(); // 启动会话
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST,DELETE ,OPTIONS");
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

$uri = $_SERVER['REQUEST_URI'];

// 使用 parse_url 解析 URI 中的查询字符串
$queryString = parse_url($uri, PHP_URL_QUERY);

// 使用 parse_str 解析查询字符串为关联数组
parse_str($queryString, $queryParams);

// 获取 taskId 和 userId 的值
$taskId = $queryParams['taskId'];
$userId = $queryParams['userId'];

// 现在 $taskId 和 $userId 变量包含了相应的值


if (!$userId) {
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

// 删除任务数据"DELETE FROM tasks WHERE id = $taskId";
$sqlDeleteTaskTotal = "DELETE FROM task_total WHERE task_id = $taskId";

if ($conn->query($sqlDeleteTaskTotal) === TRUE) {
  // 如果删除成功，还需要删除对应的 task_total 表中的记录
  $sqlDeleteTask = "DELETE FROM tasks WHERE id = $taskId";

  if ($conn->query($sqlDeleteTask) === TRUE) {
    // 构建成功响应的关联数组
    $response = array(
      'code' => 200,
      'msg' => '任务已成功删除'
    );
  } else {
    $response = array(
      'code' => 500,
      'msg' => '删除任务关联记录时发生错误: ' . $conn->error
    );
  }
} else {
  $response = array(
    'code' => 500,
    'msg' => '删除任务时发生错误: ' . $conn->error
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
