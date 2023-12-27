import './index.less'
import TaskItem from '../../component/TaskItem'
import { useEffect, useState } from 'react'
import { getTaskBox } from '../../service'

export default function TaskBox() {

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTaskBox().then(
      res => {
        setTasks(res.data);
      }
    )
  }, [])

  return (
    <div className='taskbox-wrap'>
      <div className='taskbox-content'>
        <div className='taskbox-wrap-title-box'>
          <div className='taskbox-wrap-title'>收件箱</div>
        </div>
        <div className='task-list-box'>
          <ul className='task-list'>
            {
              tasks.map(task => {
                return <li key={task.taskId}><TaskItem taskInfo={task} /></li>
              })
            }
          </ul>
        </div>
      </div>
    </div>
  )
}
