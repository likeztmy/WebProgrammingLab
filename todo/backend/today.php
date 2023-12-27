<?php
session_start();
// // 设置会话超时时间为1小时
// session_set_cookie_params(3600);
// session_start(); // 启动会话
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

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

// 设置字符集为中文（UTF-8）
$conn->set_charset("utf8mb4");


// 获取通过 GET 请求传递的 userId 和 endDate
$userId = $_GET['userId'];
$endDate = $_GET['endDate'];

// 执行查询，查找特定 userId 和匹配 endDate 的数据
$sql = "SELECT tt.tag_id, tt.type_id, t.id as task_id, u.id as user_id, u.username, t.task_name, t.task_description, t.start_date, t.end_date, ty.type_name, tg.tag_name, t.done
        FROM users u
        INNER JOIN task_total tt ON u.id = tt.user_id
        INNER JOIN tasks t ON tt.task_id = t.id
        LEFT JOIN task_types ty ON tt.type_id = ty.type_id
        LEFT JOIN task_tags tg ON tt.tag_id = tg.tag_id
        WHERE u.id = $userId AND t.end_date = '$endDate'"; // 添加查询条件



$result = $conn->query($sql);

// 检查查询结果
if ($result->num_rows > 0) {
    // 保存查询结果的数组
    $data = array();

    // 将查询结果存入数组
    while ($row = $result->fetch_assoc()) {
        $task = array(
            'userId' => $row['user_id'],
            'username' => $row['username'],
            'taskId' => $row['task_id'],
            'name' => $row['task_name'],
            'description' => $row['task_description'],
            'startDate' => $row['start_date'],
            'endDate' => $row['end_date'],
            'tag' => array(
                'tagId' => $row['tag_id'],
                'tagName' => $row['tag_name']
            ),
            'type' => array(
                'typeId' => $row['type_id'],
                'typeName' => $row['type_name']
            ),
            'done' => (bool)$row['done']
        );

        $data[] = $task;
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
        'msg' => '没有找到匹配的任务信息',
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