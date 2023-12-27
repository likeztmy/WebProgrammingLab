<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (!isset($_GET['userId'])) {
    // 如果会话中没有userId，返回未登录错误
    $response = array(
        'code' => 401,
        'msg' => '未登录',
        'data' => array()
    );
    header('Content-Type: application/json');
    echo json_encode($response);
    exit; // 终止脚本执行
}

$userId = $_GET['userId']; // 获取当前用户的ID

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

// 查询指定用户创建的标签
$sql = "SELECT tt.tag_id, tg.tag_name
        FROM user_tags tt
        INNER JOIN task_tags tg ON tt.tag_id = tg.tag_id
        WHERE tt.user_id = $userId";

$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $data = array();

    while ($row = $result->fetch_assoc()) {
        $tag = array(
            'tagId' => $row['tag_id'],
            'tagName' => $row['tag_name']
        );

        $data[] = $tag;
    }

    $response = array(
        'code' => 200,
        'msg' => '查询成功',
        'data' => $data
    );
} else {
    $response = array(
        'code' => 200,
        'msg' => '没有找到标签信息',
        'data' => array()
    );
}

// 将数组转换为JSON字符串
$json = json_encode($response);

// 设置响应头，指定返回的数据类型为JSON
header('Content-Type: application/json');

// 输出JSON字符串
echo $json;

// 关闭数据库连接
$conn->close();
?>
