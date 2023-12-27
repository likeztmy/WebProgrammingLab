import './index.less'
import TaskItem from '../../component/TaskItem'
import { useEffect, useState } from 'react'
import { getToday } from '../../service'
import { Empty } from 'antd';

export default function Today() {

  const [tasks, setTasks] = useState([]);
  const [tasks1, setTasks1] = useState([])
  const [tasks2, setTasks2] = useState([])
  const [tasks3, setTasks3] = useState([])
  const [tasks4, setTasks4] = useState([])

  useEffect(() => {
    getToday().then(
      res => {
        setTasks(res.data)
        const newTasks1 = res.data.filter((task) => Number(task.type.typeId) === 1);
        setTasks1(newTasks1);
        const newTasks2 = res.data.filter((task) => Number(task.type.typeId) === 2);
        setTasks2(newTasks2);
        const newTasks3 = res.data.filter((task) => Number(task.type.typeId) === 3);
        setTasks3(newTasks3);
        const newTasks4 = res.data.filter((task) => Number(task.type.typeId) === 4);
        setTasks4(newTasks4);
      }
    )
  }, [])


  return (
    <div className='taskbox-wrap'>
      <div className='taskbox-content'>
        <div className='taskbox-wrap-title-box'>
          <div className='taskbox-wrap-title'>今天</div>
          <div className='taskbox-wrap-count'>{tasks.length}条</div>
        </div>
        <div className='task-add-box'>

        </div>
        <div className='task-list-box'>
          <div className='task-list-box-title'>收件箱</div>
          {tasks1.length !== 0 ? <ul className='task-list'>
            {tasks1.map((task) => {
              return <li key={task.taskId}><TaskItem taskInfo={task} /></li>
            })}
          </ul> : <Empty description={"暂无待办事项"} />}
        </div>
        <div className='task-list-box'>
          <div className='task-list-box-title'>生活</div>
          {tasks2.length !== 0 ? <ul className='task-list'>
            {tasks2.map((task) => {
              return <li key={task.taskId}><TaskItem taskInfo={task} /></li>
            })}
          </ul> : <Empty description={"暂无待办事项"} />}
        </div>
        <div className='task-list-box'>
          <div className='task-list-box-title'>教育</div>
          {tasks3.length !== 0 ? <ul className='task-list'>
            {tasks3.map((task) => {
              return <li key={task.taskId}><TaskItem taskInfo={task} /></li>
            })}
          </ul> : <Empty description={"暂无待办事项"} />}
        </div>
        <div className='task-list-box'>
          <div className='task-list-box-title'>工作</div>
          {tasks4.length !== 0 ? <ul className='task-list'>
            {tasks4.map((task) => {
              return <li key={task.taskId}><TaskItem taskInfo={task} /></li>
            })}
          </ul> : <Empty description={"暂无待办事项"} />}
        </div>
      </div>
    </div>
  )
}
