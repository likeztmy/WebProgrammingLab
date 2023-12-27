import { useEffect, useState } from 'react'
import './index.less'
import deleteTagIcon from '../../assets/icon/deleteTag.svg'
import { ExclamationCircleFilled } from '@ant-design/icons';
import { Modal, Input, message } from 'antd';
import { addTag, deleteTag, getTags } from '../../service';
import addIcon from '../../assets/icon/add.svg'

const { confirm } = Modal;

export default function TagBox() {
  const colors = [
    'rgb(86,125,235)',
    'rgb(116,203,246)',
    'rgb(139,93,238)',
    'rgb(244,212,107)',
    'rgb(230,114,105)',
    'rgb(242,169,83)',
  ];

  const [selectedTag, setSelectedTag] = useState(0);
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    getTags().then(
      res => {
        const newTags = res.data.map((tag) => {
          const randomIndex = Math.floor(Math.random() * 6);
          return { ...tag, color: colors[randomIndex] }
        })
        setTags(newTags);
      }
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const updateTags = () => {
    getTags().then(
      res => {
        const newTags = res.data.map((tag) => {
          const randomIndex = Math.floor(Math.random() * 6);
          return { ...tag, color: colors[randomIndex] }
        })
        setTags(newTags);
      }
    )
  }

  const showModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const handleOk = () => {

    if (!tagName) {
      message.warning('请填写标签名称！');
      return;
    }

    addTag(tagName).then(
      res => {
        if (res.code === 200) {
          message.success('添加成功！');
          closeModal();
          updateTags();
        }
      }
    )

  }

  const handleCancel = () => {
    closeModal();
  }

  const showConfirm = (tagId) => {
    confirm({
      title: '确定要删除该标签吗?',
      icon: <ExclamationCircleFilled />,
      content: '删除后不可恢复',
      onOk() {
        deleteTag(tagId).then(
          res => {
            if (res.code === 200) {
              message.success('删除成功！');
              updateTags();
            }
          }
        )
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  return (
    <>
      <div className='tagbox-wrap'>
        <div className='tagbox-content'>
          <div className='tagbox-wrap-title-box'>
            <div className='tagbox-wrap-title'>标签</div>
            <div className='tagbox-wrap-add' onClick={showModal}>
              <img src={addIcon} alt="" />
            </div>
          </div>
          <div className='tag-add-box'>

          </div>
          <div className='tag-list-box'>
            <ul className='tag-list'>

              {tags.map((tag) => {
                return <li key={tag.tagId} onMouseMove={() => setSelectedTag(Number(tag.tagId))} onMouseLeave={() => setSelectedTag(0)}>
                  <div className='tag-item'>
                    <div
                      className={'tag-item-content'}
                      style={{
                        backgroundColor: tag.color
                      }}
                    >
                      {tag.tagName}
                    </div>
                    {selectedTag === Number(tag.tagId) &&
                      <div className='tag-item-delete' onClick={() => showConfirm(tag.tagId)}>
                        <img src={deleteTagIcon} alt="" />
                      </div>}
                  </div>
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
      {isModalOpen &&
        <Modal
          title="添加标签"
          okText={"添加"}
          cancelText={"取消"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          mask={false} style={{
            width: '600px'
          }}
        >
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Input
              style={{
                margin: '0 auto',
                width: '300px'
              }}
              value={tagName}
              onChange={(e) => { setTagName(e.target.value) }}
              placeholder='标签名称' />
          </div>
        </Modal>
      }
    </>
  )
}
