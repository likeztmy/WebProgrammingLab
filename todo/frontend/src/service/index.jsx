import dayjs from 'dayjs';

export async function getTaskBox() {
  // Default options are marked with *
  let url = 'http://localhost/todo/taskBox.php';


  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/taskBox.php?userId=${Number(userId)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getToday() {
  // Default options are marked with *
  let url = 'http://localhost/todo/today.php';

  let endDate = dayjs().format('YYYY-MM-DD')

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/today.php?userId=${Number(userId)}&endDate=${endDate}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getTags() {
  // Default options are marked with *
  let url = 'http://localhost/todo/getTags.php';

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/getTags.php?userId=${Number(userId)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getTypes() {
  // Default options are marked with *
  let url = 'http://localhost/todo/getTypes.php';

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/getTypes.php?userId=${Number(userId)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function addTask(data) {
  // Default options are marked with *
  const url = 'http://localhost/todo/addTask.php';



  let formdata = new FormData();

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    formdata.append("userId", userId);
    formdata.append("taskName", data.taskName);
    formdata.append("taskDescription", data.taskDescription);
    formdata.append("startDate", data.startDate);
    formdata.append("endDate", data.endDate);
    formdata.append("tagId", data.tagId);
    formdata.append("typeId", data.typeId);
  }


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formdata,
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function updateTask(data) {
  // Default options are marked with *
  const url = 'http://localhost/todo/updateTask.php';

  let formdata = new FormData();

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    formdata.append("userId", userId);
    formdata.append("taskId", data.taskId);
    formdata.append("taskName", data.taskName);
    formdata.append("taskDescription", data.taskDescription);
    formdata.append("endDate", data.endDate);
    formdata.append("tagId", data.tagId);
    formdata.append("typeId", data.typeId);
  }


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formdata,
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function updateTaskDone(taskId, done) {
  // Default options are marked with *
  const url = 'http://localhost/todo/updateTaskDone.php';

  let formdata = new FormData();

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    formdata.append("userId", userId);
    formdata.append("taskId", taskId);
    formdata.append("done", done);
  }


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formdata,
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function deleteTask(taskId) {
  // Default options are marked with *
  let url = 'http://localhost/todo/deleteTask.php';

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/deleteTask.php?userId=${userId}&taskId=${taskId}`
  }


  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function addTag(tagName) {
  // Default options are marked with *
  const url = 'http://localhost/todo/addTag.php';



  let formdata = new FormData();

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    formdata.append("userId", userId);
    formdata.append("tagName", tagName);
  }


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formdata,
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function deleteTag(tagId) {
  // Default options are marked with *
  let url = 'http://localhost/todo/deleteTag.php';

  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/deleteTag.php?userId=${userId}&tagId=${tagId}`
  }


  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function getTaskByType(typeId) {
  // Default options are marked with *
  let url = 'http://localhost/todo/getTaskByType.php';


  if (localStorage.getItem('userId')) {
    const userId = localStorage.getItem('userId')
    url = `http://localhost/todo/getTaskByType.php?userId=${Number(userId)}&typeId=${Number(typeId)}`;
  }

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json;charset=utf-8',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}


export async function login(data) {
  // Default options are marked with *
  const url = 'http://localhost/todo/login.php';



  let formdata = new FormData();
  formdata.append("account", data.account);
  formdata.append("password", data.password);


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formdata,
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function register(data) {
  // Default options are marked with *
  const url = 'http://localhost/todo/register.php';



  let formdata = new FormData();
  formdata.append("username", data.username);
  formdata.append("account", data.account);
  formdata.append("password", data.password);


  const response = await fetch(url, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'multipart/form-data',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formdata,
    redirect: 'follow', // manual, *follow, error
  });

  return response.json(); // parses JSON response into native JavaScript objects
}