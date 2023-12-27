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

// 从前端 POST 请求中获取更新任务的数据
$taskId = $_POST["taskId"]; // 任务ID
$taskName = $_POST["taskName"]; // 更新后的任务名称
$taskDescription = $_POST["taskDescription"]; // 更新后的任务描述
$typeId = $_POST["typeId"]; // 更新后的类型ID
$tagId = $_POST["tagId"]; // 更新后的标签ID
$endDate = $_POST["endDate"]; // 更新后的结束日期

// 更新任务数据
$sqlUpdateTask = "UPDATE tasks
                  SET task_name = '$taskName',
                      task_description = '$taskDescription',
                      end_date = '$endDate'
                  WHERE id = $taskId";

if ($conn->query($sqlUpdateTask) === TRUE) {
    // 更新任务的类型和标签
    $sqlUpdateTaskTotal = "UPDATE task_total
                           SET type_id = $typeId,
                               tag_id = $tagId
                           WHERE task_id = $taskId";

    if ($conn->query($sqlUpdateTaskTotal) === TRUE) {
        // 构建成功响应的关联数组
        $response = array(
            'code' => 200,
            'msg' => '任务已成功更新'
        );
    } else {
        $response = array(
            'code' => 500,
            'msg' => '更新任务类型和标签时发生错误: ' . $conn->error
        );
    }
} else {
    $response = array(
        'code' => 500,
        'msg' => '更新任务时发生错误: ' . $conn->error
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
