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

if (!isset($_GET['userId'])) {
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

// 查询task_types表中的所有数据
$sql = "SELECT * FROM task_types";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // 保存查询结果的数组
    $data = array();

    // 将查询结果存入数组
    while ($row = $result->fetch_assoc()) {
        $type = array(
            'typeId' => $row['type_id'],
            'typeName' => $row['type_name']
        );

        $data[] = $type;
    }

    // 构建响应数据
    $response = array(
        'code' => 200,
        'msg' => '操作成功',
        'data' => $data
    );

    // 将数组转换为JSON字符串
    $json = json_encode($response);

    // 设置响应头，指定返回的数据类型为JSON
    header('Content-Type: application/json');

    // 输出JSON字符串
    echo $json;
} else {
    // 构建响应数据
    $response = array(
        'code' => 200,
        'msg' => '没有找到类型信息',
        'data' => array()
    );

    // 将数组转换为JSON字符串
    $json = json_encode($response);

    // 设置响应头，指定返回的数据类型为JSON
    header('Content-Type: application/json');

    // 输出JSON字符串
    echo $json;
}

// 关闭数据库连接
$conn->close();
?>