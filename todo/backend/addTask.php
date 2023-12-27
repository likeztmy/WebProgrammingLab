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

// 从前端 POST 请求中获取任务数据
$userId = $_POST['userId'];
$taskName = $_POST["taskName"];
$taskDescription = $_POST["taskDescription"];
$startDate = $_POST["startDate"];
$endDate = $_POST["endDate"];
$tagId = $_POST["tagId"]; // 请确保前端发送了正确的标签ID
$typeId = $_POST["typeId"]; // 请确保前端发送了正确的类型ID

// 插入任务数据到tasks表
$sqlInsertTask = "INSERT INTO tasks (task_name, task_description, start_date, end_date, done)
                  VALUES ('$taskName', '$taskDescription', '$startDate', '$endDate', 0)";

if ($conn->query($sqlInsertTask) === TRUE) {
  // 获取插入任务的ID
  $taskId = $conn->insert_id;

  // 插入对应的记录到task_total表
  $sqlInsertTaskTotal = "INSERT INTO task_total (user_id, task_id, type_id, tag_id)
                         VALUES ($userId, $taskId, $typeId, $tagId)";

  if ($conn->query($sqlInsertTaskTotal) === TRUE) {
      // 构建成功响应的关联数组
      $response = array(
          'code' => 200,
          'msg' => '任务已成功创建并插入到数据库中'
      );
  } else {
      $response = array(
          'code' => 500,
          'msg' => '插入到task_total表时发生错误: ' . $conn->error
      );
  }
} else {
  $response = array(
      'code' => 500,
      'msg' => '插入到tasks表时发生错误: ' . $conn->error
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
