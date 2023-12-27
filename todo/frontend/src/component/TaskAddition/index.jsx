import { useEffect, useState } from 'react'
import './index.less'
import dayjs from 'dayjs';
import { DatePicker, Select, Input, Modal, message } from 'antd';
import { addTask, getTags, getTypes } from '../../service';


// eslint-disable-next-line react/prop-types
export default function TaskAddition({ isModalOpen, closeModal }) {

  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [endDate, setEndDate] = useState('');
  const [tagId, setTagId] = useState("");
  const [typeId, setTypeId] = useState("");

  const [tags, setTags] = useState([]);
  const [types, setTypes] = useState([]);

  useEffect(() => {

    // 获取可选的任务标签列表
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

    //获取可选的任务类型列表
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




  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().startOf('day');
  };

  // 添加任务函数
  const handleOk = () => {

    if (!taskName || !taskDescription || !typeId || !endDate) {
      message.warning('请填写完整的信息！')
      return;
    }

    let data = {
      taskName: taskName,
      taskDescription: taskDescription,
      startDate: dayjs().format('YYYY-MM-DD'),
      endDate: endDate,
      tagId: tagId === "" ? -1 : Number(tagId),
      typeId: Number(typeId)
    };


    // 添加任务函数
    addTask(data).then(res => {
      if (res.code === 200) {
        message.success('添加成功');
        setTimeout(() => {
          closeModal();
          window.location.reload()
        }, 1500);
      }
    })


  };

  // 取消添加任务函数
  const handleCancel = () => {
    closeModal()
  };

  return (
    <>
      <Modal
        title="添加任务"
        okText={"添加"}
        cancelText={"取消"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        mask={false} style={{
          width: '600px'
        }}
      >
        <div className='taskAddition-wrap'>
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
                // console.log(e.target.value)
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
                defaultValue=""
                style={{
                  width: 120,
                }}
                value={typeId}
                onChange={(value) => {
                  setTypeId(value)
                }}
                options={types}
              />
            </div>
            <div className='task-tag-box'>
              <Select
                defaultValue=""
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
