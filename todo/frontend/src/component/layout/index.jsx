import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import "./index.less";
import addIcon from "../../assets/icon/add.svg";
import taskBoxIcon from "../../assets/icon/taskBox.svg";
import dateIcon from "../../assets/icon/date.svg";
import tagIcon from "../../assets/icon/tag.svg";
import TaskAddition from "../TaskAddition";

export default function Layout() {

  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [greet, setGreet] = useState("");

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  useEffect(() => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 6 && currentHour < 12) {
      setGreet("上午好🌄！");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGreet("下午好🌞！");
    } else {
      setGreet("晚上好🌙！");
    }
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const logout = () => {
    localStorage.clear();
    navigate('/login');
  }

  return (
    <div className="app-wrap">
      <aside className="aside-wrap">
        <div className="aside-box">
          <div className="aside-header-box">
            <div className="say-hello">{greet}</div>
            <div className="user-name">{localStorage.getItem('username')}</div>
          </div>
          <div className="aside-task-box">
            <ul className="task-nav-items">
              <li className="task-nav-item" onClick={showModal}>
                <div className="task-nav-item-icon">
                  <img src={addIcon} alt="" />
                </div>
                <div className="task-nav-item-name">添加任务</div>
              </li>
              <li className="task-nav-item" onClick={() => navigate('task')}>
                <div className="task-nav-item-icon">
                  <img src={taskBoxIcon} alt="" />
                </div>
                <div className="task-nav-item-name">收件箱</div>
              </li>
              <li className="task-nav-item" onClick={() => navigate('today')}>
                <div className='task-nav-item-icon'>
                  <img src={dateIcon} alt="" />
                </div>
                <div className="task-nav-item-name">今天</div>
              </li>
              <li className="task-nav-item" onClick={() => navigate('tag')}>
                <div className='task-nav-item-icon'>
                  <img src={tagIcon} alt="" />
                </div>
                <div className="task-nav-item-name">标签</div>
              </li>
            </ul>
          </div>
          <div className="aside-project-box">
            <div className="aside-project-box-title">我的项目</div>
            <ul className="project-nav-items">
              <li className="project-nav-item" onClick={() => navigate('project?type=2')}>
                <div className="project-nav-item-name"><b>#</b> 生活</div>
              </li>
              <li className="project-nav-item" onClick={() => navigate('project?type=3')}>
                <div className="project-nav-item-name"><b>#</b> 教育</div>
              </li>
              <li className="project-nav-item" onClick={() => navigate('project?type=4')}>
                <div className="project-nav-item-name"><b>#</b> 工作</div>
              </li>
            </ul>
          </div>
        </div>
        <div className="logout-box">
          <div className="logout-btn" onClick={logout}>退出</div>
        </div>
      </aside>
      <div className="main-wrap">
        <main className="main-content">
          <Outlet></Outlet>
        </main>
      </div>
      {isModalOpen && <TaskAddition isModalOpen={isModalOpen} closeModal={closeModal} />}
    </div>
  );
}
