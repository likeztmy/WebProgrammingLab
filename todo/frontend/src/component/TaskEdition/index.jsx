/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import './index.less'
import dayjs from 'dayjs';
import { DatePicker, Select, Input, Modal, message } from 'antd';
import { getTags, getTypes, updateTask } from '../../service';


// eslint-disable-next-line react/prop-types
export default function TaskEdit({ isModalOpen, closeModal, taskInfo }) {

  // eslint-disable-next-line react/prop-types
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tagId, setTagId] = useState(0);
  const [typeId, setTypeId] = useState(0);

  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {
    getTags().then(
      res => {
        const newTags = res.data.map((tag) => {
          return {
            value: tag.tagId,
            label: tag.tagName
          }
        })
        setTags(newTags)
      }
    )

    getTypes().then(
      res => {
        const newTypes = res.data.map((type) => {
          return {
            value: type.typeId,
            label: type.typeName
          }
        })
        setTypes(newTypes)
      }
    )
  }, [])

  useEffect(() => {
    setTaskName(taskInfo.name);
    setTaskDescription(taskInfo.description);
    setEndDate(taskInfo.endDate);
    setTagId(taskInfo.tag.tagId);
    setTypeId(taskInfo.type.typeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  const handleOk = () => {

    if (!taskName || !taskDescription || !typeId || !tagId || !endDate) {
      message.warning('请填写完整的信息！')
      return;
    }

    let data = {
      taskId: taskInfo.taskId,
      taskName: taskName,
      taskDescription: taskDescription,
      endDate: endDate,
      tagId: tagId,
      typeId: typeId
    };

    updateTask(data).then(
      res => {
        if (res.code === 200) {
          message.success('修改成功');
          setTimeout(() => {
            closeModal();
            window.location.reload()
          }, 1500);
        }
      }
    )

    closeModal()

  };

  const handleCancel = () => {
    closeModal()
  };

  return (
    <>
      <Modal
        title="修改任务"
        okText={"修改"}
        cancelText={"取消"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false} style={{
          width: '600px'
        }}
      >
        <div className='taskEdit-wrap'>
          <div className='task-title-box'>
            <input
              value={taskName}
              onChange={(e) => {
                setTaskName(e.target.value);
              }}
              type="text"
              placeholder='任务名称'
            />
          </div>
          <div className='task-description-box'>
            <Input.TextArea
              value={taskDescription}
              onChange={(e) => {
                setTaskDescription(e.target.value);
              }}
              style={{
                width: '100%',
                outlineStyle: 'none',
                border: 'none',
                borderBottom: '1px solid #cecece',
                fontSize: '16px'
              }}
              type="text"
              placeholder='描述'
              maxLength={500}
              autoSize={{ minRows: 1, maxRows: 20 }}
            />
          </div>
          <div className='task-about-box'>
            <div className='task-date-box'>
              <DatePicker
                defaultValue={dayjs(taskInfo.endDate)}
                onChange={(date, dateString) => {
                  setEndDate(dateString);
                }}
                style={{
                  width: 120,
                }}
                disabledDate={disabledDate}
              />
            </div>
            <div className='task-type-box'>
              <Select
                defaultValue="0"
                style={{
                  width: 120,
                }}
                value={typeId}
                onChange={(value) => {
                  setTypeId(value)
                  console.log(value)
                }}
                options={types}
              />
            </div>
            <div className='task-tag-box'>
              <Select
                defaultValue="0"
                style={{
                  width: 120,
                }}
                value={tagId}
                onChange={(value) => {
                  setTagId(value)
                  console.log(value)
                }}
                options={tags}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  )
}
