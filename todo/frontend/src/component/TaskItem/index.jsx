/* eslint-disable react/prop-types */
import editIcon from '../../assets/icon/edit.svg'
import deleteIcon from '../../assets/icon/delete.svg'
import tag1Icon from '../../assets/icon/tag1.svg'
import lastDateIcon from '../../assets/icon/lastDate.svg'
import './index.less'
import TaskEdit from '../TaskEdition'
import { useState } from 'react'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, message } from 'antd';
import { deleteTask, updateTaskDone } from '../../service'
const { confirm } = Modal;

export default function TaskItem({ taskInfo }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [task, setTask] = useState(taskInfo);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const showConfirm = () => {
    confirm({
      title: '确定要删除该任务吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后不可恢复',
      onOk() {
        deleteTask(taskInfo.taskId).then(
          res => {
            if (res.code === 200) {
              window.location.reload();
            }
          }
        )
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleChange = () => {
    setTask({ ...task, done: !task.done })
    updateTaskDone(taskInfo.taskId, !task.done).then(
      res => {
        if (res.code === 200 && !task.done === true) {
          message.success("恭喜！任务已成功完成！🎉");
        }
      }
    )
  }

  return (
    <>
      <div className={task.done ? 'task-item-wrap task-item-done-wrap' : 'task-item-wrap'}>
        <div className='task-item-checkbox'>
          <input className='task-checkbox' type="checkbox" onChange={handleChange} checked={task.done} />
        </div>
        <div className='task-item-content'>
          <div className='task-item-title'>{task.name}</div>
          <div className='task-item-description'>{task.description}</div>
          <div className='task-item-about'>
            <div className='task-item-about-message'>
              <div className='task-item-lastDate-box'>
                <div className='task-item-lastDate-icon'>
                  <img src={lastDateIcon} alt="" />
                </div>
                <div className='task-item-lastDate-content'>{task.endDate}</div>
              </div>
              <div className='task-item-tag-box'>
                {task.tag.tagId !== "-1" && <div className='task-item-tag-icon'>
                  <img src={tag1Icon} alt="" />
                </div>}
                <div className='task-item-tag-name'>{task.tag.tagName}</div>
              </div>
            </div>
            <div className='task-item-about-operate'>
              <div className='task-item-operate-list-box'>
                <ul className='task-item-operate-list'>
                  <li className='task-item-edit' onClick={showModal}><div><img src={editIcon} alt="" /></div></li>
                  <li className='task-item-delete' onClick={showConfirm}><div><img src={deleteIcon} alt="" /></div></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div >
      {isModalOpen && <TaskEdit isModalOpen={isModalOpen} closeModal={closeModal} taskInfo={task} />
      }
    </>
  )
}

