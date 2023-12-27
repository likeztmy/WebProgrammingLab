import './index.less'
import TaskItem from '../../component/TaskItem'
import { useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getTaskByType } from '../../service';
import { Empty } from 'antd';
export default function Project() {

  const typeTable = {
    2: "生活",
    3: "教育",
    4: "工作"
  }

  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [type, setType] = useState(-1);

  useEffect(() => {
    const newType = location.search.split("=")[1];
    setType(newType);
    getTaskByType(newType).then(
      res => {
        const newTasks = res.data.sort((task1, task2) => {
          const date1 = new Date(task1.startDate);
          const date2 = new Date(task2.startDate);
          return date2 - date1;
        })
        setTasks(newTasks);
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])


  return (
    <div className='taskbox-wrap'>
      <div className='taskbox-content'>
        <div className='taskbox-wrap-title-box'>
          <div className='taskbox-wrap-title'>{typeTable[type] ? typeTable[type] : ""}</div>
          <div className='taskbox-wrap-count'>{tasks.length}条</div>
        </div>
        {tasks.length !== 0 && <div className='task-list-box'>
          <ul className='task-list'>
            {tasks.map((task) => {
              return <li key={task.taskId}><TaskItem taskInfo={task} /></li>
            })}
          </ul>
        </div>}
        {
          tasks.length === 0 && <Empty description={"暂无待办事项"} />
        }
      </div>
    </div>
  )
}
